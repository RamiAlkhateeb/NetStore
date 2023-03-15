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
  sortSelected = 'name'
  sortOptions = [
    {name : 'Alphabetical' , value: 'name'},
    {name : 'Price low to high' , value: 'priceAsc'},
    {name : 'Price High to low' , value: 'priceDesc'}

  ]
  
  constructor(private shopService : ShopService) {  }
  ngOnInit(): void {
    this.getProducts();
    this.gettypes();
  }

  getProducts(){
    this.shopService.getProducts(this.typeSelected , this.sortSelected).subscribe({
      next: response => {
        this.products = response , 
        this.types = ['All',...new Set(response.map((item) => item.category))]
      }, 
      error : error => console.log(error),
    })
  }

  gettypes(){
    // this.shopService.getTypes().subscribe({
    //   next: response =>  this.types = ['All' , ...response],
    //   error : error => console.log(error)
    // })
    this.shopService.getProducts(this.typeSelected , this.sortSelected).subscribe({
      next: response => this.types = ['All',...new Set(response.map((item) => item.category))],
      error : error => console.log(error),
    })
    //this.types = [...new Set(this.products.map((item) => item.category))]
  }

  onTypeSelected (type : string){
    this.typeSelected = type
    this.getProducts()
  }

  onSortSelected (event : any){
    this.sortSelected = event.target.value
    this.getProducts()
  }

}
