import { Component, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
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
  saidasFuturas: Observable<ModuloListaExtrato>;
  entradasFuturas: ModuloListaExtrato;

  entradasSaidas = this.service.mostraExtrato({
    agencia: '0123',
    conta: '00587',
    dac: '1',
  });

  ngOnInit(): void {
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

    /*  const dados = (lancamento: ModuloListaExtrato) => {
      let saidaFutura = lancamento.dados.filter(
        (lancamento) =>
          lancamento.entradaOuSaida == 'SAIDA' &&
          lancamento.futuroOuPassado == 'FUTURO'
      );
    };

    this.service
      .mostraExtrato({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      })
      .pipe(filter(dados)); */

    this.service
      .mostraExtrato({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      })
      .subscribe((lancamento) => {
        let saidaFutura = lancamento.dados.filter(
          (lancamento) =>
            lancamento.entradaOuSaida == 'SAIDA' &&
            lancamento.futuroOuPassado == 'PASSADO'
        );
        this.entradasFuturas = {
          titulo: 'saídas futuras',
          dados: saidaFutura,
        };
      });
  }
}
