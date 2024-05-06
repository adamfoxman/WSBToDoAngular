import { Component, Input } from "@angular/core";
import { AppMaterialModule } from "../../material.module";
import { MatTableDataSource } from "@angular/material/table";
import { TaskDto } from "../../clients/api.client";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    AppMaterialModule,
    DatePipe
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input()
  tasks!: MatTableDataSource<TaskDto>;

  displayedColumns = [
    'title',
    'dueDate',
    'done',
    'priority',
  ]
}
