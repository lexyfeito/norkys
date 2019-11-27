import {Injectable} from '@angular/core';
import {ItemModel} from '../../models/item.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  dataStore: {
    cart: ItemModel[]
  };
  // tslint:disable-next-line:variable-name
  private _cart: BehaviorSubject<Array<ItemModel>>;

  constructor() {
    this.dataStore = {
      cart: []
    };
    this._cart = new BehaviorSubject<Array<ItemModel>>([]);
  }

  get cart() {
    return this._cart.asObservable();
  }

  addItem(item) {
    this.dataStore.cart.push(item);
    this._cart.next(this.dataStore.cart);
    this.setLocalStorage();
  }

  init() {
    const localCart = localStorage.getItem('cart');
    let cart = [];
    if (localCart) {
      cart = JSON.parse(localCart);
    }

    this.dataStore.cart = cart;
    this._cart.next(this.dataStore.cart);
  }

  private setLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.dataStore.cart));
  }
}
