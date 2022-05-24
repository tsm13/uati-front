import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { parse, differenceInDays } from 'date-fns';
import { FiltroService } from 'src/app/services/filtro.service';
import { ConteudoFiltro } from 'src/app/interfaces/conteudo-filtro';
import { ListaExtrato, ModuloListaExtrato } from 'src/app/interfaces/extrato';
import { AppSaldoComponent } from 'src/app/app-saldo/app-saldo.component';
import { Observable } from 'rxjs';
import { SaldoTotal } from 'src/app/interfaces/saldo';

@Component({
  selector: 'mat-tabela',
  templateUrl: './mat-tabela.component.html',
  styleUrls: ['./mat-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MatTabelaComponent implements OnInit {
  @Input() dataSource: any;
  @Input() dados: ModuloListaExtrato;
  @Input() filtrar: boolean = false;

  colunas: string[] = ['data', 'lancamentos', 'valor', 'saldo', 'detalhes'];

  tituloTabela: string;

  @Input() exibirSaldo = false;
  dadosOriginal: ModuloListaExtrato;
  public dadosFiltro: ConteudoFiltro;

  constructor(private filtroService: FiltroService) {
    this.filtroService.data.subscribe((observer: any) => {
      /*       console.log(observer); */
      if (observer && this.dados && this.filtrar) {
        this.dados = this.dadosOriginal;
        this.dadosFiltro = observer;
        const filtrados = this.dados.dados.filter(
          (lancamento: ListaExtrato) => {
            let dias = 0;

            if (this.dadosFiltro.periodo === 'ontem') {
              dias = 1;
            } else if (this.dadosFiltro.periodo === '7 dias') {
              dias = 7;
            } else if (this.dadosFiltro.periodo === '30 dias') {
              dias = 30;
            } else if (this.dadosFiltro.periodo === '90 dias') {
              dias = 90;
            }

            parse(lancamento.dataLancamento, 'dd/MM/yyyy', new Date());

            differenceInDays(
              new Date(),
              parse(lancamento.dataLancamento, 'dd/MM/yyyy', new Date())
            );
            let difDias = differenceInDays(
              new Date(),
              parse(lancamento.dataLancamento, 'dd/MM/yyyy', new Date())
            );
            if (difDias === 0 && this.dadosFiltro.periodo === 'ontem') {
              return false;
            }

            return (
              differenceInDays(
                new Date(),
                parse(lancamento.dataLancamento, 'dd/MM/yyyy', new Date())
              ) <= dias && this.filtrarVizualizar(lancamento)
            );
          }
        );

        if (this.dadosFiltro.ordenacao === 'maisRecente') {
          filtrados.sort(
            (x: ListaExtrato, y: ListaExtrato) =>
              +parse(y.dataLancamento, 'dd/MM/yyyy', new Date()) -
              +parse(x.dataLancamento, 'dd/MM/yyyy', new Date())
          );
        }
        /*         console.log(filtrados);
        console.log(this.dadosFiltro); */
        this.dataSource = new MatTableDataSource(filtrados);
        this.dataSource.filter = this.dadosFiltro.busca?.trim();
      }
    });
  }

  ngOnInit() {
    const dados = this.dados;
    this.dadosOriginal = dados;
    this.tituloTabela = dados.titulo;
    this.dataSource = new MatTableDataSource(dados.dados);
    this.calculaSaldo(dados);
  }

  lancamentos: ListaExtrato;
  saldo: AppSaldoComponent;
  saldoAtual: Observable<SaldoTotal>;
  public calculaSaldo(dados: any) {
    this.saldoAtual = new Observable((subscribe) => {
      subscribe.next(dados);
    });
  }

  private filtrarVizualizar(lancamento: any): boolean {
    if (this.dadosFiltro.visualizar === 'todas') {
      return true;
    } else if (
      this.dadosFiltro.visualizar === 'entradas' &&
      lancamento.futuroOuPassado == 'PASSADO' &&
      lancamento.entradaOuSaida == 'ENTRADA'
    ) {
      return true;
    } else if (
      this.dadosFiltro.visualizar === 'saídas' &&
      lancamento.futuroOuPassado == 'PASSADO' &&
      lancamento.entradaOuSaida == 'SAIDA'
    ) {
      return true;
    }
    return false;
  }
}
