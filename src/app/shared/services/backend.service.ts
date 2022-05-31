import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parse } from 'date-fns';
import { map, Observable } from 'rxjs';
import {
  ContaCorrente,
  VerContaCorrente,
} from '../../interfaces/conta-corrente';
import { Extrato, ModuloListaExtrato } from '../../interfaces/extrato';
import { Saldo, SaldoTotal } from '../../interfaces/saldo';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  saldoURL = 'http://localhost:8080/saldo';
  ccURL = 'http://localhost:8080/cc';
  extratoURL = 'http://localhost:8080/extrato';

  constructor(private http: HttpClient) {}
  mostraSaldo(saldo: Saldo): Observable<SaldoTotal> {
    return this.http.post<SaldoTotal>(this.saldoURL, saldo);
  }

  mostraContaCorrente(
    contaCorrente: ContaCorrente
  ): Observable<VerContaCorrente> {
    return this.http.post<VerContaCorrente>(this.ccURL, contaCorrente);
  }

  mostraExtrato(extrato: Extrato): Observable<ModuloListaExtrato> {
    return this.http.post<ModuloListaExtrato>(this.extratoURL, extrato).pipe(
      map((lancamento: ModuloListaExtrato) => {
        let entradaSaida = lancamento.dados.sort(
          (x, y) =>
            +parse(x.dataLancamento, 'dd/MM/yyyy', new Date()) -
            +parse(y.dataLancamento, 'dd/MM/yyyy', new Date())
        );
        let modulo = {
          titulo: 'entradas/saídas',
          dados: entradaSaida,
          visualizacao: 'todas',
        };
        return modulo;
      })
    );
  }
}
