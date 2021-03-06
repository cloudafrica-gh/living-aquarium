import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public devServerUrl: string = environment.laServer;
  public headers: HttpHeaders;

  isLoggedIn = false;
  redirectUrl: string;

  constructor(
    private http: HttpClient,
  ) {
  }

  checkLoggedIn() {
    console.log(`localStorage Token: ${localStorage.getItem('token')}`);
    return localStorage.getItem('token') != null;
  }
  login(userData: any): Observable<any> {
    this.log(`login data >>> ${JSON.stringify(userData)}`);
    return this.http.post<any>(this.devServerUrl + '/user/login', userData)
      .pipe(
        tap(_ => { this.isLoggedIn = true; }),
        catchError(this.handleError('login', []))
      );
  }
  register(userData: any): Observable<any> {
    console.log('register user data: ', userData);
    return this.http.post<any>(this.devServerUrl + '/user/signup', userData)
      .pipe(
        tap(_ => this.log('login')),
        catchError(this.handleError('Register', []))
      );
  }
  public logout() {
    localStorage.clear();
    // this.router.navigate (['/auth/login']);

  }

  public getUserProfile(): Observable<any> {
    return this.http.get(`${this.devServerUrl}/user/getprofile`)
      .pipe(
        tap(_ => this.log(`get user profile >>>>`) ),
        catchError(this.handleError('UserProfile', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}
