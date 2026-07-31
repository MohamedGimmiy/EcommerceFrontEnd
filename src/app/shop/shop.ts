import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShopService } from './shop-service';
import { IPagination } from '../shared/Models/Pagination';
import { IProduct } from '../shared/Models/Product';
import { ICategory } from '../shared/Models/Category';
import { ProductParam } from '../shared/Models/ProductParam';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.html',
  styleUrl: './shop.scss',
})
export class Shop implements OnInit {

  constructor(private shopService: ShopService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getAllProducts();
    this.getCategories();
  }


  // GET ALL PRODUCTS
  product: IProduct[];
  currentPage: number = 1;
  totalCount: number;
  ProductParam = new ProductParam();
  getAllProducts(){
    this.shopService.getProduct(this.ProductParam).subscribe({
      next: (value: IPagination) => {
        this.product = value.data;
        this.totalCount = value.totalCount;
        this.ProductParam.pageNumber = value.pageNumber;
        this.ProductParam.pageSize = value.pageSize;
        this.toastr.success('Products loaded successfully', 'Success');
      },
      error: (error) => {
        console.log(error);
        //this.toastr.error('Failed to load products', 'Error');
      },
    });
  }

  //GET CATEGORIES
  Category: ICategory[];
  getCategories(){
    this.shopService.getCategory().subscribe({
      next: ((value:ICategory[]) => {
        this.Category = value;
      }),
      error: error => console.log(error)
    })
  }

  SelectedId(CategoryId:number){
    this.ProductParam.CategoryId = CategoryId;
    this.ProductParam.pageNumber = 1;
    this.currentPage = 1;
    this.getAllProducts();
  }

  // sorting by price
  SortingOptions = [
    {name: 'Price', value: 'Name'},
    {name: 'Price:min-max', value: 'priceAsn'},
    {name: 'Price:max-min', value: 'priceDsn'}
  ];
  SortingByPrice(sort: Event){
    this.ProductParam.SortSelected = (sort.target as HTMLInputElement).value;
    this.ProductParam.pageNumber = 1;
    this.currentPage = 1;
    this.getAllProducts();
  }

  // filtering by word
  OnSearch(search: string){
    this.ProductParam.search = search;
    this.ProductParam.pageNumber = 1;
    this.currentPage = 1;
    this.getAllProducts();
  }

  ResetValue() {
    this.ProductParam.search = '';
    this.ProductParam.CategoryId = 0;
    this.ProductParam.SortSelected = '';
    this.ProductParam.pageNumber = 1;
    this.currentPage = 1;
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
    if (this.sortSelected) {
      this.sortSelected.nativeElement.selectedIndex = 0;
    }
    this.getAllProducts();
  }

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('sortSelected') sortSelected: ElementRef;

  OnChangePage(page: number){
    this.ProductParam.pageNumber = page;
    this.getAllProducts();
  }
}
