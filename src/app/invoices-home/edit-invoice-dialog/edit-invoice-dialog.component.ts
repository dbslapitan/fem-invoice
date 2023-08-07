import {Component, ElementRef, HostListener, Inject, OnInit} from '@angular/core';
import {Dialog, DIALOG_DATA} from "@angular/cdk/dialog";
import {Invoice} from "../../models/invoice.model";
import {Item} from "../../models/item.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CDK_MENU} from "@angular/cdk/menu";
import {CdkScrollable, ScrollDispatcher} from "@angular/cdk/overlay";
import {Observable} from "rxjs";

@Component({
  selector: 'edit-invoice-dialog',
  templateUrl: './edit-invoice-dialog.component.html',
  styleUrls: ['./edit-invoice-dialog.component.css']
})
export class EditInvoiceDialogComponent implements OnInit{

  invoice!: Invoice;
  items!: Item[];
  editForm!: FormGroup;
  menuIsOpen = false;

  constructor(private dialog: Dialog,
              @Inject(DIALOG_DATA) private data: {invoice: Invoice, items: Item[]},
              private fb: FormBuilder,
              private scrollDispatcher: ScrollDispatcher) {

  }

  ngOnInit() {
    this.invoice = this.data.invoice;
    this.items = this.data.items;

    this.editForm = this.fb.group({
      senderStreet: [this.invoice.senderAddress.street, Validators.required],
      senderCity: [this.invoice.senderAddress.city, Validators.required],
      senderPostCode: [this.invoice.senderAddress.postCode, Validators.required],
      senderCountry: [this.invoice.senderAddress.country, Validators.required],
      name: [this.invoice.clientName, Validators.required],
      email: [this.invoice.clientEmail, [Validators.required, Validators.email]],
      clientStreet: [this.invoice.clientAddress.street, Validators.required],
      clientCity: [this.invoice.clientAddress.city, Validators.required],
      clientPostCode: [this.invoice.clientAddress.postCode, Validators.required],
      clientCountry: [this.invoice.clientAddress.country, Validators.required],
      invoiceDate: [this.invoice.createdAt, Validators.required],
      paymentTerm: [this.invoice.paymentTerms, Validators.required],
      projectDescription: [this.invoice.description, Validators.required]
    });
  }

  goBackClicked(){
    this.dialog.getDialogById("editInvoice")?.close();
    const header = document.getElementById("header");
    header!.scrollIntoView();
  }

  paymentTermClicked(day: number){
    this.editForm.patchValue({paymentTerm: day});
  }
}
