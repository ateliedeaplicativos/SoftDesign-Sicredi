import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {}

  private parseErrors(error: any) {
    return throwError(error.message);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(path, { params })
      .pipe(catchError(this.parseErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(path, body)
      .pipe(catchError(this.parseErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(path, body)
      .pipe(catchError(this.parseErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(path)
      .pipe(catchError(this.parseErrors));
  }
}
