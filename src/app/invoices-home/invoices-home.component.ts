import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {map, Observable} from "rxjs";
import {ConnectedPosition} from "@angular/cdk/overlay";
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

  invoices$!: Observable<Invoice[]>;
  emptyInvoice: Invoice[] = [];

  isNotMobile$!: Observable<boolean>;
  filterIsOpen = false;

  connectedPositions: ConnectedPosition[] = [
    {overlayX: 'center', overlayY: "top", originY: 'bottom', originX: 'center'}
  ];



  constructor(private breakPoint: BreakpointObserver,
              private renderer2: Renderer2,
              private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.isNotMobile$ = this.breakPoint.observe('(min-width: 768px)').pipe(
      map(({ matches }) => matches)
    );
    this.invoices$ = this.invoiceService.getAllInvoices().pipe(

    );
    this.invoices$.subscribe(console.log);
  }

  filterOpen(checkbox: HTMLInputElement){
    checkbox.checked = !checkbox.checked;
    this.filterIsOpen = !this.filterIsOpen;
  }

  outsideOverlayClicked(event: MouseEvent, elementButton: ElementRef, childElement: HTMLDivElement){
    const mainElement = document.getElementById("main") as HTMLElement;
    const logo = document.getElementById("logo-container") as HTMLElement;
    const target = event.target as HTMLElement;
    if((mainElement).contains(target) || logo.contains(target)){
      this.filterIsOpen = !this.filterIsOpen || elementButton.nativeElement.contains(event.target);
    }
  }
}
