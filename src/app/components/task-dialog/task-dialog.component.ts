import { Component, Inject, OnInit } from "@angular/core";
import { AppMaterialModule } from "../../material.module";
import { FormControl, FormGroup } from "@angular/forms";
import { Priority, Task, TaskClient, TaskDto } from "../../clients/api.client";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import { UserService } from "../../services/user.service";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-task-dialog",
  standalone: true,
  imports: [
    AppMaterialModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatCheckbox,
    MatSelect,
    MatDatepickerInput,
    MatOption,
    MatDatepickerToggle,
    MatDatepicker,
    MatDialogActions
  ],
  templateUrl: "./task-dialog.component.html",
  styleUrl: "./task-dialog.component.scss"
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({
    owner: new FormControl(""),
    title: new FormControl(""),
    description: new FormControl(""),
    done: new FormControl(false),
    dueDate: new FormControl(new Date()),
    priority: new FormControl("")
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task | TaskDto,
    private dialog: MatDialog,
    private taskClient: TaskClient,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  saveTask() {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      if (this.task) {
        if ("_id" in this.task) {
          task._id = this.task._id;
        }
        this.taskClient.updateTask(task).subscribe(() => {
          console.log("Task updated");
          this.close();
        });
      } else {
        task.owner = this.userService.user?.id || "";
        this.taskClient.addTask(task).subscribe(() => {
          console.log("Task created");
          this.close();
        });
      }
    }
  }

  protected readonly Priority = Priority;
  protected readonly Object = Object;

  close() {
    this.dialog.closeAll();
  }
}
