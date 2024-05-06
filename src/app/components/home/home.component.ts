import { Component } from '@angular/core';
import { AppMaterialModule } from "../../material.module";
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIconButton } from "@angular/material/button";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AppMaterialModule,
    RouterOutlet,
    RouterLink,
    MatIconButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
