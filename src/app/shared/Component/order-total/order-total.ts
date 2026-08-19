import { Component, inject } from '@angular/core';
import { Basket, IBasketTotal } from '../../Models/Basket';
import { Basket as BasketClass } from '../../../basket/basket';

@Component({
  selector: 'app-order-total',
  standalone: false,
  templateUrl: './order-total.html',
  styleUrl: './order-total.scss',
})
export class OrderTotal {
  basketTotals: IBasketTotal;
  private basketService = inject(BasketClass);

  ngOnInit() {
    this.basketService.basketTotal$.subscribe({
      next: (totals) => {
        this.basketTotals = totals;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
