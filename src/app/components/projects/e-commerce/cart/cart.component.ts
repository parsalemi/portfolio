import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, signal, Signal, effect } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart, Order } from '../models/cart.model';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [
    AsyncPipe,
    JsonPipe
  ],
})
export class CartComponent implements OnInit, OnDestroy{
  constructor(){

    // effect(() => console.log(this.extendedPrice()));
  }

  private _cartApi = inject(CartService);
  userId!: number;
  cart$!: Observable<Cart>;
  incDecSub!: Subscription;
  delSub!: Subscription;
  
  cart = computed(() => this._cartApi.getCart());
  order = computed(() => this._cartApi.cartItems());
  extendedPrice = computed(() => this.order());
  subTotal = this._cartApi.subTotal;
  taxFee = this._cartApi.taxFee;
  deliveryFee = this._cartApi.deliveryFee;
  totalPrice = this._cartApi.totalPrice;

  deleteProduct(productId: number, userId: number){
    this.delSub = this._cartApi.deleteProduct(productId, userId).subscribe();
  }

  increaseQuantity(productId: number, userId: number){
    this.incDecSub = this._cartApi.increaseQuantity(productId, userId).subscribe();
  }
  decreaseQuantity(productId: number, userId: number){
    this.incDecSub = this._cartApi.decreaseQuantity(productId, userId).subscribe();
  }
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      const payload = token.split('.')[1];
      this.userId = JSON.parse(atob(payload)).userId;
      this._cartApi.setUserId(this.userId);
    }
    // for(let i = 0; i < this.order().length; i++){
    //   this.extendedPrice.set(Number(this.order()[i].price * this.order()[i].quantity));
    // }
  }
  ngOnDestroy(): void {
    if(this.incDecSub) this.incDecSub.unsubscribe();
    if(this.delSub) this.delSub.unsubscribe();
  }
}
