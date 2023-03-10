import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pagination } from './shared/models/pagination';
import { Product } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ClientApp';

  products : Product[] = [];
  /**
   *
   */
  constructor(private http: HttpClient) {
    
    
  }
  ngOnInit(): void {
    this.http.get<Pagination<Product[]>>('https://dummyjson.com/products?limit=10').subscribe({
      next : response => this.products = response.products , // what to do next 
      error : error => console.log(error), // what to do if there is an error
      complete: () => {
        console.log('request completed')
        
      }
    })
  }
}
