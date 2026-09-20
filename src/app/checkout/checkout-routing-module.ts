import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Checkout } from './checkout/checkout';
import { Success } from './success/success';

const routes: Routes = [
  {
    path: '',
    component: Checkout,
  },
  {
    path:'success',
    component:Success
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
