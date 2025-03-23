import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import { CardModule } from 'primeng/card';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { TagModule } from 'primeng/tag';
import { Cart, Order } from '../models/cart.model';

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    CardModule,
    RouterLink,
    TagModule
  ],
})
export class ProductsListComponent implements OnInit, OnDestroy{
  private _api = inject(ProductsService);
  private _cartApi = inject(CartService);
  public products$: Observable<Product[]> = this._api.getProducts();
  router = inject(Router)
  env = environment;
  cartSub!: Subscription;
  currentCartSub!: Subscription;
  productInCartSub!: Subscription;
  inDecSub!: Subscription;
  username!: string;
  userId!: number;
  cart = this._cartApi.getCart;
  ordersNum = this._cartApi.cartCount;

  addToCart(productId: number, name: string, price: number){
    const order = {
      productId: productId,
      name: name,
      price: price,
      quantity: 1
    };
    this.cartSub = this._cartApi.addToCart(this.userId, order).subscribe({
      next: (res) => {
        // Add Toaster
      }
    });
  }
  increaseQuantity(productId: number, userId: number){
    this.inDecSub = this._cartApi.increaseQuantity(productId, userId).subscribe();
  }
  decreaseQuantity(productId: number, userId: number){
    this.inDecSub = this._cartApi.decreaseQuantity(productId, userId).subscribe();
  }
  signOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/projects/e-commerce/login'])
  }
  showCart(userId: number){
    this.router.navigate([`/projects/e-commerce/${this.username}/cart/${userId}`])
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      const payload = token.split('.')[1];
      this.username = JSON.parse(atob(payload)).username;
      this.userId = JSON.parse(atob(payload)).userId;
    }
    this._cartApi.setUserId(this.userId);
  }
  ngOnDestroy(): void {
    if(this.cartSub) this.cartSub.unsubscribe();
    if(this.currentCartSub) this.currentCartSub.unsubscribe();
    if(this.productInCartSub) this.productInCartSub.unsubscribe();
    if(this.inDecSub) this.inDecSub.unsubscribe();
  }
}
