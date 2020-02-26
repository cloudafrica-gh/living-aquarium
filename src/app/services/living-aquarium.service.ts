import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LivingAquariumService {
  private dataURL: string = environment.laServer;
  private laURL: string = environment.laServer;

  public headers: HttpHeaders;

  constructor( private readonly http: HttpClient) { }

  getAllDafabetTransactions(): Observable<any> {
    return this.http
      .get(`${this.dataURL}/transactions`)
      .pipe(
        tap(_ => this.log(`load realtime transactions >>>>`) ),
        catchError(this.handleError('dafabetApi', []))
      );
  }

  getAllUserPonds(): Observable<any> {
    return this.http
    .get(`${this.laURL}/admin/getallponds`)
    .pipe(
      tap(_ => this.log(`load all user pond >>>>`) ),
      catchError(this.handleError('LivingAquarium', []))
    );
  }

  getUserFarmPonds(): Observable<any> {
    return this.http
    .get(`${this.laURL}/admin/farm/getallponds`)
    .pipe(
      tap(_ => this.log(`load user farm ponds >>>>`) ),
      catchError(this.handleError('LivingAquarium', []))
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

