import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	/**
	 * the url for the isAuthenticated api endpoint.
	 * (isAuthenticated responds with status 200 if the user has been authenticated,
	 * and 401 if they have not)
   */
	private isAuthEndpoint: string = 'api/auth/isauth';
	/** this is the url to redirect the user to after they log in */
	public redirectUrl: string;
	/** Emits boolean if the user is logged in or not */
	private authStatus: BehaviorSubject<boolean>;

	constructor(
		private http: HttpClient
	) {
		//set auth status to a false by default
		this.authStatus = new BehaviorSubject<boolean>(false);
	}

	/**
	 * Check if there is a Current user logged in and authorized
	 *
	 * Returns an Observable that emits true if logged in
	 * 		or false if not logged in
	 */
	public isAuth(): Observable<boolean> {
		this.http.get<any>(this.isAuthEndpoint).pipe(
			map((res: any) => res.auth),
			catchError((err: any, caught: Observable<boolean>) => of(false))
		).subscribe((auth: boolean) => {
			this.authStatus.next(auth);
		});

		return this.authStatus.asObservable();
	}

	/**
	 * Manually set the authentication status.
	 *
	 * Only used in login as sometimes the auth status will not update till
	 * a few seconds after login confirmation not allowing rerouting.
	 */
	public setAuthStatus(isAuth: boolean): void { this.authStatus.next(isAuth) }

	/** Complete all observers on the authstatus */
	public cleanObservers(): void {
		this.authStatus.observers.forEach(observer => observer.complete());
	}

}
