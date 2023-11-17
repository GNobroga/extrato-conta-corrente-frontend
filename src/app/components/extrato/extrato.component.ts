import { Component, ViewChild, AfterViewInit, DoCheck } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  private _subscriptionDataRange!: Subscription;
  public total: number = 0;

  public abaixo = new FormControl<Date | null>(null);
  public acima = new FormControl<Date | null>(null);


  constructor(private _lancamentoService: LancamentoService) {}

  public ngAfterViewInit(): void {
      this.enviarData(null, null);
      this.paginator.pageSize = 5;
      this.dataSource.paginator = this.paginator;
  }


  public buscarPorConteudo(): void {
    if (this._subscriptionDataRange) {
      this._subscriptionDataRange.unsubscribe();
    }

    const abaixoData = this.abaixo.value;
    const acimaData = this.acima.value;

    if (abaixoData || acimaData) {
      this.enviarData(abaixoData, acimaData);
    }
  }

  private enviarData(data1: Date | null, data2: Date | null): void {
    this._subscriptionDataRange = this._lancamentoService
          .buscarPorDataRange(data1, data2).subscribe({
          next: response => {
            this.dataSource = new MatTableDataSource(response.lancamentos)
            this.total = response.total;
            this.dataSource.paginator = this.paginator;
          }
      })
  }

  public limparCampoDatas(): void {
    this.abaixo.setValue(null);
    this.acima.setValue(null);
    this.enviarData(null, null);
  }

  public marcarComoCancelado(id: number): void {
    this._lancamentoService.deletar(id).subscribe(value => {
     this.enviarData(null, null);
    });
  }

}
