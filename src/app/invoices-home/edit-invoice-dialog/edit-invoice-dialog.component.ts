import {Component, HostListener} from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";

@Component({
  selector: 'edit-invoice-dialog',
  templateUrl: './edit-invoice-dialog.component.html',
  styleUrls: ['./edit-invoice-dialog.component.css']
})
export class EditInvoiceDialogComponent {

  constructor(private dialog: Dialog) {
  }

  goBackClicked(){
    this.dialog.getDialogById("editInvoice")?.close();
    const header = document.getElementById("header");
    header!.scrollIntoView();
  }
}
