import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Invoice} from "../models/invoice.model";
import { environment } from "../../environment/environment";
import {FullInvoice} from "../models/full-invoice";
import {Address} from "../models/address.model";
import {Item} from "../models/item.model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getAllInvoices(){
    return this.http.get<Invoice[]>(`${environment.baseUrl}/api/v1/invoices`);
  }

  getFullInvoice(stringId: string){
    return this.http.get<FullInvoice>(`${environment.baseUrl}/api/v1/invoices/${stringId}`);
  }

  saveFullInvoiceChanges(body: {invoice: Invoice, addresses: Address[], items: Item[]}){
    return this.http.put(`${environment.baseUrl}/api/v1/invoices/${body.invoice.stringId}`, body);
  }

  markInvoiceAsPaid(stringId: string){
    return this.http.put(`${environment.baseUrl}/api/v1/invoices/mark-as-paid/${stringId}`, {});
  }

  deleteInvoice(stringId: string){
    return this.http.delete(`${environment.baseUrl}/api/v1/invoices/delete/${stringId}`);
  }

  saveInvoiceAsDraft(body: {invoice: Invoice, addresses: Address[], items: Item[]}){
    return this.http.post<{success: boolean, message: string}>(`${environment.baseUrl}/api/v1/invoices/save-as-draft`, body);
  }
}
