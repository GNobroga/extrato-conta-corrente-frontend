import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lancamento } from 'src/app/models/lancamento';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent {

  public editarForm = {
    data: new Date(),
    valor: 0,
  };

  public id!: number;

  constructor(private _servico: LancamentoService, private _router: Router, private _rotaAtiva: ActivatedRoute) {
    this.id = parseInt(_rotaAtiva.snapshot.paramMap.get('id') as string);
    _servico.buscarPorId(this.id).subscribe({
      next: value => {
        this.editarForm = value;
      }
    })
  }

  public salvarAlteracoes(): void {
    if (this.editarForm.data) {
      this._servico
        .modificar(this.id, this.editarForm as Lancamento)
        .subscribe({
          next: _ => this._router.navigate(['/']),
          error: _ => window.alert('Nao foi possivel editar.'),
        })
    } else {
      window.alert('Preencha a data.');
    }
  }

}
