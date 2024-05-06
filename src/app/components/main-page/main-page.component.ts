import { Component } from '@angular/core';
import { AppMaterialModule } from "../../material.module";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    AppMaterialModule
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
