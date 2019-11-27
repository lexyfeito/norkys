import { Component, OnInit } from '@angular/core';
import {CartService} from '../services/cart/cart.service';
import {Observable} from 'rxjs';
import {ItemModel} from '../models/item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Observable<ItemModel[]>;
  constructor(private cartService: CartService) {
    this.cart = this.cartService.cart;
  }

  ngOnInit() {}

}
