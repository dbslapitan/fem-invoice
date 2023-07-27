import {Component, Input} from '@angular/core';
import {Invoice} from "../../models/invoice.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css',
    './invoice-list-tablet.component.css',
    './invoice-list-desktop.component.css']
})
export class InvoiceListComponent {

  @Input() invoices!: Invoice[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  invoiceClick(invoice: Invoice){
    this.router.navigate(['invoices', invoice.stringId]);
  }
}
