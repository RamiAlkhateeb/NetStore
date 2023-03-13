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
  
  constructor(private shopService : ShopService) {  }
  ngOnInit(): void {
    this.getProducts();
    this.gettypes();
  }

  getProducts(){
    this.shopService.getProducts(this.typeSelected).subscribe({
      next: response => this.products = response.products,
      error : error => console.log(error)
    })
  }

  gettypes(){
    this.shopService.getTypes().subscribe({
      next: response =>  this.types = ['All' , ...response],
      error : error => console.log(error)
    })
  }

  onTypeSelected (type : string){
    this.typeSelected = type
    this.getProducts()
  }

}
