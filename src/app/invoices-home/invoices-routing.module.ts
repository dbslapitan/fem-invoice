import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {InvoicesHomeComponent} from "./invoices-home.component";

const routes: Routes = [
  {path: '', component: InvoicesHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class InvoicesRoutingModule{

}
