import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreComponent} from './store.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from '../components/header/header.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    StoreComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {
        path: '', component: StoreComponent, children: [
          {
            path: 'shop', loadChildren: '../shop/shop.module#ShopModule'
          },
          {
            path: 'item/:id', loadChildren: '../item/item.module#ItemModule'
          },
          {
            path: 'cart', loadChildren: '../cart/cart.module#CartModule'
          },
          {
            path: 'about', loadChildren: '../about/about.module#AboutModule'
          },
          {
            path: 'contact', loadChildren: '../contact/contact.module#ContactModule'
          },
        ]
      }
    ])
  ]
})
export class StoreModule {
}
