import {Component, ElementRef, HostListener, Inject, OnInit} from '@angular/core';
import {Dialog, DIALOG_DATA} from "@angular/cdk/dialog";
import {Invoice} from "../../models/invoice.model";
import {Item} from "../../models/item.model";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CDK_MENU} from "@angular/cdk/menu";
import {CdkScrollable, ConnectedPosition, ScrollDispatcher} from "@angular/cdk/overlay";
import {Observable} from "rxjs";
import {DecimalPipe, formatNumber} from "@angular/common";

@Component({
  selector: 'edit-invoice-dialog',
  templateUrl: './edit-invoice-dialog.component.html',
  styleUrls: ['./edit-invoice-dialog.component.css']
})
export class EditInvoiceDialogComponent implements OnInit{

  invoice!: Invoice;
  inputItems!: Item[];
  editForm!: FormGroup;
  menuIsOpen = false;
  paymentTerm = 1;

  connectedPositions: ConnectedPosition[] = [
    {
      overlayX: 'center',
      overlayY: "top",
      originY: 'bottom',
      originX: 'center',
      offsetY: 24
    },
    {
      overlayX: 'center',
      overlayY: "bottom",
      originY: 'top',
      originX: 'center',
      offsetY: -24
    }
  ];

  constructor(private dialog: Dialog,
              @Inject(DIALOG_DATA) private data: {invoice: Invoice, items: Item[]},
              private fb: FormBuilder,
              private decimalPipe: DecimalPipe) {

  }

  ngOnInit() {
    this.invoice = this.data.invoice;
    this.inputItems = this.data.items;

    console.log(this.inputItems)

    this.paymentTerm = this.invoice.paymentTerms;

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
      projectDescription: [this.invoice.description, Validators.required],
      items: this.fb.array([])
    });
    this.addItems();
    console.log(this.editForm.getRawValue());
  }

  get getItems(){
    return this.editForm.controls['items'] as FormArray;
  }

  addItems(){

    for(let item of this.inputItems){
      const itemForm = this.fb.group({
        name: [item.name, Validators.required],
        quantity: [item.quantity, Validators.required],
        price: [ this.decimalPipe.transform(item.price, ".2"), Validators.required],
        total: [item.total, Validators.required]
      });
      this.getItems.push(itemForm);
    }
  }

  goBackClicked(){
    this.dialog.getDialogById("editInvoice")?.close();
    const header = document.getElementById("header");
    header!.scrollIntoView();
  }

  paymentTermClicked(day: number, flag: HTMLInputElement){
    this.editForm.patchValue({paymentTerm: day});
    this.paymentTerm = day;
    this.menuIsOpen = false;
    flag.checked = false;
  }

  menuClicked(flag: HTMLInputElement){
    this.menuIsOpen = !this.menuIsOpen;
    flag.checked = this.menuIsOpen;
  }

  clickedOutsideOverlay(event: Event, flag: HTMLInputElement, triggerRef: ElementRef){
    if(!triggerRef.nativeElement.contains(event.target)){
      this.menuIsOpen = !this.menuIsOpen;
      flag.checked = this.menuIsOpen;
    }
  }

  setDecimal(index: number){
    const arrayPoint = this.editForm.controls["items"] as FormArray;
    const groupPoint = arrayPoint.controls[index] as FormGroup;
    const arraySplit = groupPoint.controls['price'].value.split(',');
    const commaRemoved = arraySplit.join('');
    groupPoint.controls['price'].setValue(this.decimalPipe.transform(commaRemoved, ".2"))
  }
}
