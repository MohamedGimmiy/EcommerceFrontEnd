import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagination } from './Component/pagination/pagination';

@NgModule({
  declarations: [
    Pagination
  ],
  imports: [
    CommonModule
  ],
  exports:[
    Pagination
  ]
})
export class SharedModule { }
