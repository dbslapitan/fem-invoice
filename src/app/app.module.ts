import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoicesHomeComponent } from './invoices-home/invoices-home.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { NoInvoicesComponent } from './invoices-home/no-invoices/no-invoices.component';
import { InvoiceCardComponent } from './invoices-home/invoice-card/invoice-card.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoicesHomeComponent,
    NoInvoicesComponent,
    InvoiceCardComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      OverlayModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
