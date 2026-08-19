import { HttpInterceptorFn } from '@angular/common/http';
import { Loading } from '../Services/loading';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(Loading);

  if (req.headers.has('X-Skip-Spinner')) {
    return next(req.clone({ headers: req.headers.delete('X-Skip-Spinner') }));
  }

  loading.RequestCount++;
  if (loading.RequestCount === 1) {
    loading.loading();
  }
  
  return next(req).pipe(
    finalize(() => {
      loading.RequestCount--;
      if (loading.RequestCount <= 0) {
        loading.RequestCount = 0;
        
        loading.hideLoader();
      }
    })
  );
};
