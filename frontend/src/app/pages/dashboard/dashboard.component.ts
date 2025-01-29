import { Component } from '@angular/core';
import { SmallIconAllert, YesNoAlert } from 'src/app/alerts/alerts';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';
import { ApiResponse } from 'src/app/types/response-api.type';
import { Task } from 'src/app/types/task.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  tasks: Task[] = [];
  isEditing: boolean = false;
  taskToEdit: Task | null = null;
  loading: boolean = false;

  constructor(
    private _tasksService: TasksService,
    private _authService: AuthService
  ) {
    this.loadTasks();
  }

  loadTasks(): void {
    const token = this._authService.getToken();
    if (!token) { return; }
    this.loading = true;
    this._tasksService.getTasks(token)
      .subscribe(async (res: Task[] | ApiResponse) => {
        this.loading = false;
        if ((res as ApiResponse).status === 500) {
          SmallIconAllert('error', 'Ha ocurrido un error al cargar las tareas');
          return;
        }
        this.tasks = res as Task[];
      })
  }

  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  onLoadingChange(value: boolean) {
    this.loading = value;
  }

  onEditTask(task: Task): void {
    this.isEditing = true;
    this.taskToEdit = task;
  }

  loadTasksFromLocalStorage(): void {
    const currentTasks = this._tasksService.getTasksFromLocalStorage();
    this.tasks = [...currentTasks];
  }
}
