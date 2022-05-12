import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { ModuloListaExtrato } from 'src/app/services/interfaces/extrato';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss'],
})
export class ExtratoComponent implements OnInit {
  constructor(private service: BackendService) {}

  lancamentosFuturosAberto = false;
  colunas: string[] = ['data', 'lancamentos', 'valor', 'saldo', 'detalhes'];
  entradasFuturas: Observable<ModuloListaExtrato>;
  saidasFuturas: Observable<ModuloListaExtrato>;
  entradasSaidas: Observable<ModuloListaExtrato>;

  ngOnInit(): void {
    this.entradasSaidas = this.service
      .mostraExtrato({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      })
      .pipe(
        map((lancamento: ModuloListaExtrato) => {
          let entradaSaida = lancamento.dados;
          let modulo = {
            titulo: 'entradas/saídas',
            dados: entradaSaida,
          };
          return modulo;
        })
      );

    this.entradasFuturas = this.service
      .mostraExtrato({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      })
      .pipe(
        map((lancamento: ModuloListaExtrato) => {
          let entradaFutura = lancamento.dados.filter(
            (lancamento) =>
              lancamento.entradaOuSaida == 'ENTRADA' &&
              lancamento.futuroOuPassado == 'FUTURO'
          );
          let modulo = {
            titulo: 'entradas futuras',
            dados: entradaFutura,
          };
          return modulo;
        })
      );

    this.saidasFuturas = this.service
      .mostraExtrato({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      })
      .pipe(
        map((lancamento: ModuloListaExtrato) => {
          let saidaFutura = lancamento.dados.filter(
            (lancamento) =>
              lancamento.entradaOuSaida == 'SAIDA' &&
              lancamento.futuroOuPassado == 'FUTURO'
          );
          let modulo = {
            titulo: 'saídas futuras',
            dados: saidaFutura,
          };
          return modulo;
        })
      );
  }
}
