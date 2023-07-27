import {Address} from "./address.model";
import {Item} from "./item.model";
import {Invoice} from "./invoice.model";

export interface FullInvoice{
  invoice: Invoice,
  items: Item[],
  addresses: Address[]
}
