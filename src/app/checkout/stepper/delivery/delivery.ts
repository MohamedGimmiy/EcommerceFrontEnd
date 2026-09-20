import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Checkout } from '../../checkout';
import { Delivery as d } from '../../../shared/Models/Delivery';
import { Basket } from '../../../basket/basket';
@Component({
  selector: 'app-delivery',
  standalone: false,
  templateUrl: './delivery.html',
  styleUrl: './delivery.scss',
})
export class DeliveryComponent implements OnInit {
  @Input() stepper: MatStepper;
  @Input() form: FormGroup;
  deliveryMethods : d []=[];

  SetShippingPrice(){
    const delivery = this.deliveryMethods.find(m => m.id == this.form.value.delivery)
    this.basketService.SetShippingPrice(delivery);
  }
  ngOnInit() {
    this.service.getDeliveryMethod().subscribe({
      next:(value) =>{
        this.deliveryMethods = value;
      },
      error(err){
        console.log(err)
      }
    })
  }

  constructor(private service: Checkout, private basketService: Basket){

  }

}
