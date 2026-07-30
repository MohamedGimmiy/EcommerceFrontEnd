import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Models/Product';
import { Basket } from '../../basket/basket';

@Component({
  selector: 'app-shop-item',
  standalone: false,
  templateUrl: './shop-item.html',
  styleUrl: './shop-item.scss',
})
export class ShopItem {
  @Input() Product: IProduct;
  constructor(private _service: Basket){
    
  }
  SetBasketValue(){
    this._service.addItemToBasket(this.Product);
  }
}
