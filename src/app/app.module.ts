import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoicesHomeComponent } from './invoices-home/invoices-home.component';
import { OverlayModule} from '@angular/cdk/overlay';
import { NoInvoicesComponent } from './invoices-home/no-invoices/no-invoices.component';
import {HttpClientModule} from "@angular/common/http";
import {InvoiceListComponent} from "./invoices-home/invoice-list/invoice-list.component";
import {ViewInvoicesComponent} from "./invoices-home/view-invoices/view-invoices.component";
import { ItemsListComponent } from './invoices-home/items-list/items-list.component';
import {DialogModule} from "@angular/cdk/dialog";
import { EditInvoiceDialogComponent } from './invoices-home/edit-invoice-dialog/edit-invoice-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CdkMenuModule} from "@angular/cdk/menu";
import {DecimalPipe} from "@angular/common";
import { DatePickerComponent } from './custom-inputs/date-picker/date-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { LoadingComponent } from './loading/loading.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoicesHomeComponent,
    NoInvoicesComponent,
    InvoiceListComponent,
    ViewInvoicesComponent,
    ItemsListComponent,
    EditInvoiceDialogComponent,
    DatePickerComponent,
    LoadingComponent,
    DeleteDialogComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      OverlayModule,
      DialogModule,
      ReactiveFormsModule,
      CdkMenuModule,
      MatProgressSpinnerModule,
      BrowserAnimationsModule
    ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
