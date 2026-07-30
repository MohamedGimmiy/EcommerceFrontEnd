import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing-module';
import { Basket } from './basket/basket';


@NgModule({
  declarations: [
    Basket
  ],
  imports: [
    CommonModule,
    BasketRoutingModule
  ]
})
export class BasketModule { }
