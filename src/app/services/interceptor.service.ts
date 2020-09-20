import {catchError, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable()

export class InterceptorService implements HttpInterceptor {
  public isUserAuthenticated: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const session = localStorage.getItem('session');
    req = req.clone(session ? {
      setHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('session'),
      }
    } : {
      withCredentials: true, // todo only used in development
      setHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return next.handle(req).pipe(
      tap((event: any) => {
        if (event instanceof HttpResponse) {
          const newSession = event.headers.get('authorization');
          if (newSession) {
            localStorage.setItem('session', newSession);
          }
        }
      }),
      catchError(error => {
        this.isUserAuthenticated.next(false);
        switch ((<HttpErrorResponse>error).status) {
          case 400:
            break;
          case 401:
            break;
        }
        return throwError(error);
      }),
    );
  }

}

