import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {map, mapTo, Observable, shareReplay} from "rxjs";
import {ConnectedPosition, OverlayContainer, ScrollStrategyOptions} from "@angular/cdk/overlay";
import {Invoice} from "../models/invoice.model";
import {InvoiceService} from "../services/invoice.service";

@Component({
  selector: 'invoices-home',
  templateUrl: './invoices-home.component.html',
  styleUrls: ['./invoices-home.component.css',
    './invoices-home-tablet.component.css',
    './invoices-home-desktop.component.css'],
})
export class InvoicesHomeComponent implements OnInit{


  scrollStrategy = this.scrollStrategyOptions.reposition();
  invoices$!: Observable<Invoice[]>;
  invoicesCount$!: Observable<number>;

  isNotMobile$!: Observable<boolean>;
  filterIsOpen = false;

  connectedPositions: ConnectedPosition[] = [
    {overlayX: 'center', overlayY: "top", originY: 'bottom', originX: 'center'}
  ];



  constructor(private breakPoint: BreakpointObserver,
              private renderer2: Renderer2,
              private invoiceService: InvoiceService,
              private scrollStrategyOptions: ScrollStrategyOptions) {

  }

  ngOnInit() {
    this.isNotMobile$ = this.breakPoint.observe('(min-width: 768px)').pipe(
      map(({ matches }) => matches)
    );
    this.invoices$ = this.invoiceService.getAllInvoices().pipe(
      shareReplay()
    );
    this.invoicesCount$ = this.invoices$.pipe(
      map(invoices => invoices.length)
    );
  }

  filterOpen(checkbox: HTMLInputElement){
    //checkbox.checked = !checkbox.checked;
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
