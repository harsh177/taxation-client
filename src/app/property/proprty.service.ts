import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Observable,throwError as observableThrowError, } from '../../../node_modules/rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IProperty } from './property-interface';
import { Common } from '../common';
import { IPropertyUsage } from './property-usage-interface';
import { IPropertyType } from './property-type-interface';
import { ApplicationResponse } from '../application-response';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private _url_base:string = Common.base_url;
  private _url_getall_property:string = this._url_base+"/property/getAll";
  private _url_create_property:string = this._url_base+"/property/add";
  private _url_getall_property_usage:string = this._url_base+"/seed/propertyUsage/getAll";
  private _url_getall_property_types:string = this._url_base+"/seed/propertyTypes/getAll";
  private _url_get_property_phone_or_samagra = this._url_base+"/property/getByPhoneOrSamagra";

  constructor(private http:HttpClient) { }

  saveProperty(property):Observable<IProperty>{
    return this.http.post<IProperty>(this._url_create_property,property).pipe(tap(data=>data),catchError(this.errorHandler));
  }

  
  getPropertyByPhoneOrSamagra(phoneOrSamagra):Observable<ApplicationResponse>{
    const headers = new HttpHeaders().set('EJB', 'slkdfj');
        // headers.set('Content-Type', 'application/json');
        // headers.set('authentication', `hello`);
 
    return this.http.post<ApplicationResponse>(this._url_get_property_phone_or_samagra,phoneOrSamagra,{headers:headers}).pipe(tap(data=>data),catchError(this.errorHandler));
  }

  getProperties():Observable<IProperty[]>{
    return this.http.get<IProperty[]>(this._url_getall_property).pipe(tap(data => data) , catchError(this.errorHandler));
  }

  getAllPropertyUsage():Observable<ApplicationResponse>{
    return this.http.get<ApplicationResponse>(this._url_getall_property_usage).pipe(tap(data => data) , catchError(this.errorHandler));
  }

  
  getAllPropertyType():Observable<ApplicationResponse>{
    return this.http.get<ApplicationResponse>(this._url_getall_property_types).pipe(tap(data => data) , catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }
}
