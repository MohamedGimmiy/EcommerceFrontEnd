import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagination } from './Component/pagination/pagination';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    Pagination
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    Pagination
  ]
})
export class SharedModule { }
