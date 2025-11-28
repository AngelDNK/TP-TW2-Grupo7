import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../servicios/auth';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.esAdmin$.pipe(
    take(1),

    map(esAdmin => {
      if (esAdmin) {
        return true;
      } else {
        return router.createUrlTree(['/']);
      }
    })
  );
};