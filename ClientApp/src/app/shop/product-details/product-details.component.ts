import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product
  images: string[] = []


  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    debugger
    this.loadProduct()
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id)
      this.shopService.getProduct(+id).subscribe({
        next: response => {
          //debugger
          this.product = response
          if (this.product.productImages.length == 0)
            this.images[0] = this.product.thumbnail
          else
            this.images = this.product.productImages
        }

      })
  }

}
