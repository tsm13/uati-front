import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContaCorrente, VerContaCorrente } from '../interfaces/conta-corrente';

@Injectable({
  providedIn: 'root',
})
export class ContaCorrenteService {
  URL = 'http://localhost:8080/cc';

  constructor(private http: HttpClient) {}

  mostraContaCorrente(
    contaCorrente: ContaCorrente
  ): Observable<VerContaCorrente> {
    return this.http.post<VerContaCorrente>(this.URL, contaCorrente);
  }
}
