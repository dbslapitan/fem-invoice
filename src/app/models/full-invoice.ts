import {Address} from "./address.model";
import {Item} from "./item.model";

export interface FullInvoice{
  id: number;
  stringId: string;
  createdAt: Date;
  paymentDue: Date;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  total: number;
  client: Address;
  sender: Address;
  items: Item[];
}
