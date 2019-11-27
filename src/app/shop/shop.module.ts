import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [ShopComponent, ItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: ShopComponent
      }
    ]),
    FlexLayoutModule
  ]
})
export class ShopModule { }
