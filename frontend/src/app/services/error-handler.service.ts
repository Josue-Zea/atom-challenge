import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CONSTANTS } from 'src/app/app.module';
import { ApiResponse } from '../types/response-api.type';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    @Inject(CONSTANTS) private _constants: any
  ) { }

  handleErrorHttpRequest(error: HttpErrorResponse): Observable<ApiResponse> {
    let errorMessage = '';

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = this._constants.http.error0;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      if (error.status === 400) {
        errorMessage = this._constants.http.error400;
      }
      
      if (error.status === 404) {
        errorMessage = this._constants.http.error404;
      }

      if (error.status === 500) {
        errorMessage = this._constants.http.error500;
      }

      if (error.status === 401) {
        errorMessage = this._constants.http.error401;
      }

      if (error.status === 400) {
        errorMessage = error.error.errors ?
          error.error.errors.join('\n') :
          this._constants.http.error400;
      }
    }

    const response: ApiResponse = {
      status: error.status,
      message: error.message
    }

    return new Observable<ApiResponse>(observer => {
      observer.next(response);
      observer.complete();
    });
  }
}
