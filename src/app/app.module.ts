import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoicesHomeComponent } from './invoices-home/invoices-home.component';
import { OverlayModule} from '@angular/cdk/overlay';
import { NoInvoicesComponent } from './invoices-home/no-invoices/no-invoices.component';
import {HttpClientModule} from "@angular/common/http";
import {InvoiceListComponent} from "./invoices-home/invoice-list/invoice-list.component";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
