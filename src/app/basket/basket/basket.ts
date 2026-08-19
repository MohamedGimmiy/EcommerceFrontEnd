import { Component } from '@angular/core';
import  { inject } from '@angular/core';
import { Basket as BasketService } from '../../basket/basket';
import { IBasket } from '../../shared/Models/Basket';
@Component({
  selector: 'app-basket',
  standalone: false,
  templateUrl: './basket.html',
  styleUrl: './basket.scss',
})
export class Basket {
   _service = inject(BasketService);
    basket : IBasket;
    ngOnInit() {
      this._service.basket$.subscribe({
        next: (basket) => {
          this.basket = basket;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

    incrementItem(item: any) {
      this._service.incrementItemQuantity(item);
    }

    decrementItem(item: any) {
      this._service.decrementItemQuantity(item);
    }

    deleteItem(id: number) {
      this._service.removeItemFromBasket(id);
    }

}
