import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CategoryService} from './services/category/category.service';
import {HttpClientModule} from '@angular/common/http';
import {CartService} from './services/cart/cart.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (categoryService: CategoryService, cartService: CartService) => {
        return () => {
          cartService.init();
          return categoryService.loadCategories();
        };
      },
      deps: [CategoryService, CartService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
