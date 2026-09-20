import { Component, OnInit } from '@angular/core';
import { IOrder, IOrderItem } from '../../shared/Models/Order';
import { Orders } from '../orders';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.html',
  styleUrl: './order.scss',
})
export class Order implements OnInit {
  orders:IOrder[]=[];
  UrlImageModal:string[]=[];
  isModalOpen = false;
  constructor(private _service: Orders) { }
  ngOnInit(): void {
    this._service.getAllOrdersForUser(1).subscribe({
      next:response=>{
        this.orders=response
        console.log(this.orders)
      }
      ,
      error:err=>{
        console.log(err)
      }
    });
  }
  OpenModal(orderItems:IOrderItem[]){
    this.UrlImageModal = orderItems.map(item => item.mainImage);
    this.isModalOpen = true;
  }
  closeModal(){
    this.isModalOpen = false;
  }
  getFirstimageOrderItem(orderItems: any[]): string {
    return orderItems.length > 0 ? orderItems[0].mainImage : null;
  }

}
