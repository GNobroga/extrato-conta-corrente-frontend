import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, map } from 'rxjs';
import { Lancamento } from '../models/lancamento';
import AppConfig from '../configs/AppConfig';

export interface IBuscarPorDataRangeReturn {
  lancamentos: Lancamento[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {

  private _headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  constructor(private http: HttpClient) {}

  public buscarPorId(id: number): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${AppConfig.API_PADRAO_ENDPOINT}/${id}`);
  }

  public cancelarPorId(id: number): Observable<any> {
    return this.http.delete<Lancamento>(`${AppConfig.API_PADRAO_ENDPOINT}/${id}`);
  }

  public cadastrarNovo(gravar: Omit<Lancamento, 'id'>): Observable<Lancamento> {
    return this.http.post<Lancamento>(AppConfig.API_PADRAO_ENDPOINT, gravar);
  }

  public modificar(id: number, gravar: Lancamento): Observable<Lancamento> {
    return this.http.put<Lancamento>(`${AppConfig.API_PADRAO_ENDPOINT}/${id}`, gravar);
  }

  public encontrarPorLimiteDatas(inferior?: Date, superior?: Date): Observable<Lancamento[]> {

    let queryStringInferior = '';
    let queryStringSuperior = '';
    let separador = inferior && superior ? '&' : '';

    if (inferior) {
      queryStringInferior = `abaixo=${this.extrairData(inferior)}`;
    }

    if (superior) {
      queryStringSuperior = `acima=${this.extrairData(superior)}`;
    }


    return this.http.get<Lancamento[]>(`${AppConfig.API_ENCONTRAR_POR_DATA_ENDPOINT}?${queryStringInferior}${separador}${queryStringSuperior}`);
  }

  private extrairData(data: Date) {
    const ano = data.getFullYear();
    const mes = `${data.getMonth() + 1}`;
    const dia = `${data.getDate()}`;
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }


}
