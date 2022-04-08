import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
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

  if() {}
}

/*
import { Component } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


 @Component({
  selector: 'app-entradas-saidas',
  templateUrl: './entradas-saidas.component.html',
  styleUrls: ['./entradas-saidas.component.scss'],
})
export class EntradasSaidasComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
} */
