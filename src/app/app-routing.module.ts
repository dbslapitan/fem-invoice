import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InvoicesHomeComponent} from "./invoices-home/invoices-home.component";
import {InvoicesModule} from "./invoices-home/invoices.module";

const routes: Routes = [
  {path: '', redirectTo: '/invoices', pathMatch: 'full'},
  {path: 'invoices', loadChildren:() => import('./invoices-home/invoices-routing.module').then(m => InvoicesModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
