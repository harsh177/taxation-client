import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from '../../../node_modules/rxjs/operators';
import { NgxSpinnerService } from '../../../node_modules/ngx-spinner';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser);
        if (currentUser && currentUser.accessToken) {
            request = request.clone({
                setHeaders: { 
                    "Authorization": "Bearer "+currentUser.accessToken
                }
            });
        }
        
        return next.handle(request).pipe(
	        tap(event => {
        
	          if (event instanceof HttpResponse) {
	             
	            console.log(" all looks good");
	            // http response status code
	            console.log(event.status);
	          }
	        }, error => {
	   			// http response status code
	          	console.log("----response----");
	          	console.error("status code:");
	          	console.error(error.status);
	          	console.error(error.message);
                console.log("--- end of response---");
                  if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                      // redirect to the login route
                      // or show a modal
                    }
                  }
	        })
	      );
    }
}