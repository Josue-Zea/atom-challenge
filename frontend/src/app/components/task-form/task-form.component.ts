import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SmallIconAllert } from 'src/app/alerts/alerts';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';
import { ApiResponse } from 'src/app/types/response-api.type';
import { Task } from 'src/app/types/task.type';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  taskForm: FormGroup;
  @Input() loading!: boolean;
  @Output() loadingChange = new EventEmitter<boolean>();
  @Input() isEditing!: boolean;
  @Input() taskToEdit: Task | null = null

  constructor(
    private fb: FormBuilder,
    private _tasksService: TasksService,
    private _authService: AuthService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToEdit'] && this.taskToEdit) {
      this.taskForm.patchValue({
        title: this.taskToEdit.title,
        description: this.taskToEdit.description
      });
    }
  }

  addTask(): void {
    const token = this._authService.getToken();
    if (!token) { return; }
    this.loadingChange.emit(true);
    
    if (this.isEditing && this.taskToEdit) {
      const taskToEdit: Task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.title,
        completed: this.taskToEdit.completed,
        creation_date: this.taskToEdit.creation_date,
    }
      this._tasksService.editTask(this.taskToEdit.taskId ?? "", taskToEdit, token)
      .subscribe(async (res: Task | ApiResponse) => {
        this.loadingChange.emit(false);
        if ((res as ApiResponse).status === 500) {
          SmallIconAllert('error', 'Ha ocurrido un error al editar');
          return;
        } else {
          SmallIconAllert('success', 'Tarea editada correctamente');
        }
      });

      // const index = this.tasks.findIndex((t) => t.id === this.taskToEdit?.id);
      // if (index !== -1) {
      //   this.tasks[index] = {
      //     ...this.taskToEdit,
      //     ...this.taskForm.value,
      //   };
      // }
      // this.isEditing = false;
      // this.taskToEdit = null;
    } else {
      const newTask: Task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        creation_date: new Date(),
        completed: false,
      };
      this._tasksService.createTask(newTask, token)
        .subscribe(async (res: Task | ApiResponse) => {
          this.loadingChange.emit(false);
          if ((res as ApiResponse).status === 500) {
            SmallIconAllert('error', 'Ha ocurrido un error al crear la tarea');
            return;
          } else {
            SmallIconAllert('success', 'Tarea creada correctamente');
          }
        })
    }

    // this.saveTasks();
    // this.taskForm.reset();
  }
}
