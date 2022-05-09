import {
  Component,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BackendService } from '../services/backend.service';

import {
  Extrato,
  ListaExtrato,
  ModuloListaExtrato,
} from '../services/interfaces/extrato';

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
