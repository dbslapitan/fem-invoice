import {ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {FullInvoice} from "../models/full-invoice";
import {inject} from "@angular/core";
import {InvoiceService} from "./invoice.service";
import {tap} from "rxjs";

export const fullInvoiceResolver: ResolveFn<FullInvoice> = (route, state) => {
  const stringId = route.paramMap.get('stringId');
  return inject(InvoiceService).getFullInvoice(stringId!);
}
