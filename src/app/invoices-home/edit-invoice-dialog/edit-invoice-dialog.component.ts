import {AfterViewInit, Component, ContentChild, DoCheck, ElementRef, HostListener, Inject, OnInit} from '@angular/core';
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
export class EditInvoiceDialogComponent implements OnInit, DoCheck{

  invoice!: Invoice;
  inputItems!: Item[];
  editForm!: FormGroup;
  menuIsOpen = false;
  paymentTerm = 1;
  isAddBtnClicked = false;

  connectedPositions: ConnectedPosition[] = [
    {
      overlayX: 'center',
      overlayY: "top",
      originY: 'bottom',
      originX: 'center',
      offsetY: 8
    },
    {
      overlayX: 'center',
      overlayY: "bottom",
      originY: 'top',
      originX: 'center',
      offsetY: -8
    }
  ];

  constructor(private dialog: Dialog,
              @Inject(DIALOG_DATA) private data: {invoice: Invoice, items: Item[], isEdit: boolean},
              private fb: FormBuilder,
              private decimalPipe: DecimalPipe) {

  }

  ngOnInit() {
    this.invoice = this.data.invoice;
    this.inputItems = this.data.items;

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
      invoiceDate: [{value: this.invoice.createdAt, disabled: this.data.isEdit}, Validators.required],
      paymentTerm: [this.invoice.paymentTerms, Validators.required],
      projectDescription: [this.invoice.description, Validators.required],
      items: this.fb.array([])
    }, {updateOn: "blur"});
    this.addItems();
  }

  ngDoCheck() {

    if(this.isAddBtnClicked){
      const addItemBtn = document.getElementById("addItemBtn");
      addItemBtn!.scrollIntoView({behavior: "smooth"});
    }
  }

  get getItems(){
    return this.editForm.controls['items'] as FormArray;
  }

  addItem(){
    const newItem = this.fb.group({
      name: ["", Validators.required],
      quantity: [1, Validators.required],
      price: [0, Validators.required],
      total: [0, Validators.required]
    });

    this.getItems.push(newItem);
    this.isAddBtnClicked = true;
  }

  addItems(){

    for(let item of this.inputItems){
      const itemForm = this.fb.group({
        name: [item.name, Validators.required],
        quantity: [item.quantity, Validators.required],
        price: [item.price, Validators.required],
        total: [item.total, Validators.required]
      });
      this.getItems.push(itemForm);
    }
  }

  cancelChanges(){
    this.dialog.getDialogById("editInvoice")?.close();
  }

  saveChanges(){

  }

  deleteItem(index: number){
    this.getItems.removeAt(index);
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
    if(!triggerRef.nativeElement.contains(event.target)
      && !(event.target as HTMLElement).classList.contains('theme')){
      this.menuIsOpen = !this.menuIsOpen;
      flag.checked = this.menuIsOpen;
    }
  }

  updatePrice(index: number, priceDisplay: HTMLInputElement, total: HTMLElement){
    const priceSplit = priceDisplay.value.split(',');
    const price = (this.getItems.controls[index] as FormGroup).controls['price'];
    const quantity = (this.getItems.controls[index] as FormGroup).controls['quantity'];
    const totalAmt = (this.getItems.controls[index] as FormGroup).controls['total'];
    price.setValue(priceSplit.join(''));
    totalAmt.setValue(price.value * quantity.value);
    console.log(this.getItems.controls[index].getRawValue())
    priceDisplay.value = this.decimalPipe.transform(price.value, ".2") as string;
  }

  getTotal(item: number){
    const qty = ((this.editForm.controls["items"] as FormArray).controls[item] as FormGroup).controls['quantity'].value;
    const price = ((this.editForm.controls["items"] as FormArray).controls[item] as FormGroup).controls['price'].value;
    const total = qty * price;
    ((this.editForm.controls["items"] as FormArray).controls[item] as FormGroup).controls['total'].setValue(total);
    return total;
  }

  getPriceWithDecimal(item: number){
    const price = ((this.editForm.controls['items'] as FormArray).controls[item] as FormGroup).controls['price'].value;
    return this.decimalPipe.transform(price, ".2");
  }

  checkQuantity(input: HTMLInputElement, index: number){
    if(isNaN(parseInt(input.value)) || parseInt(input.value) <= 0){
      input.value = "1";
      (this.getItems.controls[index] as FormGroup).controls['quantity'].setValue(1);
    }
  }
}
