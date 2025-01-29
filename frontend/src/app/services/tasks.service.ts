import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { ApiResponse } from '../types/response-api.type';
import { Task } from '../types/task.type';
import { MessageResponse } from '../types/message.type';

export const TASKS_KEY_NAME: string = 'tasks';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    API_URL: string = environment.backend + '/' + environment.services.tasks;

    constructor(
        private _httpClient: HttpClient,
        //   private _router: Router,
        private _httpErrorHandler: ErrorHandlerService
    ) { }

    setTasks(tasks: Task[]): void {
        // const tasks = this.getTasks();
        localStorage.setItem(TASKS_KEY_NAME, "tasks");
    }

    removeAuthAccessToken(): void {
        localStorage.removeItem(TASKS_KEY_NAME);
    }

    getToken(): string | null {
        return localStorage.getItem(TASKS_KEY_NAME);
    }

    validateTokenTime(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const now = new Date().getTime() / 1000;
        return tokenData.exp > now;
    }

    getTasks(token: string): Observable<Task[] | ApiResponse> {
        return this._httpClient.get<Task[]>(this.API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).pipe(
            tap(this.setTasks),
            catchError(
                error => this._httpErrorHandler.handleErrorHttpRequest(error)
            )
        );
    }

    createTask(task: Task, token: string): Observable<Task | ApiResponse> {
        return this._httpClient.post<Task>(this.API_URL, task, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).pipe(
            tap((task) => this.setTasks([task])),
            catchError(
                error => this._httpErrorHandler.handleErrorHttpRequest(error)
            )
        );
    }

    editTask(taskId: string, task: Task, token: string): Observable<Task | ApiResponse> {
        return this._httpClient.put<Task>(`${this.API_URL}/${taskId}`, task, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).pipe(
            tap((task) => this.setTasks([task])),
            catchError(
                error => this._httpErrorHandler.handleErrorHttpRequest(error)
            )
        );
    }

    deleteTask(taskId: string, token: string): Observable<MessageResponse | ApiResponse> {
        return this._httpClient.delete<MessageResponse>(`${this.API_URL}/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).pipe(
            // tap((task) => this.setTasks([task])),
            catchError(
                error => this._httpErrorHandler.handleErrorHttpRequest(error)
            )
        );
    }
}