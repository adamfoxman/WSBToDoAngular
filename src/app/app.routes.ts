import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { TasksPageComponent } from "./components/tasks-page/tasks-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: MainPageComponent
      },
      {
        path: 'tasks',
        component: TasksPageComponent
      }
    ]
  }
];
