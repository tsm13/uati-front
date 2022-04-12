import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DadosService {
  constructor(private http: HttpClient) {}

  getDadosAPI() {
    let url = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get(url);
  }

  getEntradasSaidas() {
    return [
      {
        data: '15/08/2021',
        lancamentos: 'saldo anterior',
        valor: '',
        saldo: '39.533,94',
        detalhes: '',
        tipo: 'passado',
      },
      {
        data: '19/08/2021',
        lancamentos: 'Pai pgto automatico itau',
        valor: '- 2.679,00',
        saldo: '',
        detalhes: '',
        tipo: 'passado',
      },
      {
        data: '19/08/2021',
        lancamentos: 'Resgate RDB/ CDB',
        valor: '5.087,00',
        saldo: '',
        detalhes: '',
        tipo: 'passado',
      },
      {
        data: '23/08/2021',
        lancamentos: 'Pagamento cheque 002398',
        valor: '- 9.368,00',
        saldo: '',
        detalhes: '',
        tipo: 'passado',
      },
      {
        data: '24/08/2021',
        lancamentos: 'saldo do dia',
        valor: '',
        saldo: '32.573,94',
        detalhes: '',
        tipo: 'passado',
      },
    ];
  }

  getEntradasFuturas() {
    return [
      {
        data: '14/09/2021',
        lancamentos: 'Telefonica 3274-828',
        valor: '1.877,00',
        saldo: '',
        detalhes: '',
        tipo: 'futuro',
      },
      {
        data: '15/09/2021',
        lancamentos: 'Vesper S. A.',
        valor: '2.234,00',
        saldo: '',
        detalhes: '',
        tipo: 'futuro',
      },
      {
        data: '16/09/2021',
        lancamentos: 'Eletropaulo 78059',
        valor: '2.679,00',
        saldo: '',
        detalhes: '',
        tipo: 'futuro',
      },
    ];
  }

  getSaidasFuturas() {
    return [
      {
        data: '10/09/2021',
        lancamentos: 'Porto Seguro Seguros',
        valor: '- 1.877,00',
        saldo: '',
        detalhes: '',
        tipo: 'futuro',
      },
      {
        data: '10/09/2021',
        lancamentos: 'Compra Carref. PO',
        valor: '- 2.234,00',
        saldo: '',
        detalhes: '',
        tipo: 'futuro',
      },
      {
        data: '10/09/2021',
        lancamentos: 'SABESP',
        valor: '- 2.679,00',
        saldo: '',
        detalhes: '',
        tipo: 'futuro',
      },
    ];
  }
}
