import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ModuloListaExtrato } from 'src/app/services/interfaces/extrato';

@Component({
  selector: 'mat-tabela',
  templateUrl: './mat-tabela.component.html',
  styleUrls: ['./mat-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MatTabelaComponent implements OnInit, OnChanges {
  tituloTabela: string;
  exibirSaldo = false;
  @Input() dataSource: any;
  @Input() dados: ModuloListaExtrato;
  @Input() colunas: string[];

  constructor(private cdr: ChangeDetectorRef) {}

  public dadosFiltro: any;
  @Input() set setDadosFiltro(dados: any) {
    console.log(dados);
    this.dadosFiltro = dados;
  }

  @Output() onContentChanged = new EventEmitter<void>();

  ngOnInit() {
    this.tituloTabela = this.dados.titulo;
    this.dataSource = new MatTableDataSource(this.dados.dados);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.cdr.detectChanges();
      console.log(changes);
    }
  }

  public funFiltro() {
    setTimeout(() => this.onContentChanged.emit(), 1);
  }
}
