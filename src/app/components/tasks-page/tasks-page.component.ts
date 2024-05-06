import { Component } from '@angular/core';
import { AppMaterialModule } from "../../material.module";
import { MatTableDataSource } from "@angular/material/table";
import { TaskDto, TaskClient } from "../../clients/api.client";
import { UserService } from "../../services/user.service";
import { map } from "rxjs";
import { TaskListComponent } from "../task-list/task-list.component";

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [
    AppMaterialModule,
    TaskListComponent
  ],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.scss'
})
export class TasksPageComponent {
  taskDataSource: MatTableDataSource<TaskDto>;

  tasks$ = this.taskClient.getAllTasks().pipe(
    map(result => result.tasks)
  );

  constructor(
    private taskClient: TaskClient,
  ) {
    this.taskDataSource = new MatTableDataSource<TaskDto>();
    this.tasks$.subscribe(tasks => {
      this.taskDataSource.data = tasks;
    });
  }
}
