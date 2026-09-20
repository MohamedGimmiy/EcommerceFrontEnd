import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-stepper',
  standalone: false,
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss',
})
export class Stepper implements AfterViewInit {
  private fb = inject(FormBuilder);

  @ViewChild('stepperRef', { static: true }) stepper: MatStepper;

  addressForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
  });

  deliveryForm = this.fb.group({
    delivery: ['standard', Validators.required],
  });

  // paymentForm = this.fb.group({
  //   cardName: ['', Validators.required],
  //   cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
  //   expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
  //   cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
  // });

  ngAfterViewInit() {}
}
