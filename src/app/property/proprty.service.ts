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
  private _url_update_property:string = this._url_base+"/property/update";
  private _url_transfer_property:string = this._url_base+"/property/transfer";
  private _url_upload_file:string = this._url_base+"/uploadMultipleFiles";
  private _url_getall_property_usage:string = this._url_base+"/seed/propertyUsage/getAll";
  private _url_getall_property_types:string = this._url_base+"/seed/propertyTypes/getAll";
  private _url_get_property_phone_or_samagra = this._url_base+"/property/getByPhoneOrSamagra";
  private _url_get_property_phone_or_samagra_or_unique = this._url_base+"/property/getByPhoneOrSamagraOrUnique";

  constructor(private http:HttpClient) { }

  saveProperty(property):Observable<IProperty>{
    let currentUser = <any>JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post<IProperty>(this._url_create_property+'/'+currentUser.panchayat.panchayatId+'/'+currentUser.uid,property).pipe(tap(data=>data),catchError(this.errorHandler));
  }

  updateProperty(property):Observable<IProperty>{
    return this.http.post<IProperty>(this._url_update_property,property).pipe(tap(data=>data),catchError(this.errorHandler));
  }
  
  getPropertyByPhoneOrSamagra(phoneOrSamagra):Observable<ApplicationResponse>{
    return this.http.post<ApplicationResponse>(this._url_get_property_phone_or_samagra,phoneOrSamagra).pipe(tap(data=>data),catchError(this.errorHandler));
  }

  getPropertyByPhoneOrSamagraOrUniqueId(phoneOrSamagraOrUniqueId):Observable<ApplicationResponse>{
    return this.http.post<ApplicationResponse>(this._url_get_property_phone_or_samagra_or_unique,phoneOrSamagraOrUniqueId).pipe(tap(data=>data),catchError(this.errorHandler));
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

  //file upload
  postFile(fileToUpload: File[],uuid:string):Observable<any>{
    const formData: FormData = new FormData();
    for(var i=0;i<fileToUpload.length;i++){
      formData.append('files', fileToUpload[i], this.generateFileName(fileToUpload[i].name,uuid,i));      
    }
    return this.http.post<any>(this._url_upload_file,formData).pipe(tap(data=>data),catchError(this.errorHandler));
  }

  transferProperty(transfer):Observable<any>{
    let currentUser = <any>JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post<any>(this._url_transfer_property+'/'+currentUser.panchayat.panchayatId+'/'+currentUser.uid,transfer).pipe(tap(data=>data),catchError(this.errorHandler));
  }

  generateFileName(name:string,uuid:string,index){
    return name.split(".")[0]+"_"+uuid+"_"+index+"."+name.split(".")[1];;
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.error || "Server Error");
  }

  propertyObj:any;

  setPropertyObj(propertyObj:any){
    this.propertyObj=propertyObj;
  }

  getPropertyObj():any{
    return  this.propertyObj;
  }

}
