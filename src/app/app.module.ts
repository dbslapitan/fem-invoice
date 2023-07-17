import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgOptimizedImage} from "@angular/common";
import { InvoicesHomeComponent } from './invoices-home/invoices-home.component';
import {CdkConnectedOverlay} from "@angular/cdk/overlay";

@NgModule({
  declarations: [
    AppComponent,
    InvoicesHomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage,
        CdkConnectedOverlay
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
