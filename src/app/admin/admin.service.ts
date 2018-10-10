import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable,throwError as observableThrowError, } from '../../../node_modules/rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Common } from '../common';
import { ApplicationResponse } from '../application-response';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private _url_base:string = Common.base_url;
  private _url_getall_persons:string = this._url_base+"/taxDetails/createForAllProperties";

  constructor(private http:HttpClient) { }

  calculateTax():Observable<any>{
    return this.http.get<any>(this._url_getall_persons).pipe(tap(data => data) , catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.error || "Server Error");
  }
  
}
