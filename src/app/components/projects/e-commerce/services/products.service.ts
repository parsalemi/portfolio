import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { Product, ProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }
  
  getProducts(page: number) : Observable<Product[]>{
    if(page == 0){
      return this._http.get<ProductDTO>(`/api/products?limit=20&page=1`).pipe(
        map(res => res.products),
        shareReplay(1)
      ); 
    } else {
      return this._http.get<ProductDTO>(`/api/products?limit=20&page=${page}`).pipe(
        map(res => res.products),
        shareReplay(1)
      );
    }
  }
  getProductImg(productId: number){
    return this._http.get(`/api/products/image/${productId}`);
  }
}
