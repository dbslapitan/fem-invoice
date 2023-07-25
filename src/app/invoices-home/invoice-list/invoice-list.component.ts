import {Component, Input} from '@angular/core';
import {Invoice} from "../../models/invoice.model";

@Component({
  selector: 'invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent {

  @Input() invoices!: Invoice[];
}
