import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { AuthClient, RegisterUser } from "../../clients/api.client";
import { Router } from "@angular/router";
import { AppMaterialModule } from "../../material.module";

@Component({
  selector: "app-register-page",
  standalone: true,
  imports: [
    AppMaterialModule
  ],
  templateUrl: "./register-page.component.html",
  styleUrl: "./register-page.component.scss"
})
export class RegisterPageComponent {
  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  constructor(
    private userService: UserService,
    private authClient: AuthClient,
    private router: Router
  ) {
  }

  register() {
    const { name, email, password } = this.registerForm.value;
    if (name && email && password) {
      this.authClient.register({ name, email, password } as RegisterUser).subscribe(() => {
        this.userService.login(email, password);
      });
    }
  }

  goToLogin() {
    this.router.navigate(["login"])
  }
}
