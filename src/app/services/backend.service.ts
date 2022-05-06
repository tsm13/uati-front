import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Saldo, SaldoTotal } from './interfaces/saldo';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  saldoURL = 'http://localhost:8080/saldo';

  constructor(private http: HttpClient) {}

  mostraSaldo(saldo: Saldo): Observable<SaldoTotal> {
    return this.http.post<SaldoTotal>(this.saldoURL, saldo);
  }
}
