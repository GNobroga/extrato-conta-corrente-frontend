import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AppConfig from '../configs/AppConfig';
import { Observable, Observer, map } from 'rxjs';
import { Lancamento } from '../models/lancamento';
import * as moment from 'moment';

export interface IBuscarPorDataRangeReturn {
  lancamentos: Lancamento[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public buscarPorDataRange(
    abaixo?: Date | null,
    acima?: Date | null
  ): Observable<IBuscarPorDataRangeReturn> {
    const abaixoFormatado = abaixo ? moment(abaixo).format('YYYY-MM-DD') : '';
    const acimaFormatado = acima ? moment(acima).format('YYYY-MM-DD') : '';
    return this.http
      .get<Lancamento[]>(
        AppConfig.API_URL_DATA_RANGE(abaixoFormatado, acimaFormatado)
      )
      .pipe(
        map((lancamentos) => ({
          lancamentos,
          total: lancamentos.reduce((sum, y) => sum + y.valor, 0),
        }))
      );
  }

  public salvar(lancamento: Partial<Lancamento>) {
    return this.http.post(AppConfig.API_URL, lancamento, this.httpOptions);
  }

  public buscar(id: number) {
    return this.http.get(AppConfig.API_URL_FIND(id));
  }

  public atualizar(id: number, lancamento: Partial<Lancamento>) {
    return this.http.put(
      AppConfig.API_URL_FIND(id),
      lancamento,
      this.httpOptions
    );
  }

  public deletar(id: number) {
    return this.http.delete(AppConfig.API_URL_FIND(id))
  }
}
