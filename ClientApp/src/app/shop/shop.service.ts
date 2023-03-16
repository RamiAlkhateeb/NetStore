import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:7085/api/'
  constructor(private http: HttpClient) { }

  getProducts(type? : string ,brand? : string ,  sort? : string,limit? : number){
    let params = new HttpParams()
    let categories = ""
    if (limit) params = params.append('limit',limit)
    if (sort) params = params.append('sort',sort)

    if (type && type != "All") categories = "?category="+type
    if (brand && brand != "All") categories = "?brand="+brand

    return this.http.get<Product[]>(this.baseUrl + "products" + categories , {params})
  }

  getTypes(){
    return this.http.get<string[]>(this.baseUrl + 'products/categories')
  }

  getBrands(){
    return this.http.get<string[]>(this.baseUrl + 'products/brands')
  }
}
