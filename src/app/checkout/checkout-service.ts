import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private http = inject(HttpClient);
  private baseURL = environment.baseURL;

  updateAddress(address: any) {
    return this.http.post(`${this.baseURL}Orders/address`, address);
  }

  updateDelivery(method: string) {
    return this.http.post(`${this.baseURL}Orders/delivery`, { method });
  }

  updatePayment(payment: any) {
    return this.http.post(`${this.baseURL}Orders/payment`, payment);
  }

  placeOrder(basketId: string) {
    return this.http.post(`${this.baseURL}Orders/place-order`, { basketId });
  }
}
