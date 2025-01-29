import { Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { SmallIconAllert, YesNoAlert } from 'src/app/alerts/alerts';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';
import { MessageResponse } from 'src/app/types/message.type';
import { ApiResponse } from 'src/app/types/response-api.type';
import { Task } from 'src/app/types/task.type';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() editTask = new EventEmitter<Task>();
  @Input() loading!: boolean;
  @Output() loadingChange = new EventEmitter<boolean>();
  @Output() reloadData = new EventEmitter<void>();

  constructor(
    private _tasksService: TasksService,
    private _authService: AuthService
  ) { }

  toggleTaskStatus(task: Task): void {
    if (!this._authService.getToken()) return;

    task.completed = !task.completed;

    this._tasksService.editTask(this.task.taskId ?? "", task, this._authService.getToken() ?? "")
      .subscribe(async (res: Task | ApiResponse) => {
        if ((res as ApiResponse).status === 500) {
          SmallIconAllert('error', 'Ha ocurrido un error cambiar el estado de la tarea');
          return;
        } else {
          SmallIconAllert('success', 'OK');
        }
      });
  }

  editCurrentTask(task?: Task): void {
    if (task) this.editTask.emit(task);
  }

  async deleteTask(taskId?: string): Promise<void> {
    if (!taskId || !(await YesNoAlert('warning', '¿Estás seguro de que deseas eliminar la tarea?'))) return;

    const token = this._authService.getToken();
    if (!token) return;

    this.loadingChange.emit(true);
    this._tasksService.deleteTask(taskId, token)
      .pipe(finalize(() => { this.loadingChange.emit(false); this.reloadData.emit(); }))
      .subscribe(async (res: MessageResponse | ApiResponse) => {
        if ((res as ApiResponse).status === 500) {
          SmallIconAllert('error', 'Ha ocurrido un error al eliminar la tarea');
          return;
        }
        SmallIconAllert('success', 'Tarea eliminada correctamente');
      })
  }
}
