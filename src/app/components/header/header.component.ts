import {Component, OnInit} from '@angular/core';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons';
import {CartService} from '../../services/cart/cart.service';
import {ItemModel} from '../../models/item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartIcon = faCartPlus;
  menuOpened: boolean;
  cart: ItemModel[];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.cart.subscribe(cart => {
      this.cart = cart;
    });
  }

}
