import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../types/auth.response.type';
import { AuthCredentials } from '../types/auth.type';
import { ErrorHandlerService } from './error-handler.service';
import { ApiResponse } from '../types/response-api.type';
import { SmallIconAllert } from '../alerts/alerts';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const AUTH_KEY_NAME: string = 'authAccessToken';
export const EMAIL_KEY_NAME: string = 'userEmail';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    API_URL: string = environment.backend + '/' + environment.services.users;

    constructor(
        private _httpClient: HttpClient,
        private _router: Router,
        private _httpErrorHandler: ErrorHandlerService
    ) { }

    setAuthAccessToken(authResponse: AuthResponse): void {
        localStorage.setItem(AUTH_KEY_NAME, authResponse.token);
    }

    setEmail(email: string): void {
        localStorage.setItem(EMAIL_KEY_NAME, email);
    }

    removeAuthAccessToken(): void {
        localStorage.removeItem(AUTH_KEY_NAME);
    }

    removeEmail(email: string): void {
        localStorage.setItem(EMAIL_KEY_NAME, email);
    }

    getToken(): string | null {
        return localStorage.getItem(AUTH_KEY_NAME);
    }

    getEmail(): string | null {
        return localStorage.getItem(EMAIL_KEY_NAME);
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
                tap((authResponse) => {
                    const data: { email: string } = jwtDecode(authResponse.token);
                    this.setEmail(data.email);
                    this.setAuthAccessToken(authResponse);
                }),
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
        this._router.navigate(['/login']);
    }

    sesionExpired(): void {
        this.removeAuthAccessToken();
        SmallIconAllert('info', 'Tu sesión ha expirado');
        this._router.navigate(['/login']);
    }
}