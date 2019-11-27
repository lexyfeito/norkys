import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ItemRowComponent } from './item-row/item-row.component';

@NgModule({
  declarations: [CartComponent, ItemRowComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: CartComponent
      }
    ]),
    FlexLayoutModule
  ]
})
export class CartModule { }
