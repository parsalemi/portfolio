import { computed, Injectable, Signal, signal } from '@angular/core';
import { BehaviorSubject, exhaustMap, filter, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Cart, CartDTO, Order, OrderHistory } from '../models/cart.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http: HttpClient) {  }
  baseUrl = `${environment.ecommerce_api_url}/cart`;
  
  userId = signal<number | undefined>(undefined);

  cartItems = signal<Order[]>([]);
  cartCount = computed(() => this.cartItems().reduce((accQuantity, product) => accQuantity + product.quantity, 0))

  subTotal = computed(() => this.cartItems().reduce((accTotal, product) => accTotal + (product.price * product.quantity), 0));
  taxFee = computed(() => Math.round(this.subTotal() * 20 ) / 100);
  deliveryFee = computed(() => (this.subTotal() < 100 && this.totalWeight() < 100) ? 5 : (this.subTotal() < 100 && this.totalWeight() > 100) ? 10 : (this.totalWeight() > 100 && this.subTotal() > 100) ? 5 : 0);
  totalWeight = computed(() => this.cartItems().reduce((accWeight, product) => accWeight + (product.weight * product.quantity), 0))

  totalPrice = computed(() => this.subTotal() + this.taxFee() + this.deliveryFee());
  
  getCart$ = toObservable(this.userId).pipe(
    filter(Boolean),
    switchMap(id => {
      return this._http.get<Cart>(`${this.baseUrl}/${id}`).pipe(
        tap( (res) => {
          if(res.order) this.cartItems.set(res.order);
        })
      );
    })
  );
  getCart = toSignal(this.getCart$, {initialValue: {} as Cart});
  
  addToCart(userId: number, order: Order): Observable<Cart>{
    const itemIndex = this.cartItems().findIndex(p => p.productId == order.productId);
    if(itemIndex < 0) {
      this.cartItems.update(products => [...products, order]);
    } else {
      this.cartItems.update(products => [
        ...products.slice(0, itemIndex),
        { ...products[itemIndex], quantity: products[itemIndex].quantity + 1 },
        ...products.slice(itemIndex + 1)
      ])
    }
    return this._http.post<Cart>(`${this.baseUrl}/${userId}`, order);
  }
  
  purchase(userId: number, purchased: number){
    return this._http.post(`${this.baseUrl}/purchase/${userId}`, {purchased});
  }

  deleteProduct(productId: number, userId: number){
    this.cartItems.update(products => products.filter(product => product.productId !== productId));
    return this._http.patch(`${this.baseUrl}/${userId}/delete/${productId}`, {productId});
  }

  increaseQuantity(productId: number, userId: number){
    this.cartItems.update(products => products.map(product => product.productId == productId ? {...product, quantity: product.quantity + 1} : product))
    return this._http.patch(`${this.baseUrl}/${userId}/${productId}/increase`, {quantity: 1});
  }
  decreaseQuantity(productId: number, userId: number){
    let index = this.cartItems().findIndex(product => product.productId == productId);
    let quantityOfProduct = this.cartItems()[index].quantity;
    if(quantityOfProduct > 1){
      this.cartItems.update(products => products.map(product => product.productId == productId ? {...product, quantity: product.quantity - 1} : product));
    } else {
      this.cartItems.update(products => products.filter(product => product.productId !== productId))
    }
    return this._http.patch(`${this.baseUrl}/${userId}/${productId}/decrease`, {quantity: 1});
  }
  isProductInCart(productId: number){
    return this.cartItems().find(product => product.productId == productId);
  }
  getOrderHistory(userId: number): Observable<OrderHistory[]>{
    return this._http.get<OrderHistory[]>(`${environment.ecommerce_api_url}/${userId}/order-history`);
  }
  setUserId(userId: number){
    this.userId.set(userId);
  }
}