import { AsyncPipe, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, switchMap, throwIfEmpty } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { TagModule } from 'primeng/tag';
import { Product, ProductDTO } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ToastModule } from 'primeng/toast';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  providers: [MessageService],
  imports: [
    AsyncPipe,
    CurrencyPipe,
    RouterLink,
    TagModule,
    StarRatingComponent,
    MatPaginator,
    ToastModule,
    MenubarModule,
    FormsModule
  ],
})
export class ProductsListComponent implements OnInit, OnDestroy{
  constructor(private _message: MessageService){}
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
  loading: boolean = false;
  currentCategory: string = 'all';
  categories: MenuItem[] | undefined;

  addToCart(productId: number, name: string, price: number, code: string, weight: number){
    this.loading = true;
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
        this.loading = false;
        this._message.add({severity: 'success', summary: 'Nice choice!', detail: 'Product added to your cart', life: 1000})
      },
      error: () => {
        this.loading = false;
        this._message.add({severity: 'error', summary: 'An error occured', detail: 'Please try again', life: 2000})
      }
    });
  }
  changePage(event: PageEvent){
    this.page$.next(event.pageIndex + 1)
    window.scrollTo(0, 0)
  }
  increaseQuantity(productId: number, userId: number){
    this.loading = true;
    this.inDecSub = this._cartApi.increaseQuantity(productId, userId).subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this._message.add({severity: 'error', summary: 'An error occured', detail: 'Please try again', life: 2000})
      }
    });
  }
  decreaseQuantity(productId: number, userId: number){
    this.loading = true;
    this.inDecSub = this._cartApi.decreaseQuantity(productId, userId).subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this._message.add({severity: 'error', summary: 'An error occured', detail: 'Please try again', life: 2000})
      }
    });
  }
  searchProduct(product: string){
    this.currentCategory = 'searched';
    this.products$ = this._api.getProductByName(product);
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
  initMenubarItems(){
    this.categories = [
      {
        label: 'All',
        command: () => {
          this.currentCategory = 'all';
          this.products$ = this.page$.pipe(switchMap(page => this._api.getProducts(page)));
        }
      },
      {
        label: 'Groceries',
        command: () => {
          this.currentCategory = 'groceries';
          this.products$ = this._api.getProductsByCategory('groceries')
        }
      },
      {
        label: 'Cosmetic',
        items: [
          {
            label: 'Beauty',
            command: () => {
              this.currentCategory = 'beauty';
              this.products$ = this._api.getProductsByCategory('beauty');
            }
          },
          {
            label: 'Frangrances',
            command: () => {
              this.currentCategory = 'frangrances';
              this.products$ = this._api.getProductsByCategory('fragrances');
            }
          },
          {
            label: 'Skin Care',
            command: () => {
              this.currentCategory = 'skin-care';
              this.products$ = this._api.getProductsByCategory('skin-care');
            }
          }
        ],
      },
      {
        label: 'Home And Kitchen',
        items: [
          {
            label: 'furniture',
            command: () => {
              this.currentCategory = 'furniture';
              this.products$ = this._api.getProductsByCategory('furniture');
            }
          },
          {
            label: 'Home Decoration',
            command: () => {
              this.currentCategory = 'home-decoration';
              this.products$ = this._api.getProductsByCategory('home-decoration');
            }
          },
          {
            label: 'Kitchen Accessories',
            command: () => {
              this.currentCategory = 'kitchen-accessories';
              this.products$ = this._api.getProductsByCategory('kitchen-accessories')
            }
          }
        ]
      },
      {
        label: 'Electronics',
        items: [
          {
            label: 'Laptops',
            command: () => {
              this.currentCategory = 'laptops';
              this.products$ = this._api.getProductsByCategory('laptops');
            }
          },
          {
            label: 'Smartphones',
            command: () => {
              this.currentCategory = 'smartphones';
              this.products$ = this._api.getProductsByCategory('smartphones');
            }
          },
          {
            label: 'Tablets',
            command: () => {
              this.currentCategory = 'tablets';
              this.products$ = this._api.getProductsByCategory('tablets');
            }
          }
        ]
      },
      {
        label: "Men's Fashion",
        items: [
          {
            label: 'Shirts',
            command: () => {
              this.currentCategory = 'mens-shirts';
              this.products$ = this._api.getProductsByCategory('mens-shirts');
            }
          },
          {
            label: 'Watches',
            command: () => {
              this.currentCategory = 'mens-watches';
              this.products$ = this._api.getProductsByCategory('mens-watches');
            }
          },
        ],
      },
      {
        label: "Women's Fashion",
        items: [
          {
            label: 'Bags',
            command: () => {
              this.currentCategory = 'womens-bags';
              this.products$ = this._api.getProductsByCategory('womens-bags');
            }
          },
          {
            label: 'Dresses',
            command: () => {
              this.currentCategory = 'womens-dresses';
              this.products$ = this._api.getProductsByCategory('womens-dresses');
            }
          },
          {
            label: 'Tops',
            command: () => {
              this.currentCategory = 'tops';
              this.products$ = this._api.getProductsByCategory('tops');
            }
          },
          {
            label: 'Jewellery',
            command: () => {
              this.currentCategory = 'womens-jewellery';
              this.products$ = this._api.getProductsByCategory('womens-jewellery');
            }
          },
          {
            label: 'Shoes',
            command: () => {
              this.currentCategory = 'womens-shoes';
              this.products$ = this._api.getProductsByCategory('womens-shoes');
            }
          },
          {
            label: 'Watches',
            command: () => {
              this.currentCategory = 'womens-watches';
              this.products$ = this._api.getProductsByCategory('womens-watches');
            }
          }
        ]
      },
      {
        label: 'Accessories',
        items: [
          {
            label: 'Sports',
            command: () => {
              this.currentCategory = 'sports-accessories';
              this.products$ = this._api.getProductsByCategory('sports-accessories');
            }
          },
          {
            label: 'Sun Glasses',
            command: () => {
              this.currentCategory = 'sunglasses';
              this.products$ = this._api.getProductsByCategory('sunglasses');
            }
          },
          {
            label: 'Mobile',
            command: () => {
              this.currentCategory = 'mobile-accessories';
              this.products$ = this._api.getProductsByCategory('mobile-accessories');
            }
          }
        ]
      },
      {
        label: 'Vehicles',
        items: [
          {
            label: 'Cars',
            command: () => {
              this.currentCategory = 'vehicle';
              this.products$ = this._api.getProductsByCategory('vehicle');
            }
          },
          {
            label: 'Motorcycles',
            command: () => {
              this.currentCategory = 'motorcycles';
              this.products$ = this._api.getProductsByCategory('motorcycle');
            }
          }
        ]
      }
    ]
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      const payload = token.split('.')[1];
      this.username = JSON.parse(atob(payload)).username;
      this.userId = JSON.parse(atob(payload)).userId;
    }
    this._cartApi.setUserId(this.userId);
    this.initMenubarItems();
  }
  ngOnDestroy(): void {
    this._cartApi.userId.set(undefined);
    this._cartApi.cartItems.set([])
    if(this.cartSub) this.cartSub.unsubscribe();
    if(this.inDecSub) this.inDecSub.unsubscribe();
  }
}