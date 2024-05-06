import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { AuthService } from "../services/auth.service";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders : {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      }
    });

    const token: string | null = this.authService.getToken();
    if (token && request.url.includes(environment.api)) {

      const params = request.params;
      let headers = request.headers;

      if (token) {
        headers = headers.set('accessToken', token);
      }

      request = request.clone({
        params,
        headers
      });
    }

    return next.handle(request);
  }
}
