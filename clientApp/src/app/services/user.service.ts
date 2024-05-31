import { Injectable } from '@angular/core';
import { AuthClient, UserClient, UserDto } from '../clients/api.client';
import { BehaviorSubject, take } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

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
  ) {
    const token = this.cookieService.get('ExpressGeneratorTs');
    if (token) {
      const user = this.authService.decodeToken(token);
      this.user$.next(user);
    }
  }

  login(email: string, password: string) {
    this.authClient
      .login(email, password)
      .pipe(take(1))
      .subscribe((res) => {
        if (res.ok) {
          const token = this.cookieService.get('ExpressGeneratorTs');
          this.authService.setToken(token);
          const user = this.authService.decodeToken(token);
          this.user$.next(user);
          this.router.navigate(['']);
        }
      });
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
