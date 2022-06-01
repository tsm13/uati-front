import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { parse, differenceInDays } from 'date-fns';
import { FiltroService } from 'src/app/shared/services/filtro.service';
import { ConteudoFiltro } from 'src/app/interfaces/conteudo-filtro';
import { ListaExtrato, ModuloListaExtrato } from 'src/app/interfaces/extrato';
import { BackendService } from 'src/app/shared/services/backend.service';

@Component({
  selector: 'mat-tabela',
  templateUrl: './mat-tabela.component.html',
  styleUrls: ['./mat-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MatTabelaComponent implements OnInit {
  @Input() dataSource: any;
  @Input() dados: ModuloListaExtrato;
  @Input() filtrar: boolean;
  @Input() exibirSaldo: boolean;

  tituloTabela: string;
  colunas: string[] = ['data', 'lancamentos', 'valor', 'saldo', 'detalhes'];

  dadosOriginal: ModuloListaExtrato;
  public dadosFiltro: ConteudoFiltro;
  private saldoConta: number = 0;
  saldoAnterior = this.saldoConta;
  private periodoDias: any;
  private linhaSaldoAnterior: any;

  constructor(
    private filtroService: FiltroService,
    private backendService: BackendService
  ) {
    this.filtroService.data.subscribe((observer: any) => {
      if (observer && this.dados && this.filtrar) {
        this.dados = this.dadosOriginal;
        this.dadosFiltro = observer;
        this.periodoDias = this.dadosFiltro.periodo;

        // let saldoAnterior = this.saldoAnterior;
        let filtrados = this.dados.dados.filter((lancamento: ListaExtrato) => {
          let dias = this.periodoEmDias(this.periodoDias);
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
        });

        let dias = this.periodoEmDias(this.periodoDias);

        const lancamentosAnteriores = this.dados.dados.filter((value) => {
          return (
            differenceInDays(
              new Date(),
              parse(value.dataLancamento, 'dd/MM/yyyy', new Date())
            ) > dias
          );
        });

        this.linhaSaldoAnterior = {
          dataLancamento:
            lancamentosAnteriores[lancamentosAnteriores.length - 1]
              .dataLancamento,
          detalhes: '',
          entradaOuSaida: '',
          futuroOuPassado: '',
          lancamento: 'SALDO ANTERIOR',
          saldoTotal:
            lancamentosAnteriores[lancamentosAnteriores.length - 1].saldoTotal,
          valor: 0,
          isSaldo: true,
        };

        if (this.dadosFiltro.visualizar === 'todas') {
          filtrados.splice(0, 0, this.linhaSaldoAnterior);
          if (dias > 1) {
            filtrados.push({
              dataLancamento: filtrados[filtrados.length - 1].dataLancamento,
              detalhes: '',
              entradaOuSaida: '',
              futuroOuPassado: '',
              lancamento: 'SALDO DO DIA',
              saldoTotal: filtrados[filtrados.length - 1].saldoTotal,
              valor: 0,
              isSaldo: true,
            });
          }
        }

        if (this.dadosFiltro.ordenacao === 'maisRecente') {
          filtrados.sort(
            (x: ListaExtrato, y: ListaExtrato) =>
              +parse(y.dataLancamento, 'dd/MM/yyyy', new Date()) -
              +parse(x.dataLancamento, 'dd/MM/yyyy', new Date())
          );
        }

        this.dataSource = new MatTableDataSource(filtrados);
        this.dataSource.filter = this.dadosFiltro.busca?.trim();
      }
    });
  }

  ngOnInit() {
    let dados = this.dados;
    this.dadosOriginal = dados;
    this.tituloTabela = dados.titulo;
    this.dataSource = new MatTableDataSource(dados.dados);

    if (this.exibirSaldo) {
      this.backendService
        .mostraSaldo({
          agencia: '0123',
          conta: '01234',
          dac: '0',
        })
        .subscribe((observer: any) => {
          this.saldoConta = observer.saldoTotal;
          dados.dados = this.calculandoSaldo(dados.dados);

          let count = 0;
          while (dados.dados[count]) {
            this.setDados(dados.dados[count], count);
            count++;
          }

          const todosLanc = dados.dados.filter((value) => {
            return (
              differenceInDays(
                new Date(),
                parse(value.dataLancamento, 'dd/MM/yyyy', new Date())
              ) >= 90
            );
          });

          let lancFiltrados = dados.dados.filter(
            (value) =>
              differenceInDays(
                new Date(),
                parse(value.dataLancamento, 'dd/MM/yyyy', new Date())
              ) < 90
          );

          // let saldoDoDia = todosLanc[todosLanc.length - 1];
          lancFiltrados.splice(0, 0, {
            dataLancamento: todosLanc[todosLanc.length - 1].dataLancamento,
            detalhes: '',
            entradaOuSaida: '',
            futuroOuPassado: '',
            lancamento: 'SALDO ANTERIOR',
            saldoTotal: todosLanc[todosLanc.length - 1].saldoTotal,
            valor: 0,
            isSaldo: true,
          });

          lancFiltrados.push({
            dataLancamento:
              lancFiltrados[lancFiltrados.length - 1].dataLancamento,
            detalhes: '',
            entradaOuSaida: '',
            futuroOuPassado: '',
            lancamento: 'SALDO DO DIA',
            saldoTotal: this.saldoConta,
            valor: 0,
            isSaldo: true,
          });
          this.dataSource = new MatTableDataSource(lancFiltrados);
        });
    }
  }

  private periodoEmDias(periodo: string) {
    let dias = 0;

    switch (periodo) {
      case 'ontem':
        return (dias = 1);
      case '7 dias':
        return (dias = 7);
      case '30 dias':
        return (dias = 30);
      case '90 dias':
        return (dias = 90);
      default:
        return dias;
    }
  }

  private setDados(value: ListaExtrato, index: number) {
    if (
      this.dados.dados[index + 1] &&
      value.dataLancamento !== this.dados.dados[index + 1].dataLancamento &&
      !this.dados.dados[index].isSaldo
    ) {
      this.dados.dados.splice(index + 1, 0, {
        dataLancamento: value.dataLancamento,
        detalhes: '',
        entradaOuSaida: '',
        futuroOuPassado: '',
        lancamento: 'SALDO DO DIA',
        saldoTotal: value.saldoTotal,
        valor: 0,
        isSaldo: true,
      });
    }
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

  private calculandoSaldo(dados: any): any {
    let saldo: number = this.saldoConta;
    dados = dados.reverse().map((item: any, index: number) => {
      if (index === 0) {
        item.saldoTotal = saldo;
      } else {
        item.saldoTotal = dados[index - 1].saldoTotal - dados[index - 1].valor;
      }
      return item;
    });
    return dados.reverse();
  }
}
