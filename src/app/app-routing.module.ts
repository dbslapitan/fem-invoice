import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InvoicesHomeComponent} from "./invoices-home/invoices-home.component";
import {ViewInvoicesComponent} from "./invoices-home/view-invoices/view-invoices.component";

const routes: Routes = [
  {path: '', redirectTo: '/invoices', pathMatch: 'full'},
  {path: 'invoices', component: InvoicesHomeComponent},
  {path: 'invoices/:id', component: ViewInvoicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
