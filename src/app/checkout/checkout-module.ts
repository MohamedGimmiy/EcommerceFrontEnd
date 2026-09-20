import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing-module';
import { Checkout } from './checkout/checkout';
import { Stepper } from './stepper/stepper';
import { Address } from './stepper/address/address';
import {  DeliveryComponent } from './stepper/delivery/delivery';
import { Review } from './stepper/review/review';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Payment } from './payment/payment';
import { Success } from './success/success';


@NgModule({
  declarations: [
    Checkout,
    Stepper,
    Address,
    DeliveryComponent,
    Payment,
    Review,
    Success
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule
  ], exports:[
    Stepper,
    Address,
    DeliveryComponent,
    Payment
  ]
})
export class CheckoutModule { }
