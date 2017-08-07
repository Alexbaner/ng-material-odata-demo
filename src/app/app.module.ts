import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ODataServiceFactory, ODataConfiguration } from 'angular2-odata';
import { NorthwindConfigFactory } from './app.odata-config';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpModule, MaterialModule, CdkTableModule, BrowserAnimationsModule
  ],
  providers: [{
    provide: ODataConfiguration, useFactory: NorthwindConfigFactory
  }, ODataServiceFactory],
  bootstrap: [AppComponent]
})
export class AppModule { }
