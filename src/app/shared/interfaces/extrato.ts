export interface Extrato {
  agencia: string;
  conta: string;
  dac: string;
}

export interface ListaExtrato {
  dataLancamento: string;
  lancamento: string;
  valor: number;
  detalhes: string;
  saldoTotal: number;
  futuroOuPassado: string;
  entradaOuSaida: string;
  isSaldo: boolean;
}

export interface ModuloListaExtrato {
  titulo: string;
  dados: ListaExtrato[];
  visualizacao: string;
}
