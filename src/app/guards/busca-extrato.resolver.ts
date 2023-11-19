import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LancamentoService } from '../services/lancamento.service';
import { Lancamento } from '../models/lancamento';

export const buscaExtratoResolver: ResolveFn<Lancamento[]> = (route, state) => {
  const service = inject(LancamentoService);
  return service.encontrarPorLimiteDatas();
};
