import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountModule } from './account/account.module';
import { BasketModule } from './basket/basket.module';
import { CheckoutModule } from './checkout/checkout.module';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { ProfileComponent } from './profile/profile.component';
import { ShopModule } from './shop/shop.module';

const routes: Routes = [
  {path : 'shop' , loadChildren : ()=> import('./shop/shop.module').then(m => ShopModule)},
  {path : 'basket' , loadChildren : ()=> import('./basket/basket.module').then(m => BasketModule)},
  {path : 'checkout' , loadChildren : ()=> import('./checkout/checkout.module').then(m => CheckoutModule)},
  {path : '' , component : ProfileComponent},
  {path : 'not-found' , component : NotFoundComponent},
  {path : 'server-error' , component : ServerErrorComponent},
  {path : 'account' , loadChildren : ()=> import('./account/account.module').then(m => AccountModule)},
  {path : '**' , redirectTo :'',  pathMatch : 'full'}

  //{path: 'account' , c}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
