import {Component, ElementRef, OnInit} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {map, Observable} from "rxjs";

@Component({
  selector: 'invoices-home',
  templateUrl: './invoices-home.component.html',
  styleUrls: ['./invoices-home.component.css',
    './invoices-home-tablet.component.css',
    './invoices-home-desktop.component.css']
})
export class InvoicesHomeComponent implements OnInit{

  isNotMobile$!: Observable<boolean>;
  filterIsOpen = false;

  constructor(private breakPoint: BreakpointObserver) {
  }

  ngOnInit() {
    this.isNotMobile$ = this.breakPoint.observe('(min-width: 768px)').pipe(
      map(({ matches }) => matches)
    );
  }

  filterOpen(){
    this.filterIsOpen = !this.filterIsOpen;
  }

  outsideOverlayClicked(event: MouseEvent, element: ElementRef){
    this.filterIsOpen = !this.filterIsOpen === true || element.nativeElement.contains(event.target);
  }
}
