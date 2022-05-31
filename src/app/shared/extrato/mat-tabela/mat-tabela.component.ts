import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { parse, differenceInDays } from 'date-fns';
import { FiltroService } from 'src/app/services/filtro.service';
import { ConteudoFiltro } from 'src/app/interfaces/conteudo-filtro';
import { ListaExtrato, ModuloListaExtrato } from 'src/app/interfaces/extrato';
import { BackendService } from 'src/app/services/backend.service';

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
  hoje = Date.now().toString;

  tituloTabela: string;
  colunas: string[] = ['data', 'lancamentos', 'valor', 'saldo', 'detalhes'];

  dadosOriginal: ModuloListaExtrato;
  public dadosFiltro: ConteudoFiltro;
  private saldoConta: number = 0;

  constructor(
    private filtroService: FiltroService,
    private backendService: BackendService
  ) {
    this.filtroService.data.subscribe((observer: any) => {
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
          console.log(dados.dados);

          let count = 0;
          while (dados.dados[count]) {
            this.setDados(dados.dados[count], count);
            count++;
          }
          dados.dados.forEach((value, index) => {
            this.setDados(value, index);
            console.log(index);

            if (index === 0) {
              this.dados.dados.splice(0 + 0, 0, {
                dataLancamento: value.dataLancamento,
                detalhes: '',
                entradaOuSaida: '',
                futuroOuPassado: '',
                lancamento: 'SALDO ANTERIOR',
                saldoTotal: value.saldoTotal + value.valor * -1,
                valor: 0,
                isSaldo: true,
              });
            }

            while (!this.dados.dados[index + 2]) {
              this.dados.dados.push({
                dataLancamento: this.dados.dados[index + 1].dataLancamento,
                detalhes: '',
                entradaOuSaida: '',
                futuroOuPassado: '',
                lancamento: 'SALDO DO DIA',
                saldoTotal: this.saldoConta,
                valor: 0,
                isSaldo: true,
              });
            }
          });
          this.dataSource = new MatTableDataSource(dados.dados);
        });
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

  public diaDiferente() {
    const data = this.dados.dados;
    this.dados.dados.map((lancamento: ListaExtrato, index: number) => {
      if (this.dados.dados[index].dataLancamento != lancamento.dataLancamento) {
        /*         data.push(lancamento.dataLancamento);
        this.dataSource.data = data;
        this.dataSource.data.push(this.dados.dados[1]); */
        return true;
      }
      return false;
    });
  }

  /*   saldoAtual: Observable<SaldoTotal>;
  public calculaSaldo(dados: any) {
    this.saldoAtual = new Observable((subscribe) => {
      subscribe.next(dados);
    });
  } */
}
