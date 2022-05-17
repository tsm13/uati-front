import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  ListaExtrato,
  ModuloListaExtrato,
} from 'src/app/services/interfaces/extrato';

@Component({
  selector: 'mat-tabela',
  templateUrl: './mat-tabela.component.html',
  styleUrls: ['./mat-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MatTabelaComponent implements OnInit {
  tituloTabela: string;
  exibirSaldo = false;
  @Input() dataSource: any;
  @Input() dados: ModuloListaExtrato;
  @Input() colunas: string[];

  ngOnInit() {
    this.tituloTabela = this.dados.titulo;
    this.dataSource = new MatTableDataSource(this.dados.dados);
  }
}
