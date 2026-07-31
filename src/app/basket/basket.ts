import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import {
  IBasket,
  IBasketItem,
  Basket as BasketClass,
} from '../shared/Models/Basket';
import { IProduct } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root',
})
export class Basket {
  private http = inject(HttpClient);
  constructor() {}
  BaseURL = 'https://localhost:44338/api';
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  basketCount$ = this.basket$.pipe(map(basket => basket ? basket.basketItems.length : 0));

  GetBasket(id: string) {
    return this.http.get(`${this.BaseURL}/Baskets/get-basket-item/` + id).pipe(
      map((value: IBasket) => {
        this.basketSource.next(value);
        return value;
      }),
    );

  }
  setBasket(basket: IBasket) {
    return this.http
      .post(`${this.BaseURL}/Baskets/update-basket`, basket)
      .subscribe({
        next: (value: IBasket) => {
          this.basketSource.next(value);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  GetCurrentBasketValue() {
    return this.basketSource.value;
  }

  removeItemFromBasket(itemId: number) {
    let basket = this.GetCurrentBasketValue();
    basket.basketItems = basket.basketItems.filter(item => item.id !== itemId);
    return this.setBasket(basket);
  }

  addItemToBasket(product: IProduct, quantity: number = 1) {
    const itemToAdd: IBasketItem = this.MapProductToBasketItem(
      product,
      quantity,
    );

    let basket = this.GetCurrentBasketValue();
    
    if(basket.id == null){
      basket = this.CreateBasket();
    }
    basket.basketItems = this.AddOrUpdate(
      basket.basketItems,
      itemToAdd,
      quantity,
    );

    return this.setBasket(basket);
  }
  private AddOrUpdate(
    basketItems: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number,
  ): IBasketItem[] {
    const index = basketItems.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      basketItems.push(itemToAdd);
    } else {
      basketItems[index].quantity += quantity;
    }
    return basketItems;
  }

  private CreateBasket(): IBasket {
    const basket = new BasketClass();
    localStorage.setItem('basketId', basket.id);
    return basket;
  }

  private MapProductToBasketItem(
    product: IProduct,
    quantity: number,
  ): IBasketItem {

    return {
      id: product.id,
      category: product.categoryName,
      price: product.newPrice,
      quantity: quantity,
      image: product.photos && product.photos.length > 0 ? product.photos[0].imageName : '',
      name: product.name,
    };
  }
}
