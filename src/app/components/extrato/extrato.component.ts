import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lancamento } from 'src/app/models/lancamento';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedNameColumns: string[] = ['id', 'descricao', 'data', 'valor', 'avulso', 'status', 'actions', ];

  public dataSource = new MatTableDataSource<Lancamento>([]);

  public total: number = 0;

  public abaixo: Date | undefined;
  public acima: Date | undefined;

  constructor(private _servico: LancamentoService, private rotaAtual: ActivatedRoute) {
    const extrato = this.rotaAtual.snapshot.data['extrato'] as Lancamento[];
    extrato.sort(this.compararStatus);
    this.dataSource = new MatTableDataSource(extrato);
    this.total = extrato.reduce((x, y) => x + y.valor, 0);
  }

  public ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  public buscarPorConteudo(): void {
    this._servico.encontrarPorLimiteDatas(this.abaixo, this.acima).subscribe(this.carregarExtrato());
  }

  public limparCampoDeDatas(): void {
    this.abaixo = undefined;
    this.acima = undefined;
    this._servico.encontrarPorLimiteDatas(this.abaixo, this.acima).subscribe(this.carregarExtrato());
  }

  public marcarComoCancelado(id: number): void {
    this._servico.cancelarPorId(id).subscribe({
      next: _ => this.buscarPorConteudo(),
      error: erro => {
        window.alert(erro?.error?.message);
      },
    })
  }

  private carregarExtrato(): any {
    return {
      next: (extrato: Lancamento[])=> {
        extrato.sort(this.compararStatus);
        this.dataSource = new MatTableDataSource(extrato);
        this.dataSource.paginator = this.paginator;
        this.total = extrato.reduce((x, y) => x + y.valor, 0);
      },
      error: (erro: any) => {
        window.alert(erro?.error?.message);
      },
    };
  }

  private compararStatus(a: Lancamento, b: Lancamento) {
    return a.status === 'Válido' && b.status === 'Cancelado' ? -1 : a.status !== 'Válido' && b.status === 'Válido' ? 1 : 0;
  }

}
