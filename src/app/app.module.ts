import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KDatatableModule } from 'k-datatable';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KDatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
