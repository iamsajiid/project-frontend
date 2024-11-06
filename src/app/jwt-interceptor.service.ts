import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token'); // Retrieve the token from storage

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}` // Add the token to the Authorization header
                }
            });
        }

        return next.handle(request); // Pass the request to the next handler
    }
}
