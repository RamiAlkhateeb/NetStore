import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:7085/api/'
  constructor(private http: HttpClient) { }

  getProducts(shopParams : ShopParams){
    debugger
    let params = new HttpParams()
    let categories = ""
    params = params.append('sort',shopParams.sort)
    params = params.append('pageIndex',shopParams.pageNumber)
    params = params.append('pageSize',shopParams.pageSize)

    if (shopParams.pageSize > 0) params = params.append('pagesize',shopParams.pageSize)
    if (shopParams.category.length > 0 && shopParams.category != "All") params = params.append('category',shopParams.category)
    if (shopParams.brand.length > 0 && shopParams.brand != "All") params = params.append('brand',shopParams.brand)

    return this.http.get<Pagination<Product[]>>(this.baseUrl + "products"  , {params})
  }

  getTypes(){
    return this.http.get<string[]>(this.baseUrl + 'products/categories')
  }

  getBrands(){
    return this.http.get<string[]>(this.baseUrl + 'products/brands')
  }
}
