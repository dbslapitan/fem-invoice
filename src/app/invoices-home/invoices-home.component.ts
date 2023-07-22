import {Component, ElementRef, OnInit} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {map, Observable} from "rxjs";
import {Invoice} from "../models/invoice.model";
import {InvoiceService} from "../services/invoice.service";

@Component({
  selector: 'invoices-home',
  templateUrl: './invoices-home.component.html',
  styleUrls: ['./invoices-home.component.css',
    './invoices-home-tablet.component.css',
    './invoices-home-desktop.component.css']
})
export class InvoicesHomeComponent implements OnInit{

  invoices$!: Observable<Invoice[]>
  isNotMobile$!: Observable<boolean>;
  filterIsOpen = false;

  constructor(private breakPoint: BreakpointObserver, private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.isNotMobile$ = this.breakPoint.observe('(min-width: 768px)').pipe(
      map(({ matches }) => matches)
    );

     this.invoices$ = this.invoiceService.getAllInvoices();

  }

  filterOpen(checkbox: HTMLInputElement){
    checkbox.checked = !checkbox.checked;
    this.filterIsOpen = !this.filterIsOpen;
  }

  outsideOverlayClicked(event: MouseEvent, element: ElementRef){
    this.filterIsOpen = !this.filterIsOpen || element.nativeElement.contains(event.target);
  }
}
