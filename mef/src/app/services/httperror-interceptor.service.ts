import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  concatMap,
  finalize,
  Observable,
  of,
  retryWhen,
  throwError,
} from 'rxjs';
import { ErrorCode } from '../enums/enums';
import { AlertifyService } from './alertify.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(
    private alertify: AlertifyService,
    public loaderService: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();

    var modifiedReq = req.clone();

    if (localStorage.getItem('token')) {
      const userToken = localStorage.getItem('token');
      modifiedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + userToken),
      });
    }

    return next.handle(modifiedReq).pipe(
      retryWhen((error) => this.retryRequest(error, 10)),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.setError(error);
        this.alertify.error(errorMessage);
        return throwError(() => errorMessage);
      }),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }

  // Retry the request in case of error
  retryRequest(
    error: Observable<HttpErrorResponse>,
    retryCount: number
  ): Observable<HttpErrorResponse> {
    return error.pipe(
      concatMap((checkErr: HttpErrorResponse, count: number) => {
        if (count <= retryCount) {
          switch (checkErr.status) {
            case ErrorCode.serverDown:
              return of(checkErr);
            case ErrorCode.unauthorised:
              return of(checkErr);
          }
        }
        return throwError(() => checkErr);
      })
    );
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      // Client side error
      errorMessage = error.error.message;
      console.log(error);
    } else {
      // Server side error
      if (error.status === 401) {
        return error.statusText;
      }

      if (error.error.erreorMessage && error.status !== 0) {
        errorMessage = error.error.errorMessage;
      }
    }
    return errorMessage;
  }
}
