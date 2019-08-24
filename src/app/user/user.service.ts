import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /** Behavior Subject of the current user */
  private userBS: BehaviorSubject<any>

  constructor(
    private http: HttpClient
  ) {
    this.userBS = new BehaviorSubject<any>(undefined);
  }

  /** Get the current User logged in */
  get user(): Observable<any> {
    !this.userBS.value && this.requestUser();
    return this.userBS.asObservable();
  }

  /** Make the api request for the current User */
  public requestUser(): void {
    this.http.get<any>('/api/user/info')
      .pipe(catchError(_ => of(undefined)))
      .subscribe(user => this.userBS.next(user))
  }

  /** Used when logging out. Set the current user to 'Undefined' */
  public resetUser = (): void => this.userBS.next(undefined)

}
