import {
  Component,
  ContentChild,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface TabelaExtrato {
  data: string;
  lancamentos: string;
  valor: string;
  saldo: string;
  detalhes: string;
  vazia: string;
}

@Component({
  selector: 'mat-tabela',
  templateUrl: './mat-tabela.component.html',
  styleUrls: ['./mat-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MatTabelaComponent implements OnInit {
  dataSource: any;
  @Input() titulo: string;
  @Input() dados: {}[] = [];
  @Input() colunas: string[];

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.dados);
  }
}
