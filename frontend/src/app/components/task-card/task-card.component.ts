import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() task: Task;
  @Output() editTask = new EventEmitter<Task>();
  @Input() loading!: boolean;
  @Output() loadingChange = new EventEmitter<boolean>();
  @Output() reloadData = new EventEmitter<void>();

  constructor(
    private _tasksService: TasksService,
    private _authService: AuthService
  ) {
    this.task = {
      taskId: "",
      title: "",
      description: "",
      creation_date: new Date(),
      completed: false,
    };
  }

  toggleTaskStatus(task: Task): void {
    task.completed = !task.completed;
    const token = this._authService.getToken();
    if (!token) { return; }
    this._tasksService.editTask(this.task.taskId ?? "", task, token)
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
    if (!task) { return; }
    this.editTask.emit(task);
  }

  async deleteTask(taskId?: string): Promise<void> {
    const result = await YesNoAlert('warning', '¿Estás seguro de que deseas eliminar la tarea?');
    if (!result) { return; }

    const token = this._authService.getToken();
    if (!token || !taskId) { return; }

    this.loadingChange.emit(true);
    this._tasksService.deleteTask(taskId, token)
      .subscribe(async (res: MessageResponse | ApiResponse) => {
        this.loadingChange.emit(false);
        if ((res as ApiResponse).status === 500) {
          SmallIconAllert('error', 'Ha ocurrido un error al eliminar la tarea');
          return;
        }
        SmallIconAllert('success', 'Tarea eliminada correctamente');
        this.reloadData.emit();
      })
  }
}
