import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('sending request');
    console.log(req);
    return next.handle(req).pipe(
      tap({
        next: (event) => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log('response arrive');
            console.log(event.body);
          }
        },
      })
    );
  }
}
