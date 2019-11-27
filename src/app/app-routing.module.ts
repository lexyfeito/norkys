import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: './store/store.module#StoreModule',
  },
  {
    path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule'
  },
  {
    path: '**', redirectTo: 'shop'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
