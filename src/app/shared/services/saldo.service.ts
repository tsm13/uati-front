import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Saldo, SaldoTotal } from '../interfaces/saldo';

@Injectable({
  providedIn: 'root',
})
export class SaldoService {
  URL = 'http://localhost:8080/saldo';

  constructor(private http: HttpClient) {}
  mostraSaldo(saldo: Saldo): Observable<SaldoTotal> {
    return this.http.post<SaldoTotal>(this.URL, saldo);
  }
}
