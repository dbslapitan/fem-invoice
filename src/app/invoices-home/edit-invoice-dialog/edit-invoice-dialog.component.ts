import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {Dialog, DIALOG_DATA} from "@angular/cdk/dialog";
import {Invoice} from "../../models/invoice.model";
import {Item} from "../../models/item.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'edit-invoice-dialog',
  templateUrl: './edit-invoice-dialog.component.html',
  styleUrls: ['./edit-invoice-dialog.component.css']
})
export class EditInvoiceDialogComponent implements OnInit{

  invoice!: Invoice;
  items!: Item[];
  editForm!: FormGroup;

  constructor(private dialog: Dialog,
              @Inject(DIALOG_DATA) private data: {invoice: Invoice, items: Item[]},
              private fb: FormBuilder) {


  }

  ngOnInit() {
    this.invoice = this.data.invoice;
    this.items = this.data.items;

    this.editForm = this.fb.group({
      senderAddress: this.fb.group({
        street: [this.invoice.senderAddress.street, Validators.required],
        city: [this.invoice.senderAddress.city, Validators.required],
        postCode: [this.invoice.senderAddress.postCode, Validators.required],
        country: [this.invoice.senderAddress.country, Validators.required]
      }),
      name: [this.invoice.clientName, Validators.required],
      email: [this.invoice.clientEmail, Validators.required],
      clintAddress: this.fb.group({
        street: [this.invoice.clientAddress.street, Validators.required],
        city: [this.invoice.clientAddress.city, Validators.required],
        postCode: [this.invoice.clientAddress.postCode, Validators.required],
        country: [this.invoice.clientAddress.country, Validators.required]
      }),
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
}
