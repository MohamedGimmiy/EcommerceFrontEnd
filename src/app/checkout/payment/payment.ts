import { Component, Input, OnInit } from '@angular/core';
import { Checkout } from '../checkout';
import { ToastrService } from 'ngx-toastr';
import { Basket } from '../../basket/basket';
import { IBasket } from '../../shared/Models/Basket';
import { ICreateOrder } from '../../shared/Models/Order';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment implements OnInit {

  constructor(private _service: Checkout,
     private toast:ToastrService, 
     private basketService: Basket,
     private router :Router){

  }

  @Input() delivery: FormGroup;
  @Input() Address: FormGroup;

  CreateOrder(){
    const basket = this.basketService.GetCurrentBasketValue();
    const order = this.getOrderCreate(basket);
    this._service.CreateOrder(order).subscribe({
      next:(value)=>{
        console.log(value)
        this.router.navigate(['/checkout/success'], {queryParams:{orderId:value.id}})
        this.toast.success("Order created successfully", "SUCCESS")
      },
      error:(err)=> {
        console.log(err)
        this.toast.error("something went wrong")
      }
    })
  }
  getOrderCreate(basket: IBasket) :ICreateOrder{
    return {
      basketId: basket.id,
      deliveryMethodId: this.delivery.value.delivery,
      shipAddress: this.Address.value
    };
  }
  ngOnInit(): void {
  }



}
