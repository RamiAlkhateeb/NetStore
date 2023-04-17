import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = environment.apiUrl
  products : Product[]=[]
  brands : string[] =[]
  categories : string[] =[]
  pagination?: Pagination<Product[]>
  shopParams = new ShopParams()
  productCache = new Map<string, Pagination<Product[]>>()

  constructor(private http: HttpClient) { }

  getProducts(useCache = true) : Observable<Pagination<Product[]>>{

    if (!useCache) this.productCache = new Map()

    if (this.productCache.size > 0 && useCache){
      if (this.productCache.has(Object.values(this.shopParams).join('-'))){
        this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'))
        if(this.pagination)return of(this.pagination)
      }
    }
    
    let params = new HttpParams()

    params = params.append('sort',this.shopParams.sort)
    params = params.append('pageIndex',this.shopParams.pageNumber)
    params = params.append('pageSize',this.shopParams.pageSize)

    if (this.shopParams.pageSize > 0) params = params.append('pagesize',this.shopParams.pageSize)
    if (this.shopParams.category.length > 0 && this.shopParams.category != "All") params = params.append('category',this.shopParams.category)
    if (this.shopParams.brand.length > 0 && this.shopParams.brand != "All") params = params.append('brand',this.shopParams.brand)
    if (this.shopParams.search) params = params.append('search',this.shopParams.search)
    return this.http.get<Pagination<Product[]>>(this.baseUrl + "products"  , {params}).pipe(
      map(response => {
        this.productCache.set(Object.values(this.shopParams).join('-'),response) 
        this.pagination = response
        return response
      })
    )
  }

  setShopParams(params: ShopParams){
    this.shopParams=params
  }

  getShopParams(){
    return this.shopParams
  }

  getProduct(id:number){
    //const product = this.products.find(p => p.id === id)
    const product= [...this.productCache.values()]
    .reduce((acc , paginatedResult)=>{
      // acc for accumulator
      return {...acc , ...paginatedResult.data.find(p => p.id === id)}
    },{} as Product) // second param here is initial value
    if(Object.keys(product).length !==0) return of (product)

    return this.http.get<Product>(this.baseUrl+ 'products/' + id)
  }

  getTypes(){
    if(this.categories.length > 0) return of(this.categories)
    return this.http.get<string[]>(this.baseUrl + 'products/categories').pipe(
      map(categories => this.categories=categories)
    )
  }

  getBrands(){
    if(this.brands.length > 0) return of(this.brands)
    return this.http.get<string[]>(this.baseUrl + 'products/brands').pipe(
      map(brands => this.brands=brands)
    )
  }
}
