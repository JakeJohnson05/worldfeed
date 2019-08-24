import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import { AuthService } from '@auth/auth.service';
import { UserService } from '@user/user.service'; 
import { UserRegistrationInfo } from './user-registration-info';

@Injectable({
  providedIn: 'root'
})
/**
 * The login service is in charge of making http requests to the server
 * that have to do with logging in existing users
 */
export class LoginRegisterService {

  /** api endpoint for logging a User in */
  private loginEndpoint = 'api/user/login/';
  /** api endpoint to Register a new User */
  private registerEndpoint = 'api/user/register/';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

	/**
   * sends an http post request to the api login endpoint with the username
   * and password, awaiting validation.
	 */
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      this.loginEndpoint,
      { username: username, password: password },
      { observe: 'response' } //observe the full response, instead of just the body
    ).pipe(
      tap((response: any) => {
        if (response.status === 200) {
          // update the authenticated behavior subject to true
          this.authService.setAuthStatus(true);
          this.userService.requestUser();
          this.router.navigateByUrl(this.authService.redirectUrl || '/dashboard');
          this.authService.redirectUrl = null;
        } else {
          // update the authenticated behavior subject to false
          this.authService.setAuthStatus(false);
          this.userService.requestUser();
        }
      }), catchError(err => {
        if (err.status === 401) return of(401);
        if (err.status === 500) return of(500);
        return throwError(err);
      })
    );
  }

  /**
	 * sends an http post request to the api register endpoint with the
   * userRegistration object, awaiting validation
	 */
  register(userinfo: UserRegistrationInfo): Observable<UserRegistrationInfo> {
    return this.http.post<UserRegistrationInfo>(
      this.registerEndpoint, userinfo,
      { observe: 'response' } //observe the full response, not just the body (so we can access status)
    ).pipe(
      tap((response: any) => {
        if (response.status === 201) {
          this.authService.redirectUrl = null;
          this.authService.setAuthStatus(true);
          // this.emailService.sendValidationEmail();
          this.router.navigateByUrl('/dashboard');
        } else {
          this.authService.setAuthStatus(false);
        }
      }), catchError(err => {
        if (err.status === 422) return of(err);
        if (err.status === 500) return of(500);
        return throwError(err);
      })
    );
  }
}
