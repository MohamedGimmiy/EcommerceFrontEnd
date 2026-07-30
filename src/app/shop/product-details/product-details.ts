import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop-service';
import { IProduct } from '../../shared/Models/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  constructor(private shopService:ShopService, private route:ActivatedRoute){

  }
  product:IProduct;
  ngOnInit(): void {
    this.loadProduct();
  }
  MainImage:string;
  loadProduct(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.shopService.getProductDetails(parseInt(id))
        .subscribe({
          next: (value: IProduct) => {
            this.product = value;
            this.MainImage = this.product.photos[0].imageName;
          },
          error: (error) => {
            console.error('Error loading product:', error);
          }
        });
    }
  }
  ReplaceImage(image:string){
    this.MainImage = image;
  }
}
