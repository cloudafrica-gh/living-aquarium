import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LivingAquariumService {
  private dataURL: string = environment.dafaServer;
  private laURL: string = environment.laServer;

  public headers: HttpHeaders;

  constructor( private readonly http: HttpClient) { }

  getAllDafabetTransactions(): Observable<any> {
    return this.http
      .get(`${this.dataURL}/transactions`)
      .pipe(
        tap(_ => this.log(`srv: load realtime transactions >>>>`) ),
        catchError(this.handleError('dafabetApi', []))
      );
  }
  getAllRegisterUser(): Observable<any> {
    return this.http
    .get(`${this.laURL}/admin/getallusers`)
    .pipe(
      tap(_ => this.log(`srv: get all registered users >>>>`) ),
      catchError(this.handleError('LivingAquarium', []))
    );
  }
  getAllUserPonds(): Observable<any> {
    return this.http
    .get(`${this.laURL}/admin/getallponds`)
    .pipe(
      tap(_ => this.log(`srv: load all user pond >>>>`) ),
      catchError(this.handleError('LivingAquarium', []))
    );
  }
  postUserPond(pondData: any): Observable<any> {
    return this.http.post<any>(`${this.laURL}/user/addpond`, pondData)
    .pipe(
      tap(_ => this.log(`add pond srv: post user pond >>>>`) ),
      catchError(this.handleError('LivingAquarium', []))
    );
  }
  getUserFarmPonds(): Observable<any> {
    return this.http.get(`${this.laURL}/admin/farm/getallponds`)
    .pipe(
      tap(_ => this.log(`srv: load user farm ponds >>>>`) ),
      catchError(this.handleError('LivingAquarium', []))
    );
  }

  postUserFishPondHealth(pondData: any): Observable<any> {
    console.log('srv: get user fish pond health: ', pondData);
    return this.http.post<any>(`${this.laURL}/admin/pond/fishhealth`, pondData)
      .pipe(
        tap(_ => this.log(`srv: user fish pond health : ${_}`)),
        catchError(this.handleError('LivingAquarium', []))
      );
  }

  postUserPondProductionData(pondData: any): Observable<any> {
    return this.http.post<any>(this.laURL + '/admin/pond/productiondata', pondData)
      .pipe(
        tap(_ => this.log(`srv: user fish pond production data : ${_}`)),
        catchError(this.handleError('LivingAquarium', []))
      );
  }
  calculateEconomicIndicator(ecoData: any): Observable<any> {
    return this.http.post<any>(this.laURL + '/admin/farm/economicindicators', ecoData)
    .pipe(
      tap(_ => this.log(`ecoData srv: user economic indicator : ${_}`)),
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

