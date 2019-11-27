import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '', component: CheckoutComponent
      }
    ])
  ]
})
export class CheckoutModule { }
