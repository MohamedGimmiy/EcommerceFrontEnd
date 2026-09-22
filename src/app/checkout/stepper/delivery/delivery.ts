import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Checkout } from '../../checkout';
import { Delivery as d } from '../../../shared/Models/Delivery';
import { Basket } from '../../../basket/basket';
import { ToastrService } from 'ngx-toastr';
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

  CreatePayment(){
    const id = this.deliveryMethods.find(m => m.id == this.form.value.delivery).id;
    this.basketService.CreatePaymentIntent(id).subscribe({
      next:(value)=>{
        console.log(value)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  SetShippingPrice(){
    const delivery = this.deliveryMethods.find(m => m.id == this.form.value.delivery)
    this.basketService.SetShippingPrice(delivery);
  }
  ngOnInit() {
    this.service.getDeliveryMethod().subscribe({
      next:(value) =>{
       this.toast.success("Delivery methods loaded successfully", "SUCCESS")
       this.deliveryMethods=value;
      },
      error(err){
        console.log(err)
      }
    })
  }

  constructor(private service: Checkout, private basketService: Basket,private toast:ToastrService){

  }

}
