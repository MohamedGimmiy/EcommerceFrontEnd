import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/Models/Order';
import { ActivatedRoute } from '@angular/router';
import { Orders } from '../orders';

@Component({
  selector: 'app-order-item',
  standalone: false,
  templateUrl: './order-item.html',
  styleUrl: './order-item.scss',
})
export class OrderItem implements OnInit {
  order:IOrder
  id:number=0;

  constructor(
    private route: ActivatedRoute, 
    private _service:Orders) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param=>{
      this.id= param['id']
    });
    this._service.getCurrentOrderForUser(this.id).subscribe({
      next:response=>{
        this.order=response
        console.log(this.order)
      },
      error:err=>{
        console.log(err)
      }
    });
  }

}
