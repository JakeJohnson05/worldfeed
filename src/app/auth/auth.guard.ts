import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
/**
 * AuthGuard protects routes that require users to be authenticated.
 */
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /**
   * AuthGuard.canActivate is called every time a route protected by AuthGuard is activated
   *
   * canActivate will record the requested route as redirectUrl in the authService
   * then return the Observable<boolean> returned by authService.isAuthenticated()
   *
   * if the user is authenticated (having established a passport session on the server)
   * the returned observable will emit true, otherwise, it will emit false
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // set the redirect to url in the authService
    this.authService.redirectUrl = state.url;
    return this.authService.isAuth().pipe(tap(authStatus => !authStatus && this.router.navigateByUrl('/login')));
  }
}
