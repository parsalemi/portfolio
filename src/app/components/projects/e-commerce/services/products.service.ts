import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { Product, ProductDTO } from '../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = `${environment.ecommerce_api_url}/products`;
  constructor(private _http: HttpClient) { }
  
  getProducts(page: number) : Observable<Product[]>{
    if(page == 0){
      return this._http.get<ProductDTO>(`${this.baseUrl}?limit=20&page=1`).pipe(
        map(res => res.products),
        shareReplay(1)
      ); 
    } else {
      return this._http.get<ProductDTO>(`${this.baseUrl}?limit=20&page=${page}`).pipe(
        map(res => res.products),
        shareReplay(1)
      );
    }
  }
  getProductByName(product: string): Observable<Product[]>{
    return this._http.get<ProductDTO>(`${this.baseUrl}?name=${product}`).pipe(
      map(res => res.products)
    );
  }
  getProductsByCategory(ctgy: string): Observable<Product[]>{
    return this._http.get<ProductDTO>(`${this.baseUrl}?category=${ctgy}`).pipe(
      map(res => res.products),
      shareReplay(1)
    );
  }
}
