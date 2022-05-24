import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { ModuloListaExtrato } from 'src/app/interfaces/extrato';

import { FiltroService } from 'src/app/services/filtro.service';
import { ConteudoFiltro } from 'src/app/interfaces/conteudo-filtro';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss'],
})
export class ExtratoComponent {
  constructor(
    private service: BackendService,
    private filtroService: FiltroService
  ) {
    this.filtroService.data.subscribe((observer: any) => {
      /* console.log(observer); */
    });
  }

  lancamentosFuturosAberto = false;
  dados: ModuloListaExtrato;

  /*   colunas: string[] = ['data', 'lancamentos', 'valor', 'saldo', 'detalhes']; */

  entradasSaidas: Observable<ModuloListaExtrato>;
  entradasFuturas: Observable<ModuloListaExtrato>;
  saidasFuturas: Observable<ModuloListaExtrato>;

  conteudoFiltro: ConteudoFiltro = {
    visualizar: 'todas',
    periodo: '7 dias',
    ordenacao: 'maisAntigo',
    busca: null,
  };

  ngOnInit(): void {
    this.entradasSaidas = this.service
      .mostraExtrato({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      })
      .pipe(
        map((lancamento: ModuloListaExtrato) => {
          let entradaSaida = lancamento.dados.filter(
            (lancamento) => lancamento.futuroOuPassado == 'PASSADO'
          );
          let modulo = {
            titulo: 'entradas/saídas',
            dados: entradaSaida,
            visualizacao: 'todas',
          };
          return modulo;
        })
      );

    this.entradasFuturas = this.service
      .mostraExtrato({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      })
      .pipe(
        map((lancamento: ModuloListaExtrato) => {
          let entradaFutura = lancamento.dados.filter(
            (lancamento) =>
              lancamento.entradaOuSaida == 'ENTRADA' &&
              lancamento.futuroOuPassado == 'FUTURO'
          );
          let modulo = {
            titulo: 'entradas futuras',
            dados: entradaFutura,
            visualizacao: 'entradas',
          };
          return modulo;
        })
      );

    this.saidasFuturas = this.service
      .mostraExtrato({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      })
      .pipe(
        map((lancamento: ModuloListaExtrato) => {
          let saidaFutura = lancamento.dados.filter(
            (lancamento) =>
              lancamento.entradaOuSaida == 'SAIDA' &&
              lancamento.futuroOuPassado == 'FUTURO'
          );
          let modulo = {
            titulo: 'saídas futuras',
            dados: saidaFutura,
            visualizacao: 'saidas',
          };
          return modulo;
        })
      );
  }

  /* Busca e Visualização */
  busca: any;
  periodo: any;
  visualizar: any;

  mostrarEntradasFuturas: boolean = true;
  mostrarSaidasFuturas: boolean = true;
  mostrarEntradasSaidas: boolean = true;

  public filtroBusca(visualizar?: any) {
    this.conteudoFiltro.visualizar = visualizar
      ? visualizar
      : this.conteudoFiltro.visualizar;
    this.visualizar = this.conteudoFiltro.visualizar;
    this.busca = this.conteudoFiltro.busca;
    this.periodo = this.conteudoFiltro.periodo;
    this.filtroService.filtrar(this.conteudoFiltro);
  }

  public filtroVisualizar(visualizar?: any) {
    switch (visualizar) {
      case 'entradas':
        this.mostrarEntradasFuturas = true;
        this.mostrarSaidasFuturas = false;
        this.mostrarEntradasSaidas = true;
        break;
      case 'saidas':
        this.mostrarEntradasFuturas = false;
        this.mostrarSaidasFuturas = true;
        this.mostrarEntradasSaidas = true;
        break;
      case 'futuros':
        this.mostrarEntradasFuturas = true;
        this.mostrarSaidasFuturas = true;
        this.mostrarEntradasSaidas = false;
        break;
      default:
        this.mostrarEntradasFuturas = true;
        this.mostrarSaidasFuturas = true;
        this.mostrarEntradasSaidas = true;
    }
    this.filtroBusca(visualizar);
  }
}
