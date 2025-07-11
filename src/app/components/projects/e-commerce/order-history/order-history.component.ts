import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { Order, OrderHistory } from '../models/cart.model';
import { AsyncPipe, CurrencyPipe, Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-history',
  standalone: true,
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    RouterLink
  ],
})
export class OrderHistoryComponent implements OnInit{
  constructor(private location: Location){}
  env = environment;
  private _api = inject(CartService);
  userId!: number;
  prevOrders$!: Observable<OrderHistory[]>;
  
  calcTotalPrice(order: Order[]){
    let price = 0;
    for(let i = 0; i < order.length; i++){
      price += (order[i].price * order[i].quantity);
    }
    return price;
  }
  totalItems(order: Order[]){
    let items = 0;
    for(let i = 0; i < order.length; i++){
      items += order[i].quantity;
    }
    return items;
  }
  goBack(){
    this.location.back();
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      const payload = token.split('.')[1];
      this.userId = JSON.parse(atob(payload)).userId;
      this.prevOrders$ = this._api.getOrderHistory(this.userId);
    }
  }
}
