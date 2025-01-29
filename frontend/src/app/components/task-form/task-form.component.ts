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
  @Input() taskToEdit: Task | null = null;
  @Output() reloadData = new EventEmitter<void>();

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

    const taskData: Task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      completed: this.taskToEdit?.completed ?? false,
      creation_date: this.taskToEdit?.creation_date ?? new Date(),
    };

    const request$ = this.isEditing && this.taskToEdit
      ? this._tasksService.editTask(this.taskToEdit.taskId ?? "", taskData, token)
      : this._tasksService.createTask(taskData, token);

    request$.subscribe((res) => this.handleApiResponse(res, this.isEditing ? 'editar' : 'crear'));

    this.taskForm.reset();

    this.taskForm.reset();
  }

  private handleApiResponse(res: Task | ApiResponse, action: string): void {
    this.setLoading(false);

    if ('status' in res && res.status === 500) {
      SmallIconAllert('error', `Ha ocurrido un error al ${action} la tarea`);
      return;
    }

    SmallIconAllert('success', `Tarea ${action} correctamente`);
    this.reloadData.emit();
  }

  private setLoading(state: boolean): void {
    if (this.loading !== state) {
      this.loading = state;
      this.loadingChange.emit(state);
    }
  }
}
