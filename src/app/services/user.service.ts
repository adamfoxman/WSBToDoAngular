import { Injectable } from '@angular/core';
import { AuthClient, UserClient, UserDto } from "../clients/api.client";
import { BehaviorSubject, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
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
    private userClient: UserClient,
    private authService: AuthService
  ) { }

  login(email: string, password: string) {
    this.authClient.login(email, password).pipe(take(1)).subscribe(token => {
      this.authService.setToken(token);
      const user = this.authService.decodeToken(token);
      this._user$.next(user);
    });
  }

  logout() {
    this.authClient.logout().pipe(take(1)).subscribe(() => {
      this.authService.removeToken();
      this._user$.next(undefined);
    });
  }
}
