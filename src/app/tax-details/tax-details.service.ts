import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable,throwError as observableThrowError, } from '../../../node_modules/rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Common } from '../common';
import { ApplicationResponse } from '../application-response';

@Injectable({
  providedIn: 'root'
})
export class TaxDetailsService {
  private _url_base:string = Common.base_url;
  private _url_get_tax_details_by_property_id:string = this._url_base+"/taxDetails/";
  private _url_get_tax_details_by_tax_detail_id:string = this._url_base+"/taxDetails/";
  private _url_tax_pay:string = this._url_base+"/property/payTax";

  constructor(private http:HttpClient) { }

  updateTaxStatus(details):Observable<ApplicationResponse>{
    return this.http.post<ApplicationResponse>(this._url_tax_pay,details).pipe(tap(data=>data),catchError(this.errorHandler));
  }

  getTaxDetailsByPropertyId(propertyId):Observable<ApplicationResponse>{
    return this.http.get<ApplicationResponse>(this._url_get_tax_details_by_property_id+propertyId+'/getAll').pipe(tap(data => data) , catchError(this.errorHandler));
  }

  getTaxDetailsByTaxDetailId(taxDetailId):Observable<ApplicationResponse>{
    return this.http.get<ApplicationResponse>(this._url_get_tax_details_by_tax_detail_id+taxDetailId).pipe(tap(data => data) , catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }
}
