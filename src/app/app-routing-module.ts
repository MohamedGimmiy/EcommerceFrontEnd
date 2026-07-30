import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shop } from './shop/shop';
import { Home } from './home/home';
import { ProductDetails } from './shop/product-details/product-details';

const routes: Routes = [
  {path:'',component:Home},
  {path: 'shop', loadChildren: () => import('./shop/shop-module').then(m => m.ShopModule)},
  {path: 'basket', loadChildren: () => import('./basket/basket-module').then(m => m.BasketModule)},
  {path:'**', redirectTo: '', pathMatch: 'full'},
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
