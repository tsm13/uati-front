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
  colunas: string[] = ['data', 'lancamentos', 'valor', 'saldo', 'detalhes'];
  keyword: string = '';

  entradasSaidas = this.dadosService.getEntradasSaidas();
  entradasFuturas = this.dadosService.getEntradasFuturas();
  saidasFuturas = this.dadosService.getSaidasFuturas();

  filtrar(keyword: string) {
    this.keyword = keyword;
  }

  /* Teste com chamada de API */
  constructor(private dadosService: DadosService) {
    this.dadosService.getDadosAPI().subscribe((dados) => {
      console.log(dados);
    });
  }
}
