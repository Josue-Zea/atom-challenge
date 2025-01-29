import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SmallIconAllert } from 'src/app/alerts/alerts';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';
import { ApiResponse } from 'src/app/types/response-api.type';
import { Task } from 'src/app/types/task.type';

const tasks1: Task[] = [
  {
    taskId: "1",
    title: "Tarea 1",
    description: "Descripción de la tarea 1",
    creation_date: new Date(),
    completed: false,
  },
  {
    taskId: "2",
    title: "Tarea 2",
    description: "Descripción de la tarea 2",
    creation_date: new Date(),
    completed: false,
  },
  {
    taskId: "3",
    title: "Tarea 3",
    description: "Descripción de la tarea 3",
    creation_date: new Date(),
    completed: false,
  },
  {
    taskId: "4",
    title: "Tarea 4",
    description: "Descripción de la tarea 4",
    creation_date: new Date(),
    completed: false,
  },
  {
    taskId: "5",
    title: "Tarea 1",
    description: "Descripción de la tarea 1",
    creation_date: new Date(),
    completed: false,
  },
  {
    taskId: "6",
    title: "Tarea 2",
    description: "Descripción de la tarea 2",
    creation_date: new Date(),
    completed: false,
  },
  {
    taskId: "7",
    title: "Tarea 3",
    description: "Descripción de la tarea 3",
    creation_date: new Date(),
    completed: false,
  },
  {
    taskId: "8",
    title: "Tarea 4",
    description: "Descripción de la tarea 4",
    creation_date: new Date(),
    completed: false,
  },
  {
    taskId: "6",
    title: "Tarea 2",
    description: "Descripción de la tarea 2",
    creation_date: new Date(),
    completed: false,
  },
  {
    taskId: "7",
    title: "Tarea 3",
    description: "Descripción de la tarea 3",
    creation_date: new Date(),
    completed: false,
  },
  {
    taskId: "8",
    title: "Tarea 4",
    description: "Descripción de la tarea 4",
    creation_date: new Date(),
    completed: false,
  }

];

const tasks2: Task[] = [
  {
    taskId: "1",
    title: "Tarea 1",
    description: "Descripción de la tarea 1",
    creation_date: new Date(),
    completed: false,
  },
  {
    taskId: "2",
    title: "Tarea 2",
    description: "Descripción de la tarea 2",
    creation_date: new Date(),
    completed: false,
  }
];

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

  logout(): void {
    // Simula el cierre de sesión
    alert('Cerrando sesión...');
    // Redirigir al inicio de sesión (puedes usar el Router aquí)
  }

  onLoadingChange(value: boolean) {
    this.loading = value;
  }

  onEditTask(task: Task): void {
    this.isEditing = true;
    this.taskToEdit = task;
  }
}
