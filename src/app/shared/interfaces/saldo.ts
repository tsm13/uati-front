export interface Saldo {
  agencia: string;
  conta: string;
  dac: string;
}

export interface SaldoTotal {
  saldoTotal: number;
}

export interface SaldosDiarios {
  saldoAnterior: number;
  saldoDoDia: number;
}
