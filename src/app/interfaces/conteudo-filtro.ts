export interface ConteudoFiltro {
  visualizar: 'todas' | 'entradas' | 'saídas' | 'futuros';
  periodo: 'ontem' | '7 dias' | '30 dias' | '90 dias';
  ordenacao: 'maisAntigo' | 'maisRecente';
  busca: string | null;
}
