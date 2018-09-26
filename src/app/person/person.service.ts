import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable,throwError as observableThrowError, } from '../../../node_modules/rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IPerson } from './person-interface';
import { Common } from '../common';
import { ApplicationResponse } from '../application-response';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private _url_base:string = Common.base_url;
  private _url_getall_persons:string = this._url_base+"/person/getAll";
  private _url_create_person:string = this._url_base+"/person/add";
  private _url_update_person:string = this._url_base+"/person/edit";
	private _url_PERSON_GET_SAMAGRA:string = this._url_base+"/person/get/samagra/";
  private _url_PERSON_GET_PHONE:string = this._url_base+"/person/get/phone/";
  private _url_PERSON_GET_ID:string = this._url_base+"/person/get/id/";
  private _url_PERSON_DELETE:string = this._url_base+"/person/delete/";

  constructor(private http:HttpClient) { }

  savePerson(person):Observable<any>{
    return this.http.post<any>(this._url_create_person,person).pipe(tap(data=>data),catchError(this.errorHandler));
  }

  getPersons():Observable<any>{
    return this.http.get<any>(this._url_getall_persons).pipe(tap(data => data) , catchError(this.errorHandler));
  }

  getPersonBySamagraId(samagra):Observable<ApplicationResponse>{
    return this.http.get<ApplicationResponse>(this._url_PERSON_GET_SAMAGRA+samagra).pipe(tap(data => data) , catchError(this.errorHandler));
  }

  getPersonByPhone(phone):Observable<ApplicationResponse>{
    return this.http.get<ApplicationResponse>(this._url_PERSON_GET_PHONE+phone).pipe(tap(data => data) , catchError(this.errorHandler));
  }

  deletePerson(id):Observable<ApplicationResponse>{
    return this.http.delete<ApplicationResponse>(this._url_PERSON_DELETE+id).pipe(tap(data => data) , catchError(this.errorHandler));
  }

  getPersonById(id):Observable<ApplicationResponse>{
    return this.http.get<ApplicationResponse>(this._url_PERSON_GET_ID+id).pipe(tap(data => data) , catchError(this.errorHandler));
  }

  updatePerson(person):Observable<any>{
    return this.http.put<any>(this._url_update_person,person).pipe(tap(data=>data),catchError(this.errorHandler));
  }

  id:string  = "";

  setId(id:string){
    this.id = id;
  }

  getId():string{
    return  this.id;
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.error || "Server Error");
  }
}
