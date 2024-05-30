import { Component } from "@angular/core";
import { AppMaterialModule } from "../../material.module";
import { MatTableDataSource } from "@angular/material/table";
import { TaskClient, TaskDto } from "../../clients/api.client";
import { map } from "rxjs";
import { TaskListComponent } from "../task-list/task-list.component";
import { MatDialog } from "@angular/material/dialog";
import { TaskDialogComponent } from "../task-dialog/task-dialog.component";

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
    private dialog: MatDialog
  ) {
    this.taskDataSource = new MatTableDataSource<TaskDto>();
    this.tasks$.subscribe(tasks => {
      this.taskDataSource.data = tasks;
    });
  }

  addTask() {
    this.dialog.open(TaskDialogComponent);
  }
}
