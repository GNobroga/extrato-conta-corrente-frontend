import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  public form = new FormGroup({
    descricao: new FormControl(''),
    data: new FormControl<Date | null>(null),
    valor: new FormControl<number>(0),
  });

  constructor(private _lancamentoService: LancamentoService, private router: Router) {}


  public salvarLancamento() {
    const descricao = this.form.controls['descricao'].value?.trim();
    const data = this.form.controls['data'].value;
    const valor = this.form.controls['valor'].value;

    if (descricao != '' && /^[a-zA-Z0-9]+$/.test(descricao as string)) {
      this._lancamentoService.salvar({ descricao, data: data ?? undefined, valor: valor ?? 0, avulso: true})
        .subscribe({
          next: value => this.router.navigate(['/']),
        });
    }
    else {
      window.alert("Descricao invalida");
    }


  }

}
