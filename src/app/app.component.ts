import { Component, ContentChild, Output, TemplateRef } from '@angular/core';
import { BackendService } from './services/backend.service';
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

  /*   constructor(private dadosService: DadosService) {}

  entradasSaidas = this.dadosService.getEntradasSaidas();
  entradasFuturas = this.dadosService.getEntradasFuturas();
  saidasFuturas = this.dadosService.getSaidasFuturas(); */

  constructor(private service: BackendService) {}

  entradasSaidas = this.service.mostraExtrato({
    agencia: '0123',
    conta: '00587',
    dac: '1',
  });
}
