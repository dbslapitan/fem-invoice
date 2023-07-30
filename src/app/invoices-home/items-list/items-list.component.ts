import {Component, Input} from '@angular/core';
import {Item} from "../../models/item.model";

@Component({
  selector: 'items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent {

  @Input()
  items!: Item[];

  @Input()
  total!: number;
}
