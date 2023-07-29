import {Component, OnInit} from '@angular/core';
import {InvoiceService} from "../../services/invoice.service";
import {ActivatedRoute} from "@angular/router";
import {FullInvoice} from "../../models/full-invoice";
import {map, Observable} from "rxjs";
import {Invoice} from "../../models/invoice.model";
import {Address} from "../../models/address.model";
import {Item} from "../../models/item.model";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css',
    './view-invoices-tablet.component.css']
})
export class ViewInvoicesComponent implements OnInit{

  invoice!: Invoice;
  items!: Item[];

  isNotMobile$!: Observable<boolean>;

  constructor(private invoiceService: InvoiceService,
              private activatedRoute: ActivatedRoute,
              private breakPoint: BreakpointObserver) {
  }

  ngOnInit() {
    this.isNotMobile$ = this.breakPoint.observe('(min-width: 768px)').pipe(
      map(({ matches }) => matches)
    );
    const fullInvoice = this.activatedRoute.snapshot.data['fullInvoice'];
    this.invoice = fullInvoice.newInvoice;
    this.items = fullInvoice.items;
  }
}
