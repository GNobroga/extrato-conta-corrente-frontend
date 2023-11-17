export interface Lancamento {
  id: number;
  descricao: string;
  data: Date;
  valor: number;
  avulso: boolean;
  stutus: "Válido" | "Cancelado";
}
