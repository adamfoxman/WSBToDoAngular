import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AppMaterialModule } from '../../material.module';
import { Router } from '@angular/router';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AppMaterialModule, AlertComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  login() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.userService.login(email, password);
    }
  }

  goToRegister() {
    this.router.navigate(['register']);
  }
}
