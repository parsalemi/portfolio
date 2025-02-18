import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  getProducts() : Observable<Product[]>{
    return this._http.get<Product[]>('/api/products');
  }
  addToCart(productId: number){
    return this._http.post('/api/cart', productId);
  }
  updateCart(productId: number, cartId: number){
    return this._http.put(`/api/cart/${cartId}`, productId);
  }
}