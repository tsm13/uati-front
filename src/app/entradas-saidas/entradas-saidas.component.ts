import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface TabelaExtrato {
  data: string;
  lancamentos: string;
  valor: string;
  saldo: string;
  detalhes: string;
}

const DADOS: TabelaExtrato[] = [
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

@Component({
  selector: 'app-entradas-saidas',
  templateUrl: './entradas-saidas.component.html',
  styleUrls: ['./entradas-saidas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EntradasSaidasComponent {
  constructor() {}

  colunas: string[] = ['data', 'lancamentos', 'valor', 'saldo', 'detalhes'];
  dataSource = new MatTableDataSource(DADOS);
}
