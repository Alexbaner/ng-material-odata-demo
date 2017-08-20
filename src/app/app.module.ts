import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ODataServiceFactory, ODataConfiguration } from 'angular2-odata';
import { NorthwindConfigFactory } from './app.odata-config';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';

const appRoutes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes, {
      enableTracing: true
    }), HttpModule, MaterialModule, CdkTableModule, BrowserAnimationsModule
  ],
  providers: [{
    provide: ODataConfiguration, useFactory: NorthwindConfigFactory
  }, ODataServiceFactory],
  bootstrap: [AppComponent]
})
export class AppModule { }
