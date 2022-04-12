import { Component, ContentChild, TemplateRef } from '@angular/core';
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
  semSaldo: string[] = ['data', 'lancamentos', 'valor', 'vazia', 'detalhes'];

  entradasSaidas = this.dadosService.getEntradasSaidas();
  entradasFuturas = this.dadosService.getEntradasFuturas();
  saidasFuturas = this.dadosService.getSaidasFuturas();

  constructor(private dadosService: DadosService) {
    this.dadosService.getDadosAPI().subscribe((dados) => {
      console.log(dados);
    });
  }
}
