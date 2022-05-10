import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss'],
})
export class ExtratoComponent implements OnInit {
  ngOnInit(): void {}

  lancamentosFuturosAberto = false;
  colunas: string[] = ['data', 'lancamentos', 'valor', 'saldo', 'detalhes'];

  constructor(private service: BackendService) {}

  entradasSaidas = this.service.mostraExtrato({
    agencia: '0123',
    conta: '00587',
    dac: '1',
  });

  saidasFuturas = this.service
    .mostraExtrato({
      agencia: '0123',
      conta: '00587',
      dac: '1',
    })
    .subscribe((lancamento) => {
      let saidaFutura = lancamento.dados.filter(
        (lancamento) =>
          lancamento.entradaOuSaida == 'SAIDA' &&
          lancamento.futuroOuPassado == 'FUTURO'
      );
      let modulo = {
        titulo: 'saídas futuras',
        dados: saidaFutura,
      };
    });

  saidasPassadas = this.service
    .mostraExtrato({
      agencia: '0123',
      conta: '00587',
      dac: '1',
    })
    .subscribe((lancamento) => {
      let saidaFutura = lancamento.dados.filter(
        (lancamento) =>
          lancamento.entradaOuSaida == 'SAIDA' &&
          lancamento.futuroOuPassado == 'PASSADA'
      );
      let modulo = {
        titulo: 'saídas futuras',
        dados: saidaFutura,
      };
    });
}
