import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Invoice} from "../models/invoice.model";
import { environment } from "../../environment/environment";
import {FullInvoice} from "../models/full-invoice";

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
}
