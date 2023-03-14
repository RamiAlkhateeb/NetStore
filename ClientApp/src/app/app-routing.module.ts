import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path : '' , component : ShopComponent},
  {path : 'shop/:id' , component : ProductDetailsComponent},
  {path : 'profile' , component : ProfileComponent},
  {path : '**' , redirectTo :'',  pathMatch : 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
