import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../commons/constants/services/loading.service';
import { finalize } from 'rxjs';

let totalRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.setLoading(true);

  totalRequests++;

  return next(req).pipe(
    finalize(() => {
      setTimeout(() => {
        totalRequests--;
        if (!totalRequests) {
          loadingService.setLoading(false);
        }
      }, 500);
    })
  );
};
