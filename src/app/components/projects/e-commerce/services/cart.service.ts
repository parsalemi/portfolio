import { computed, Injectable, Signal, signal } from '@angular/core';
import { BehaviorSubject, exhaustMap, filter, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Cart, CartDTO, Order } from '../models/cart.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http: HttpClient) {  }
  baseUrl = 'http://localhost:8000/api/cart';
  
  userId = signal<number | undefined>(undefined);

  cartItems = signal<Order[]>([]);
  cartCount = computed(() => this.cartItems().reduce((accQuantity, item) => accQuantity + item.quantity, 0))

  subTotal = computed(() => this.cartItems().reduce((accTotal, item) => accTotal + (item.price * item.quantity), 0));
  taxFee = computed(() => Math.round(this.subTotal() * 20 ) / 100);
  deliveryFee = computed(() => this.subTotal() < 50 ? 5 : 0);

  totalPrice = computed(() => this.subTotal() + this.taxFee() + this.deliveryFee());
  
  getCart$ = toObservable(this.userId).pipe(
    filter(Boolean),
    switchMap(id => {
      return this._http.get<Cart>(`${this.baseUrl}/${id}`).pipe(
        tap( (res) => {
          if(res.order) this.cartItems.set(JSON.parse(res.order));
        })
      );
    })
  );
  getCart = toSignal(this.getCart$, {initialValue: {} as Cart});
  
  addToCart(userId: number, order: Order): Observable<Cart>{
    const itemIndex = this.cartItems().findIndex(p => p.productId == order.productId);
    if(itemIndex < 0) {
      this.cartItems.update(items => [...items, order]);
    } else {
      this.cartItems.update(items => [
        ...items.slice(0, itemIndex),
        { ...items[itemIndex], quantity: items[itemIndex].quantity + 1 },
        ...items.slice(itemIndex + 1)
      ])
    }
    return this._http.post<Cart>(`${this.baseUrl}/${userId}`, order);
  }
  
  purchase(userId: number, purchase: number){
    return this._http.post(`${this.baseUrl}/purchase/${userId}`, {purchase});
  }

  deleteProduct(productId: number, userId: number){
    this.cartItems.update(items => items.filter(item => item.productId !== productId));
    return this._http.patch(`${this.baseUrl}/${userId}/delete/${productId}`, {productId});
  }

  increaseQuantity(productId: number, userId: number){
    this.cartItems.update(items => items.map( item => item.productId == productId ? {...item, quantity: item.quantity + 1} : item))
    return this._http.patch(`${this.baseUrl}/${userId}/${productId}/increase`, {quantity: 1});
  }
  decreaseQuantity(productId: number, userId: number){
    let index = this.cartItems().findIndex(product => product.productId == productId);
    this.cartItems.update(items => items.map( item => item.productId == productId ? {...item, quantity: item.quantity - 1} : item));
    return this._http.patch(`${this.baseUrl}/${userId}/${productId}/decrease`, {quantity: 1});
  }

  setUserId(userId: number){
    this.userId.set(userId);
  }
}