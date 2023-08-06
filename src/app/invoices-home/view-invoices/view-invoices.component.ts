import {Component, ElementRef, OnInit} from '@angular/core';
import {InvoiceService} from "../../services/invoice.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable, timeout} from "rxjs";
import {Invoice} from "../../models/invoice.model";
import {Item} from "../../models/item.model";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Dialog, DialogConfig, DialogRef} from "@angular/cdk/dialog";
import {EditInvoiceDialogComponent} from "../edit-invoice-dialog/edit-invoice-dialog.component";
import {BasePortalOutlet, CdkPortalOutlet, Portal, PortalOutlet} from "@angular/cdk/portal";
import {Overlay, PositionStrategy} from "@angular/cdk/overlay";
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css',
    './view-invoices-tablet.component.css',
    './view-invoices-desktop.component.css'],
  //providers: [DialogService]
})
export class ViewInvoicesComponent implements OnInit{
  invoice!: Invoice;
  items!: Item[];
  editInvoiceOpen = false;
  editDialog!: DialogRef;

  isNotMobile$!: Observable<boolean>;

  constructor(private invoiceService: InvoiceService,
              private activatedRoute: ActivatedRoute,
              private breakPoint: BreakpointObserver,
              private dialogService: DialogService,
              private elementRef: ElementRef,
              private dialog: Dialog,
              private overlay: Overlay) {
  }

  ngOnInit() {
    this.isNotMobile$ = this.breakPoint.observe('(min-width: 768px)').pipe(
      map(({ matches }) => matches)
    );
    const fullInvoice = this.activatedRoute.snapshot.data['fullInvoice'];
    this.invoice = fullInvoice.newInvoice;
    this.items = fullInvoice.items;
  }

  openEditInvoiceDialog(){

    /*const header = document.getElementById('header');
    header!.scrollIntoView();
    this.editDialog = this.dialogService.openDialogOnElementRef(this.elementRef, EditInvoiceDialogComponent, {});
    console.log(this.editDialog)
    this.editDialog.outsidePointerEvents.subscribe(() => this.editDialog.close("closed"))
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef);

    const overlayRef = this.overlay
      .create({positionStrategy, hasBackdrop: true})*/
    const header = document.getElementById('header');
    header!.scrollIntoView();
    this.dialog.open(EditInvoiceDialogComponent, {
      data: {invoice: this.invoice,
        items: this.items},
      id: "editInvoice",
    });
  }
}
