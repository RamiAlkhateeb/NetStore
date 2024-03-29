import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { ProfileModule } from './profile/profile.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    //ShopModule, since we are using lazy loading now
    ProfileModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
