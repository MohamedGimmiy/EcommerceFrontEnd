import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import {
  IBasket,
  IBasketItem,
  Basket as BasketClass,
  IBasketTotal,
} from '../shared/Models/Basket';
import { IProduct } from '../shared/Models/Product';
import { Delivery } from '../shared/Models/Delivery';

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
  basketSourceTotal  = new BehaviorSubject<IBasketTotal>({shipping: 0, subtotal: 0, total: 0});
  basketTotal$ = this.basketSourceTotal.asObservable();
  shipPrice:number=0;

  deleteBasket(){
    this.basketSource.next(null);
    this.basketSourceTotal.next(null);
    localStorage.removeItem('basketId');
  }
  calculateTotals() {
    const basket = this.GetCurrentBasketValue();
    if (!basket || !basket.basketItems) {
      this.basketSourceTotal.next({shipping: 0, subtotal: 0, total: 0});
      return;
    }
    const subtotal = basket.basketItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = this.shipPrice;
    const total = subtotal + shipping;
    this.basketSourceTotal.next({shipping, subtotal, total});
  }
  SetShippingPrice(delivery:Delivery){
    this.shipPrice=delivery.price;
    this.calculateTotals();
  }
  GetBasket(id: string) {
    return this.http.get(`${this.BaseURL}/Baskets/get-basket-item/` + id).pipe(
      map((value: IBasket) => {
        this.basketSource.next(value);
        this.calculateTotals();
        return value;
      }),
    );

  }
  setBasket(basket: IBasket) {
    return this.http
      .post(`${this.BaseURL}/Baskets/update-basket`, basket, {
        headers: new HttpHeaders({ 'X-Skip-Spinner': 'true' })
      })
      .subscribe({
        next: (value: IBasket) => {
          this.basketSource.next(value);
          this.calculateTotals();
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
    const updatedItems = basket.basketItems.filter(item => item.id !== itemId);
    const newBasket = { ...basket, basketItems: updatedItems };
    this.basketSource.next(newBasket);
    this.calculateTotals();
    if (updatedItems.length === 0) {
      localStorage.removeItem('basketId');
      this.DeleteBasket(newBasket);
    } else {
      this.setBasket(newBasket);
    }
  }

  addItemToBasket(product: IProduct, quantity: number = 1) {
    const itemToAdd: IBasketItem = this.MapProductToBasketItem(
      product,
      quantity,
    );

    let basket = this.GetCurrentBasketValue();
    
    if(!basket || basket.id == null){
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
      description: product.description
    };
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.GetCurrentBasketValue();
    const index = basket.basketItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      const updatedItems = basket.basketItems.map((i, idx) =>
        idx === index ? { ...i, quantity: i.quantity + 1 } : i
      );
      const newBasket = { ...basket, basketItems: updatedItems };
      this.basketSource.next(newBasket);
      this.calculateTotals();
      this.setBasket(newBasket);
    }
  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.GetCurrentBasketValue();
    const index = basket.basketItems.findIndex(i => i.id === item.id);
    if (index !== -1 && basket.basketItems[index].quantity > 1) {
      const updatedItems = basket.basketItems.map((i, idx) =>
        idx === index ? { ...i, quantity: i.quantity - 1 } : i
      );
      const newBasket = { ...basket, basketItems: updatedItems };
      this.basketSource.next(newBasket);
      this.calculateTotals();
      this.setBasket(newBasket);
    } else if (index !== -1 && basket.basketItems[index].quantity === 1) {
      this.removeItemFromBasket(item.id);
    }
  }
  DeleteBasket(basket: IBasket) {
    return this.http.delete(`${this.BaseURL}/Baskets/delete-basket/` + basket.id).subscribe({
      next: () => {
        this.basketSource.next(null);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }




}



