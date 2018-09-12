import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        console.log('hjhjjhjhjhj');
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser);
        if (currentUser && currentUser.accessToken) {
            console.log("loda lussan");
            request = request.clone({
                setHeaders: { 
                    "Authorization": "Bearer "+currentUser.accessToken
                }
            });
        }
        return next.handle(request);
    }
}