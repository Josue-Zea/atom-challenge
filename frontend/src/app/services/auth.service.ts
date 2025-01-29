import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../types/auth.response.type';
import { AuthCredentials } from '../types/auth.type';
import { ErrorHandlerService } from './error-handler.service';
import { ApiResponse } from '../types/response-api.type';
import { SmallIconAllert } from '../alerts/alerts';

export const AUTH_KEY_NAME: string = 'authAccessToken';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    API_URL: string = environment.backend + '/' + environment.services.users;

    constructor(
        private _httpClient: HttpClient,
        //   private _router: Router,
        private _httpErrorHandler: ErrorHandlerService
    ) { }

    setAuthAccessToken(authResponse: AuthResponse): void {
        localStorage.setItem(AUTH_KEY_NAME, authResponse.token);
    }

    removeAuthAccessToken(): void {
        localStorage.removeItem(AUTH_KEY_NAME);
    }

    getToken(): string | null {
        return localStorage.getItem(AUTH_KEY_NAME);
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

    login(authCredentials: AuthCredentials): Observable<AuthResponse | ApiResponse> {
        return this._httpClient.get<AuthResponse>(this.API_URL + `/${authCredentials.email}`)
            .pipe(
                tap(this.setAuthAccessToken),
                catchError(
                    error => this._httpErrorHandler.handleErrorHttpRequest(error)
                )
            );
    }

    register(authCredentials: AuthCredentials): Observable<AuthResponse | ApiResponse> {
        return this._httpClient.post<AuthResponse>(this.API_URL, authCredentials)
            .pipe(
                tap(this.setAuthAccessToken),
                catchError(
                    error => this._httpErrorHandler.handleErrorHttpRequest(error)
                )
            );
    }

    logout(): void {
        this.removeAuthAccessToken();
        SmallIconAllert('success', 'Sesión cerrada exitosamente');
        //   this._router.navigate(['/login']);
    }
}