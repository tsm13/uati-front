import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ModuloListaExtrato } from 'src/app/services/interfaces/extrato';

@Component({
  selector: 'mat-tabela',
  templateUrl: './mat-tabela.component.html',
  styleUrls: ['./mat-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MatTabelaComponent implements OnInit {
  dataSource: any;
  tituloTabela: string;
  exibirSaldo = false;
  @Input() titulo: string;
  @Input() dados: ModuloListaExtrato;
  @Input() colunas: string[];

  ngOnInit() {
    this.tituloTabela = this.dados.titulo;
    this.dataSource = new MatTableDataSource(this.dados.dados);
  }
}
