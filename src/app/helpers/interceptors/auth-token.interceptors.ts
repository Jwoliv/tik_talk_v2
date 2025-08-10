import {HttpEvent, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../../service/auth/auth-service';
import {catchError, Observable, switchMap, tap, throwError} from 'rxjs';
import {TokenResponse} from '../../interfaces/model/token-response';

const withAuthHeader = (token: TokenResponse) => ({
  setHeaders: { Authorization: `Bearer ${token.access_token}` }
});

const handleForbiddenError = (
  authService: AuthService,
  err: unknown,
  req: HttpRequest<unknown>,
  next: (req: HttpRequest<unknown>) => Observable<HttpEvent<unknown>>
) => {
  console.log('refreshing token')
  return authService.refreshAccessToken().pipe(
    tap(token => authService.saveTokenInCookie(token)),
    switchMap(newToken => {
      if (!newToken?.access_token) {
        console.log('new token = ' + newToken);
        return throwError(() => err);
      }
      return next(req.clone(withAuthHeader(newToken)));
    }),
    catchError(() => throwError(() => err))
  );
};

export const authTokenInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  if (req.url.includes('auth/refresh')) {
    return next(req);
  }
  const authService = inject(AuthService);
  const token = authService.tokenResponse;

  if (!token?.access_token) {
    return next(req);
  }

  return next(req.clone(withAuthHeader(token))).pipe(
    catchError(err => {
      console.log(err)
      return err.status === 403
        ? handleForbiddenError(authService, err, req, next)
        : throwError(() => err)
    })
  );
};
