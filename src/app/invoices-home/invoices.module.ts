import {NgModule} from "@angular/core";
import {InvoicesHomeComponent} from "./invoices-home.component";
import {NoInvoicesComponent} from "./no-invoices/no-invoices.component";
import {InvoiceListComponent} from "./invoice-list/invoice-list.component";
import {CommonModule} from "@angular/common";
import {InvoicesRoutingModule} from "./invoices-routing.module";
import {OverlayModule} from "@angular/cdk/overlay";

@NgModule({
    declarations:[
      InvoicesHomeComponent,
      NoInvoicesComponent,
      InvoiceListComponent
    ],
    imports: [
      CommonModule,
      InvoicesRoutingModule,
      OverlayModule
    ]
})

export class InvoicesModule{

}
