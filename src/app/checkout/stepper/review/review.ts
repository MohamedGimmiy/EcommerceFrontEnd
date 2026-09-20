import { Component, inject, Input, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Basket as BasketService } from '../../../basket/basket';
import { CheckoutService } from '../../../checkout/checkout-service';
import { IBasket, IBasketTotal } from '../../../shared/Models/Basket';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.html',
  styleUrl: './review.scss',
})
export class Review implements OnInit {
  @Input() stepper: MatStepper;

  private basketService = inject(BasketService);
  private checkoutService = inject(CheckoutService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  basket: IBasket;
  basketTotals: IBasketTotal;
  placing = false;

  ngOnInit() {
    this.basketService.basket$.subscribe({
      next: (basket) => {
        this.basket = basket;
      },
    });

    this.basketService.basketTotal$.subscribe({
      next: (totals) => {
        this.basketTotals = totals;
      },
    });
  }

  placeOrder() {
    if (!this.basket?.id || this.placing) return;
    this.placing = true;
    this.checkoutService.placeOrder(this.basket.id).subscribe({
      next: (value: any) => {
        this.toastr.success('Order placed successfully!');
        this.router.navigate(['/checkout/success'], { queryParams: { orderId: value.id } });
      },
      error: (err) => {
        this.placing = false;
        this.toastr.error(err.error?.message || 'Failed to place order');
      }
    });
  }
}
