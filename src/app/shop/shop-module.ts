import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shop } from './shop';
import { ShopItem } from './shop-item/shop-item';
import { SharedModule } from '../shared/shared-module';
import { ProductDetails } from './product-details/product-details';
import { RouterModule } from '@angular/router';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ShopRoutingModule } from './shop-routing-module';


@NgModule({
  declarations: [
    Shop,
    ShopItem,
    ProductDetails
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    NgxImageZoomModule,
    ShopRoutingModule
  ],
  exports: [
  ]
})
export class ShopModule { }
