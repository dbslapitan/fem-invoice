import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Invoice} from "../models/invoice.model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) {

  }

  getAllInvoices(){
    return this.http.get<Invoice[]>('http://localhost:9000/api/v1/invoices');
  }
}
