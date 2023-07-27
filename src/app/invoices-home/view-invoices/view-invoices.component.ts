import {Component, OnInit} from '@angular/core';
import {InvoiceService} from "../../services/invoice.service";
import {ActivatedRoute} from "@angular/router";
import {FullInvoice} from "../../models/full-invoice";
import {map, Observable} from "rxjs";

@Component({
  selector: 'view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css']
})
export class ViewInvoicesComponent implements OnInit{

  fullInvoice$!: Observable<FullInvoice>;

  constructor(private invoiceService: InvoiceService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const stringId = this.activatedRoute.snapshot.data['stringId'];
    this.fullInvoice$ = this.activatedRoute.data.pipe(
      map(data => data['fullInvoice'])
    );
  }
}
