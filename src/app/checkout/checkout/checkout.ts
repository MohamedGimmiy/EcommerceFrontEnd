import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Basket as BasketService } from '../../basket/basket';
import { IBasket, IBasketTotal } from '../../shared/Models/Basket';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit {
  private basketService = inject(BasketService);
  private router = inject(Router);

  basket: IBasket;
  basketTotals: IBasketTotal;

  ngOnInit() {
    this.basketService.basket$.subscribe({
      next: (basket) => {
        this.basket = basket;
        if (!basket || !basket.basketItems || basket.basketItems.length === 0) {
          this.router.navigate(['/basket']);
        }
      },
    });

    this.basketService.basketTotal$.subscribe({
      next: (totals) => {
        this.basketTotals = totals;
      },
    });
  }
}
