import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountModule } from './account/account.module';
import { ProfileComponent } from './profile/profile.component';
import { ShopModule } from './shop/shop.module';

const routes: Routes = [
  {path : '' , loadChildren : ()=> import('./shop/shop.module').then(m => ShopModule)},
  {path : 'profile' , component : ProfileComponent},
  {path : 'account' , loadChildren : ()=> import('./account/account.module').then(m => AccountModule)},
  {path : '**' , redirectTo :'',  pathMatch : 'full'}

  //{path: 'account' , c}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
