import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagination } from './Component/pagination/pagination';
import { RouterModule } from '@angular/router';
import { OrderTotal } from './Component/order-total/order-total';

@NgModule({
  declarations: [
    Pagination,
    OrderTotal
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    Pagination,
    OrderTotal
  ]
})
export class SharedModule { }
