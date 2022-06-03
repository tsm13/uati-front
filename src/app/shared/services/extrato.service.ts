import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parse } from 'date-fns';
import { map, Observable } from 'rxjs';
import { Extrato, ModuloListaExtrato } from '../interfaces/extrato';

@Injectable({
  providedIn: 'root',
})
export class ExtratoService {
  constructor(private http: HttpClient) {}

  URL = 'http://localhost:8080/extrato';

  mostraExtrato(extrato: Extrato): Observable<ModuloListaExtrato> {
    return this.http.post<ModuloListaExtrato>(this.URL, extrato).pipe(
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
