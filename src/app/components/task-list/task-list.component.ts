import { Component, Input, OnInit } from "@angular/core";
import { AppMaterialModule } from "../../material.module";
import { MatTableDataSource } from "@angular/material/table";
import { Priority, TaskClient, TaskDto } from "../../clients/api.client";
import { DatePipe } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { TaskDialogComponent } from "../task-dialog/task-dialog.component";

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
export class TaskListComponent implements OnInit {
  @Input()
  tasks!: MatTableDataSource<TaskDto>;

  displayedColumns = [
    'title',
    'dueDate',
    'done',
    'priority',
    'edit'
  ]

  constructor(
    private taskClient: TaskClient,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.tasks = new MatTableDataSource<TaskDto>();
    this.taskClient.getAllTasks().subscribe((tasks) => {
      this.tasks.data = tasks.tasks;
    }, (error) => {
      this.tasks.data = [
        {
          id: '1',
          title: 'Task 1',
          dueDate: new Date(),
          done: false,
          priority: Priority.HIGH,
          owner: '12345',
          description: 'This is a test task'
        },
        {
          id: '2',
          title: 'Task 2',
          dueDate: new Date(),
          done: false,
          priority: Priority.LOW,
          owner: '12345',
          description: 'This is a test task'
        },
        {
          id: '3',
          title: 'Task 3',
          dueDate: new Date(),
          done: false,
          priority: Priority.MEDIUM,
          owner: '12345',
          description: 'This is a test task'
        }
      ]
    });
  }

  editTask(task: TaskDto) {
    this.dialog.open(TaskDialogComponent, {
      data: task
    });
  }
}
