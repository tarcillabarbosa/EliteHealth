// import { HttpInterceptorFn } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Constants } from '../commons/constants/constants.enum';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/auth')) return next(req);

  const router = inject(Router);

  const token = localStorage.getItem(Constants.TOKEN_KEY) || '';

  const newReq = req.clone({
    setHeaders: {
      Authorization: token,
    },
  });

  return next(newReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if ([401, 403].includes(err.status)) {
        console.log(err.error.message);
        router.navigate(['auth', 'login']);
      }
      return throwError(() => err);
    })
  );
};

