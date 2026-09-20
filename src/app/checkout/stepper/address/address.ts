import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Checkout } from '../../checkout';

@Component({
  selector: 'app-address',
  standalone: false,
  templateUrl: './address.html',
  styleUrl: './address.scss',
})
export class Address implements OnInit {




  @Input() stepper: MatStepper;
  @Input() form: FormGroup;

  private checkoutService = inject(Checkout);
  canEdit = false;
  ngOnInit(): void {
    this.checkoutService.getAddress().subscribe({
      next:(value) => {
        this.form.patchValue(value);
      }
    })

  }

  go(){
    this.stepper.next();
  }
  next() {
    if (this.form.valid) {
      this.checkoutService.updateAddress(this.form.value).subscribe({
        next: (res) => {
          console.log('Address saved:', res);
          this.stepper.next();
        },
        error: (err) => {
          console.error('Address error:', err);
        }
      });
    }
  }
}
