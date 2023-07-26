import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {filter, map, mapTo, Observable, shareReplay} from "rxjs";
import {ConnectedPosition, OverlayContainer, ScrollStrategyOptions} from "@angular/cdk/overlay";
import {Invoice} from "../models/invoice.model";
import {InvoiceService} from "../services/invoice.service";
import {Filter} from "../models/filter.model";

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
  filteredInvoice$!: Observable<Invoice[]>;
  invoicesCount$!: Observable<number>;

  isNotMobile$!: Observable<boolean>;
  filterIsOpen = false;
  filter: Filter = {
    paid: true,
    pending: true,
    draft: true
  };



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

    if(localStorage.getItem('filters')){
      try {
        this.filter = JSON.parse(localStorage.getItem('filters')!);
        let noFalse = false;
        for (let key in this.filter){
          if(!noFalse){
            noFalse = this.filter[key as keyof Filter];
          }
        }
        if(!noFalse){
          this.filter.draft = true;
          this.filter.pending = true;
          this.filter.paid = true;
          localStorage.setItem('filters', JSON.stringify(this.filter))
        }
      } catch (err){
        localStorage.removeItem('filters');
      }
    }
    this.filteredInvoice$ = this.invoices$.pipe(
      map(invoices => invoices.filter(invoice => this.filter[invoice.status as keyof Filter])
      ));
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

  filterChange(input: HTMLInputElement){
    const filterOn = input.id;
    this.filter[filterOn as keyof Filter] = input.checked;
    localStorage.setItem('filters', JSON.stringify(this.filter));
    this.filteredInvoice$ = this.invoices$.pipe(
      map(invoices => invoices.filter(invoice => this.filter[invoice.status as keyof Filter])
    ));
  }
}
