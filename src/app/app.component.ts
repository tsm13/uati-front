import { Component, ContentChild, Output, TemplateRef } from '@angular/core';
import { DadosService } from './services/dados.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'itau';
  lancamentosFuturosAberto = false;
  titleEntradasSaidas = 'entradas/saídas';
  titleEntradasFuturas = 'entradas futuras';
  titleSaidasFuturas = 'saídas futuras';
  colunas: string[] = ['data', 'lancamentos', 'valor', 'saldo', 'detalhes'];
  semSaldo: string[] = ['data', 'lancamentos', 'valor', 'saldo', 'detalhes'];

  entradasSaidas = this.dadosService.getEntradasSaidas();
  entradasFuturas = this.dadosService.getEntradasFuturas();
  saidasFuturas = this.dadosService.getSaidasFuturas();

  /* Teste com chamada de API */
  constructor(private dadosService: DadosService) {
  }
}
