import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';
import { Saldo, SaldoTotal } from './interfaces/saldo';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  saldoURL = 'http://localhost:8080/saldo';

  constructor(private http: HttpClient) {}

  mostraSaldo(saldo: Saldo): Observable<SaldoTotal> {
    return this.http
      .post<SaldoTotal>(this.saldoURL, JSON.stringify(saldo))
      .pipe();
  }
}
