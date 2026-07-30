import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Shop } from './shop';
import { ProductDetails } from './product-details/product-details';


const routes: Routes = [
  {path: '', component: Shop},
  {path:'product-details/:id', component: ProductDetails},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
