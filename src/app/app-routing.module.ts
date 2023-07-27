import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InvoicesHomeComponent} from "./invoices-home/invoices-home.component";
import {ViewInvoicesComponent} from "./invoices-home/view-invoices/view-invoices.component";
import {fullInvoiceResolver} from "./services/resolvers";

const routes: Routes = [
  {path: '', redirectTo: '/invoices', pathMatch: 'full'},
  {path: 'invoices', component: InvoicesHomeComponent},
  {path: 'invoices/:stringId', component: ViewInvoicesComponent, resolve:{fullInvoice: fullInvoiceResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
