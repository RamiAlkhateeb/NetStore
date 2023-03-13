import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://dummyjson.com/'
  constructor(private http: HttpClient) { }

  getProducts(type? : string , limit? : number){
    let params = new HttpParams()
    let categories = ""
    if (limit) params = params.append('limit',limit)
    if (type && type != "All") categories = "/category/"+type

    return this.http.get<Pagination<Product[]>>(this.baseUrl + "products" + categories , {params})
  }

  getTypes(){
    return this.http.get<string[]>(this.baseUrl + 'products/categories')
  }
}
