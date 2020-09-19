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
      setHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cookie: '562d49727516866f0595668413c7572a=s%3AUG9fTQZs7sp6pJodb94XtJy2PbCEG4jl.QDOa8vMi5XP57Ftjb%2F824Nmbw3wRW4uz1ht3LVa73Nw'
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

