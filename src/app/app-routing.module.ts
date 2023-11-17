import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExtratoComponent } from './components/extrato/extrato.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { EditarComponent } from './pages/editar/editar.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home',  pathMatch: 'full',
  },
  {
    path: '', component: HomeComponent, children: [
      {
        path: '', component: ExtratoComponent,
      },
      {
        path: 'cadastrar', component: CadastroComponent,
      },
      {
        path: 'editar/:id', component: EditarComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
