import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { ModuloListaExtrato } from 'src/app/services/interfaces/extrato';
import { MatTabelaComponent } from './mat-tabela/mat-tabela.component';

import { parseISO, isBefore, isAfter, subDays, isSameDay } from 'date-fns';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss'],
})
export class ExtratoComponent implements OnInit {
  constructor(
    private service: BackendService,
    private cdr: ChangeDetectorRef
  ) {}

  lancamentosFuturosAberto = false;
  dados: ModuloListaExtrato;

  colunas: string[] = ['data', 'lancamentos', 'valor', 'saldo', 'detalhes'];
  entradasSaidas: Observable<ModuloListaExtrato>;
  entradasFuturas: Observable<ModuloListaExtrato>;
  saidasFuturas: Observable<ModuloListaExtrato>;
  apenasEntradas: Observable<ModuloListaExtrato>;

  hoje: Date = new Date();
  filtro: any;
  resultadoDe = 'todas as transferências';
  periodo = '7 dias';

  conteudoFiltro: any = {
    vizualizar: 'todas',
    periodo: '7dias',
    ordenacao: 'maisAntigo',
    busca: null,
  };

  mostrarEntradasFuturas: boolean = true;
  mostrarSaidasFuturas: boolean = true;
  mostrarEntradasSaidas: boolean = true;

  @ViewChild('entradasSaidas') tabela: MatTabelaComponent;
  @ViewChild('input') input: ElementRef;

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
          };
          return modulo;
        })
      );
  }

  /* Filtros de período */
  selectedPeriodo = '7dias';
  selectedOrdenacao = 'maisAntigo';

  public filtroOntem() {
    this.periodo = 'do último dia';
    this.entradasSaidas = this.service
      .mostraExtrato({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      })
      .pipe(
        map((lancamento: ModuloListaExtrato) => {
          let entradaSaida = lancamento.dados.filter((lancamento) =>
            isSameDay(
              parseISO(lancamento.dataLancamento),
              subDays(this.hoje, 1)
            )
          );
          let modulo = {
            titulo: 'entradas/saídas',
            dados: entradaSaida,
          };
          return modulo;
        })
      );
    /*     this.entradasSaidas.subscribe(() => {
      let event = new Event('keyup');
      this.input.nativeElement.dispatchEvent(event);
    }); */
  }

  public filtro7Dias() {
    this.periodo = '7 dias';
    this.entradasSaidas = this.service
      .mostraExtrato({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      })
      .pipe(
        map((lancamento: ModuloListaExtrato) => {
          let entradaSaida = lancamento.dados.filter(
            (lancamento) =>
              isBefore(parseISO(lancamento.dataLancamento), this.hoje) &&
              isAfter(
                parseISO(lancamento.dataLancamento),
                subDays(this.hoje, 8)
              )
          );
          let modulo = {
            titulo: 'entradas/saídas',
            dados: entradaSaida,
          };
          return modulo;
        })
      );
  }

  public filtro30Dias() {
    this.periodo = '30 dias';
    this.entradasSaidas = this.service
      .mostraExtrato({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      })
      .pipe(
        map((lancamento: ModuloListaExtrato) => {
          let entradaSaida = lancamento.dados.filter(
            (lancamento) =>
              isBefore(parseISO(lancamento.dataLancamento), this.hoje) &&
              isAfter(
                parseISO(lancamento.dataLancamento),
                subDays(this.hoje, 31)
              )
          );
          let modulo = {
            titulo: 'entradas/saídas',
            dados: entradaSaida,
          };
          return modulo;
        })
      );
  }

  public filtro90Dias() {
    this.periodo = '90 dias';
    this.entradasSaidas = this.service
      .mostraExtrato({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      })
      .pipe(
        map((lancamento: ModuloListaExtrato) => {
          let entradaSaida = lancamento.dados.filter(
            (lancamento) =>
              isBefore(parseISO(lancamento.dataLancamento), this.hoje) &&
              isAfter(
                parseISO(lancamento.dataLancamento),
                subDays(this.hoje, 91)
              )
          );
          let modulo = {
            titulo: 'entradas/saídas',
            dados: entradaSaida,
          };
          return modulo;
        })
      );
  }

  /*   public funFiltro() {
    let event = new Event('keyup');
    this.input.nativeElement.dispatchEvent(event);
    console.log('teste');
  } */

  /* Filtro Busca - botões */
  public filtroBusca(vizualizar?: string) {
    this.conteudoFiltro.vizualizar = vizualizar
      ? vizualizar
      : this.conteudoFiltro.vizualizar;
    this.cdr.detectChanges();
    console.log(this.conteudoFiltro);
    /*     this.tabela.dataSource.filter = this.filtro.trim().toLowerCase(); */
  }

  /* Filtros Botões */
  public filtroTodas() {
    this.resultadoDe = 'todas as transferências';
    this.mostrarEntradasFuturas = true;
    this.mostrarSaidasFuturas = true;
    this.mostrarEntradasSaidas = true;

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
          };
          return modulo;
        })
      );
  }

  public filtroEntradas() {
    this.resultadoDe = 'entradas';
    this.mostrarEntradasFuturas = true;
    this.mostrarSaidasFuturas = false;
    this.mostrarEntradasSaidas = true;
    this.entradasSaidas = this.service
      .mostraExtrato({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      })
      .pipe(
        map((lancamento: ModuloListaExtrato) => {
          let entradaSaida = lancamento.dados.filter(
            (lancamento) =>
              lancamento.entradaOuSaida == 'ENTRADA' &&
              lancamento.futuroOuPassado == 'PASSADO'
          );
          let modulo = {
            titulo: 'entradas/saídas',
            dados: entradaSaida,
          };
          return modulo;
        })
      );
  }

  public filtroSaidas() {
    this.resultadoDe = 'saídas';
    this.mostrarEntradasFuturas = false;
    this.mostrarSaidasFuturas = true;
    this.mostrarEntradasSaidas = true;
    this.entradasSaidas = this.service
      .mostraExtrato({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      })
      .pipe(
        map((lancamento: ModuloListaExtrato) => {
          let entradaSaida = lancamento.dados.filter(
            (lancamento) =>
              lancamento.entradaOuSaida == 'SAIDA' &&
              lancamento.futuroOuPassado == 'PASSADO'
          );
          let modulo = {
            titulo: 'entradas/saídas',
            dados: entradaSaida,
          };
          return modulo;
        })
      );
  }

  public filtroFuturos() {
    this.mostrarEntradasFuturas = true;
    this.mostrarSaidasFuturas = true;
    this.mostrarEntradasSaidas = false;
  }
}
