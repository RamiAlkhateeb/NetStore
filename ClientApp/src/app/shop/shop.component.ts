import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  @ViewChild('search') searchTerm? : ElementRef
  products : Product[] = [];
  categories : string[] = [];
  brands : string[] = [];
  shopParams = new ShopParams()
  totalCount = 0

  sortOptions = [
    {name : 'Alphabetical' , value: 'name'},
    {name : 'Price low to high' , value: 'priceAsc'},
    {name : 'Price High to low' , value: 'priceDesc'}

  ]
  
  constructor(private shopService : ShopService) {  }
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getBrands();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data
        this.shopParams.pageNumber = response.pageIndex
        this.shopParams.pageSize = response.pageSize
        this.totalCount = response.count
      } ,
      error : error => console.log(error),
    })
  }

  getCategories(){
    this.shopService.getTypes().subscribe({
      next: response => this.categories = ['All',...response], 
      error : error => console.log(error),
    })
  }

  getBrands(){
    this.shopService.getBrands().subscribe({
      next: response => this.brands = ['All',...response], 
      error : error => console.log(error),
    })
  }

  onTypeSelected (category : string){
    this.shopParams.category = category
    this.shopParams.pageNumber = 1
    this.getProducts()
  }

  onBrandSelected (brand : string){
    this.shopParams.brand = brand
    this.shopParams.pageNumber = 1
    this.getProducts()
  }

  onSortSelected (event : any){
    this.shopParams.sort = event.target.value
    this.getProducts()
  }

  onPageChanged(event: any){
    if (this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event
      this.getProducts()
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value
    this.shopParams.pageNumber = 1
    this.getProducts()
  }

  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value = ''
    this.shopParams = new ShopParams()
    this.getProducts()
  }

}
