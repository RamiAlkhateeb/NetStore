import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  products : Product[] = [];
  types : string[] = [];
  typeSelected = "";

  brands : string[] = [];
  brandSelected = "";


  sortSelected = 'name'
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
    this.shopService.getProducts(this.typeSelected ,this.brandSelected, this.sortSelected).subscribe({
      next: response => this.products = response ,
      error : error => console.log(error),
    })
  }

  getCategories(){
    this.shopService.getTypes().subscribe({
      next: response => this.types = ['All',...response], 
      error : error => console.log(error),
    })
  }

  getBrands(){
    this.shopService.getBrands().subscribe({
      next: response => this.brands = ['All',...response], 
      error : error => console.log(error),
    })
  }

  

  onTypeSelected (type : string){
    this.typeSelected = type
    this.getProducts()
  }

  onBrandSelected (brand : string){
    this.brandSelected = brand
    this.getProducts()
  }

  onSortSelected (event : any){
    this.sortSelected = event.target.value
    this.getProducts()
  }

}
