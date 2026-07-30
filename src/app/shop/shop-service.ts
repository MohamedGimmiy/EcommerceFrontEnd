import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/Pagination';
import { ProductParam } from '../shared/Models/ProductParam';
import { IProduct } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
    baseURL = 'https://localhost:44338/api/';


    constructor(private http: HttpClient){}
    getProduct(productParam: ProductParam){
      let param  = new HttpParams();
      if(productParam.CategoryId){
        param = param.append('CategoryId', productParam.CategoryId.toString());
      }
      if(productParam.SortSelected){
        param = param.append('Sort', productParam.SortSelected);
      }
      if(productParam.search){
        param = param.append('Search', productParam.search);
      }
      param = param.append('pageNumber', productParam.pageNumber);
      param = param.append('pageSize', productParam.pageSize);

      return this.http.get<IPagination>(`${this.baseURL}Products/get-all`, {params: param});
    }

    getCategory(){
      return this.http.get(`${this.baseURL}Categories/get-all`);
    }
    getProductDetails(id:number){
      return this.http.get<IProduct>(this.baseURL + 'Products/get-by-id/' + id);
    }
}
