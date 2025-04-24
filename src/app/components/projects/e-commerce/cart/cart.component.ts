import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart.model';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [MessageService],
  imports: [
    CurrencyPipe,
    RouterLink,
    ToastModule
  ],
})
export class CartComponent implements OnInit, OnDestroy{
  constructor(private message: MessageService){}
  env = environment;
  private _cartApi = inject(CartService);
  router = inject(Router);
  userId!: number;
  cart$!: Observable<Cart>;
  incDecSub!: Subscription;
  delSub!: Subscription;
  purchaseSub!: Subscription;
  loading: boolean = false;
  
  cart = computed(() => this._cartApi.getCart());
  order = computed(() => this._cartApi.cartItems());
  cartCount = this._cartApi.cartCount;
  extendedPrice = computed(() => this.order());
  subTotal = this._cartApi.subTotal;
  taxFee = this._cartApi.taxFee;
  deliveryFee = this._cartApi.deliveryFee;
  totalPrice = this._cartApi.totalPrice;
  totalWeight = this._cartApi.totalWeight;

  deleteProduct(productId: number, userId: number){
    this.loading = true;
    this.delSub = this._cartApi.deleteProduct(productId, userId).subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message.add({severity: 'error', summary: 'Attempt Failed!', detail: 'Please try again', life: 2000})
      }
    });
  }
  increaseQuantity(productId: number, userId: number){
    this.loading = true;
    this.incDecSub = this._cartApi.increaseQuantity(productId, userId).subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message.add({severity: 'error', summary: 'Attempt Failed!', detail: 'Please try again', life: 2000})
      }
    });
  }
  decreaseQuantity(productId: number, userId: number){
    this.loading = true;
    this.incDecSub = this._cartApi.decreaseQuantity(productId, userId).subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message.add({severity: 'error', summary: 'Attempt Failed!', detail: 'Please try again', life: 2000})
      }
    });
  }
  purchase(){
    this.loading = true;
    this.purchaseSub = this._cartApi.purchase(this.userId, 1).subscribe({
      next: () => {
        this.loading = false;
        this.message.add({severity: 'success', summary: 'Purchased Successfully', detail: 'Thanks for your order', life: 3000})
        this._cartApi.cartItems.set([]);
        setTimeout(() => this.router.navigate(['projects/e-commerce/products']), 2000);
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
        this.message.add({severity: 'error', summary: 'Failed', detail: 'Please try again', life: 3000})
      }
    });
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      const payload = token.split('.')[1];
      this.userId = JSON.parse(atob(payload)).userId;
      this._cartApi.setUserId(this.userId);
    }
  }
  ngOnDestroy(): void {
    if(this.incDecSub) this.incDecSub.unsubscribe();
    if(this.delSub) this.delSub.unsubscribe();
    if(this.purchaseSub) this.purchaseSub.unsubscribe();
  }
}
