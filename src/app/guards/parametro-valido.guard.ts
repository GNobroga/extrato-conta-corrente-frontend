import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const parametroValidoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const id = route.paramMap.get('id');

  const redirecionar = id != null && /\d+/.test(id);

  if (!redirecionar) {
    router.navigateByUrl('/');
  }

  return redirecionar;
};
