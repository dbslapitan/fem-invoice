import {Component, Inject, OnInit} from '@angular/core';
import {Dialog, DIALOG_DATA} from "@angular/cdk/dialog";

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit{

  stringId!: string;
  constructor(@Inject(DIALOG_DATA) private data: {stringId: string},
              private dialog: Dialog) {
  }

  ngOnInit() {
    this.stringId = this.data.stringId;
  }

  actionClicked(isDelete: boolean){
    this.dialog.getDialogById("deleteInvoice")?.close(isDelete);
  }
}
