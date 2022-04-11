import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface TabelaExtrato {
  data: string;
  lancamentos: string;
  valor: string;
  saldo: string;
  detalhes: string;
}

@Component({
  selector: 'app-entradas-saidas',
  templateUrl: './mat-tabela.component.html',
  styleUrls: ['./mat-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MatTabelaComponent implements OnInit {
  dataSource: any;
  @Input() titulo: string;
  @Input() colunas: string[];
  @Input() dados: {}[] = [];

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.dados);
  }
}
