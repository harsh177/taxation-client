import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable,throwError as observableThrowError, } from '../../node_modules/rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Common } from './common';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private _url_base:string = Common.base_url;
  private _url_get_tax_by_tax_status:string = this._url_base+"/downloadFile/report/";

  constructor(private http:HttpClient) { }

  getTaxByTaxStatus(status):Observable<any>{
    return this.http.get<any>(this._url_get_tax_by_tax_status+status).pipe(tap(data => data) , catchError(this.errorHandler));
  }
  
  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.error || "Server Error");
  }
  
}
