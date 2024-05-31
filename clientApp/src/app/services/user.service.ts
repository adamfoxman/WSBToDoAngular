import { Injectable } from '@angular/core';
import { AuthClient, UserClient, UserDto } from '../clients/api.client';
import { BehaviorSubject, catchError, take } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _user$ = new BehaviorSubject<UserDto | undefined>(undefined);

  get user$() {
    return this._user$;
  }

  get user() {
    return this._user$.getValue();
  }

  constructor(
    private authClient: AuthClient,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private alertService: AlertService,
  ) {
    const token = this.cookieService.get('ExpressGeneratorTs');
    if (token) {
      try {
        const user = this.authService.decodeToken(token);
        this.user$.next(user);
      } catch (e) {
        this.authService.removeToken();
        console.error(e);
      }
    }
  }

  login(email: string, password: string) {
    this.authClient
      .login(email, password)
      .pipe(take(1))
      .subscribe(
        (res) => {
          if (res.ok) {
            const token = this.cookieService.get('ExpressGeneratorTs');
            this.authService.setToken(token);
            const user = this.authService.decodeToken(token);
            this.user$.next(user);
            this.router.navigate(['']);
          }
        },
        (err) => {
          const error = err as HttpErrorResponse;
          if (error.status === 401) {
            this.alertService.error('Invalid email or password');
          } else {
            this.alertService.error('An error occurred' + err.statusText);
          }
        },
      );
  }

  logout() {
    this.authClient
      .logout()
      .pipe(take(1))
      .subscribe(() => {
        this.authService.removeToken();
        this.user$.next(undefined);
      });
  }
}
