import { AsyncPipe, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { TagModule } from 'primeng/tag';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    RouterLink,
    TagModule,
    StarRatingComponent,
    NgOptimizedImage,
    MatPaginator,
  ],
})
export class ProductsListComponent implements OnInit, OnDestroy{
  env = environment;
  router = inject(Router);
  username!: string;
  userId!: number;
  private _api = inject(ProductsService);
  private _cartApi = inject(CartService);
  page$ = new BehaviorSubject(0);
  products$: Observable<Product[]> = this.page$.pipe(switchMap(page => this._api.getProducts(page)));
  cartSub!: Subscription;
  inDecSub!: Subscription;
  ordersNum: Signal<number> = this._cartApi.cartCount;
  orders = computed(() => this._cartApi.cartItems());

  addToCart(productId: number, name: string, price: number, code: string, weight: number){
    const order = {
      productId: productId,
      name: name,
      price: price,
      code: code,
      weight: weight,
      quantity: 1
    };
    this.cartSub = this._cartApi.addToCart(this.userId, order).subscribe({
      next: (res) => {
        // Add Toaster
      }
    });
  }
  changePage(event: PageEvent){
    this.page$.next(event.pageIndex + 1)
    window.scrollTo(0, 0)
  }
  increaseQuantity(productId: number, userId: number){
    this.inDecSub = this._cartApi.increaseQuantity(productId, userId).subscribe();
  }
  decreaseQuantity(productId: number, userId: number){
    this.inDecSub = this._cartApi.decreaseQuantity(productId, userId).subscribe();
  }
  isInCart(productId: number){
    return this._cartApi.isProductInCart(productId);
  }
  howManyInCart(productId: number){
    let index = this.orders().findIndex(p => p.productId == productId)
    if(index > -1){
      let productsQuantity = this.orders()[index].quantity;
      return productsQuantity;
    }
    return 0;
  }
  signOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/projects/e-commerce/login'])
  }
  showCart(userId: number){
    this.router.navigate([`/projects/e-commerce/${this.username}/cart/${userId}`])
  }
  calcDiscount(price: number, discount: number){
    let e = price * (discount / 100);
    return Math.floor(price - e)
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
    if(this.inDecSub) this.inDecSub.unsubscribe();
  }
}