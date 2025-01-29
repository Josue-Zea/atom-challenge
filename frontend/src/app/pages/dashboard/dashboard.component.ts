import { Component } from '@angular/core';
import { SmallIconAllert } from 'src/app/alerts/alerts';
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
  showCompleted: boolean = false;

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

  onLoadingChange(value: boolean) {
    this.loading = value;
  }

  onEditTask(task: Task): void {
    this.isEditing = true;
    this.taskToEdit = task;
  }

  loadTasksFromLocalStorage(): void {
    this.tasks = this._tasksService.getTasksFromLocalStorage();

    this.isEditing = false;
    this.taskToEdit = null;
  }

  get pendingTasksCount(): number {
    return this.tasks.filter(task => !task.completed).length;
  }

  get completedTasksCount(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get filteredTasks(): Task[] {
    return this.tasks.filter(task => task.completed === this.showCompleted);
  }

  toggleShowCompleted(): void {
    this.showCompleted = !this.showCompleted;
  }
}
