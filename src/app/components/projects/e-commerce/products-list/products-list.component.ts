import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import { CardModule } from 'primeng/card';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    CardModule,
    RouterLink
  ],
})
export class ProductsListComponent implements OnInit{
  private _api = inject(ProductsService);
  public products$: Observable<Product[]> = this._api.getProducts();
  router = inject(Router)
  env = environment;
  username!: string;
  // products$: any = this._api.getProducts().subscribe(res => console.log(res));

  addToCart(productId: number){
    this._api.addToCart(productId);
  }
  signOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/projects/e-commerce/login'])
  }
  showCart(id: string){
    this.router.navigate([`/projects/e-commerce/cart/${id}`])
  }
  showUserInfo(){
  }
  ngOnInit(): void {
    // this._api.getProducts().subscribe(res => console.log(res));
    const token = localStorage.getItem('token');
    if(token){
      const payload = token.split('.')[1];
      this.username = JSON.parse(atob(payload)).username;
    }
  }
}
