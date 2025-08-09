import {inject} from '@angular/core';
import {AuthService} from '../../service/auth/auth-service';
import {Router} from '@angular/router';

export const canActiveAuthByAccessToken = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if (!authService.isAuthenticated) {
    return router.createUrlTree(['/login'])
  }
  return true;
}
