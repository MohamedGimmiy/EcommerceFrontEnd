import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Models/Product';

@Component({
  selector: 'app-shop-item',
  standalone: false,
  templateUrl: './shop-item.html',
  styleUrl: './shop-item.scss',
})
export class ShopItem {
  @Input() Product: IProduct;
}
