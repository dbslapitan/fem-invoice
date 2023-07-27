import {Component, OnInit} from '@angular/core';
import {InvoiceService} from "../../services/invoice.service";
import {ActivatedRoute} from "@angular/router";
import {FullInvoice} from "../../models/full-invoice";
import {map, Observable} from "rxjs";
import {Invoice} from "../../models/invoice.model";
import {Address} from "../../models/address.model";
import {Item} from "../../models/item.model";

@Component({
  selector: 'view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css']
})
export class ViewInvoicesComponent implements OnInit{

  invoice!: Invoice;
  addresses!: Address[];
  items!: Item[];

  constructor(private invoiceService: InvoiceService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const fullInvoice = this.activatedRoute.snapshot.data['fullInvoice'];
    this.invoice = fullInvoice.invoice;
    this.addresses = fullInvoice.addresses;
    this.items = fullInvoice.items;
  }
}
