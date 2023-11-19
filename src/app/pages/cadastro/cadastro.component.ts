import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Lancamento } from 'src/app/models/lancamento';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  public cadastroForm = {
    descricao: '',
    data: new Date(),
    valor: 0,
    avulso: true,
    status: 'Válido',
  } as Omit<Lancamento, 'id'>;

  constructor(private _servico: LancamentoService, private _router: Router) {}

  public realizarCadastro(): void {
    this._servico.cadastrarNovo(this.cadastroForm)
      .subscribe(value => {
        window.alert('Cadastro realizado com sucesso.');
        this._router.navigate(['/']);
      });
  }


}
