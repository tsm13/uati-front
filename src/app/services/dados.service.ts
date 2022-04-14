import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface TabelaExtrato {
  data: string;
  lancamentos: string;
  valor: string;
  saldo: number;
  detalhes: string;
}

export interface ModuloTabela {
  titulo: string;
  dados: TabelaExtrato[];
}

@Injectable({
  providedIn: 'root',
})
export class DadosService {
  constructor(private http: HttpClient) {}

  getSaldos() {}

  getEntradasSaidas(): ModuloTabela {
    return {
      titulo: 'entradas/saídas',
      dados: [
        {
          data: '15/08/2021',
          lancamentos: 'saldo anterior',
          valor: '',
          saldo: 39533,
          detalhes: '',
        },
        {
          data: '19/08/2021',
          lancamentos: 'Pai pgto automatico itau',
          valor: '-2.679',
          saldo: 0,
          detalhes: '',
        },
        {
          data: '19/08/2021',
          lancamentos: 'Resgate RDB/ CDB',
          valor: '5.087',
          saldo: 0,
          detalhes: '',
        },
        {
          data: '23/08/2021',
          lancamentos: 'Pagamento cheque 002398',
          valor: '-9.368',
          saldo: 0,
          detalhes: '',
        },
        {
          data: '24/08/2021',
          lancamentos: 'saldo do dia',
          valor: '',
          saldo: 32573.94,
          detalhes: '',
        },
      ],
    };
  }

  getEntradasFuturas(): ModuloTabela {
    return {
      titulo: 'entradas futuras',
      dados: [
        {
          data: '14/09/2021',
          lancamentos: 'Telefonica 3274-828',
          valor: '1877',
          saldo: 0,
          detalhes: '',
        },
        {
          data: '15/09/2021',
          lancamentos: 'Vesper S. A.',
          valor: '2234',
          saldo: 0,
          detalhes: '',
        },
        {
          data: '16/09/2021',
          lancamentos: 'Eletropaulo 78059',
          valor: '2679',
          saldo: 0,
          detalhes: '',
        },
      ],
    };
  }

  getSaidasFuturas(): ModuloTabela {
    return {
      titulo: 'saídas futuras',
      dados: [
        {
          data: '10/09/2021',
          lancamentos: 'Porto Seguro Seguros',
          valor: '-1.877',
          saldo: 0,
          detalhes: '',
        },
        {
          data: '10/09/2021',
          lancamentos: 'Compra Carref. PO',
          valor: '-2.234',
          saldo: 0,
          detalhes: '',
        },
        {
          data: '10/09/2021',
          lancamentos: 'SABESP',
          valor: '-2.679',
          saldo: 0,
          detalhes: '',
        },
      ],
    };
  }

  /* Teste com chamada de API */
  getDadosAPI() {
    let url = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get(url);
  }
}
