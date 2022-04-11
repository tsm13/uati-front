import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'itau';
  lancamentosFuturosAberto = false;
  titleEntradasSaidas = 'entradas/saídas';
  titleEntradasFuturas = 'entradas futuras';
  titleSaidasFuturas = 'saídas futuras';
  colunas: string[] = ['data', 'lancamentos', 'valor', 'saldo', 'detalhes'];

  entradasSaidas = [
    {
      data: '15/08/2021',
      lancamentos: 'Saldo anterior',
      valor: '',
      saldo: '39.533,94',
      detalhes: '',
    },
    {
      data: '19/08/2021',
      lancamentos: 'Pai pgto automatico itau',
      valor: '- 2.679,00',
      saldo: '',
      detalhes: '',
    },
    {
      data: '19/08/2021',
      lancamentos: 'Resgate RDB/ CDB',
      valor: '5.087,00',
      saldo: '',
      detalhes: '',
    },
    {
      data: '23/08/2021',
      lancamentos: 'Pagamento cheque 002398',
      valor: '- 9.368,00',
      saldo: '',
      detalhes: '',
    },
    {
      data: '24/08/2021',
      lancamentos: 'Saldo do dia',
      valor: '',
      saldo: '32.573,94',
      detalhes: '',
    },
  ];

  entradasFuturas = [
    {
      data: '14/09/2021',
      lancamentos: 'Telefonica 3274-828',
      valor: '1.877,00',
      saldo: '',
      detalhes: '',
    },
    {
      data: '15/09/2021',
      lancamentos: 'Vesper S. A.',
      valor: '2.234,00',
      saldo: '',
      detalhes: '',
    },
    {
      data: '16/09/2021',
      lancamentos: 'Eletropaulo 78059',
      valor: '2.679,00',
      saldo: '',
      detalhes: '',
    },
  ];

  saidasFuturas = [
    {
      data: '10/09/2021',
      lancamentos: 'Porto Seguro Seguros',
      valor: '- 1.877,00',
      saldo: '',
      detalhes: '',
    },
    {
      data: '10/09/2021',
      lancamentos: 'Compra Carref. PO',
      valor: '- 2.234,00',
      saldo: '',
      detalhes: '',
    },
    {
      data: '10/09/2021',
      lancamentos: 'SABESP',
      valor: '- 2.679,00',
      saldo: '',
      detalhes: '',
    },
  ];
}
