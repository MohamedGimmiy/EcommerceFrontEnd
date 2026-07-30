import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ PaginationModule } from 'ngx-bootstrap/pagination';
import { Pagination } from './Component/pagination/pagination';


@NgModule({
  declarations: [
    Pagination
  ],
  imports: [
    CommonModule,
    PaginationModule
  ],
  exports:[
    PaginationModule,
    Pagination
  ]
})
export class SharedModule { }
