import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop-service';
import { IProduct } from '../../shared/Models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { Basket } from '../../basket/basket';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private basketService: Basket,
    private router: Router
  ) {}

  product: IProduct;
  quantity = 1;

  ngOnInit(): void {
    this.loadProduct();
  }

  MainImage: string;

  loadProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.shopService.getProductDetails(parseInt(id)).subscribe({
        next: (value: IProduct) => {
          this.product = value;
          this.MainImage = this.product.photos[0].imageName;
        },
        error: (error) => {
          console.error('Error loading product:', error);
        },
      });
    }
  }

  ReplaceImage(image: string) {
    this.MainImage = image;
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.product) {
      this.basketService.addItemToBasket(this.product, this.quantity);
    }
  }

  shopNow() {
    if (this.product) {
      this.basketService.addItemToBasket(this.product, this.quantity);
      this.router.navigateByUrl('/basket');
    }
  }

  getDiscount(): number {
    if (this.product && this.product.oldPrice && this.product.newPrice) {
      return Math.round(((this.product.oldPrice - this.product.newPrice) / this.product.oldPrice) * 100);
    }
    return 0;
  }
}
