import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent {

  public id: number | null = null;
  public form = new FormGroup({
    data: new FormControl<Date | undefined>(undefined),
    valor: new FormControl<number>(0),
  });

  constructor(private _lancamentoService: LancamentoService, private _router: Router, private _activatedRouter: ActivatedRoute) {

    this.id = parseInt(_activatedRouter.snapshot.paramMap.get('id') as string);
    _lancamentoService.buscar(this.id).subscribe((value: any) => {
      this.form.controls['data'].setValue(value.data);
      this.form.controls['valor'].setValue(value.valor);
    });
  }

  public salvarLancamento(): void {
    const data = this.form.controls['data'].value as Date;
    const valor = this.form.controls['valor'].value as number;
    this._lancamentoService.atualizar(this.id as number, { data, valor}).subscribe(value => this._router.navigate(['/']));
  }
}
