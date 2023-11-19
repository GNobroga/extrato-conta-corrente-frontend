import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExtratoComponent } from './components/extrato/extrato.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { EditarComponent } from './pages/editar/editar.component';
import { buscaExtratoResolver } from './guards/busca-extrato.resolver';
import { parametroValidoGuard } from './guards/parametro-valido.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ExtratoComponent,
        resolve: { extrato: buscaExtratoResolver },
      },
      {
        path: 'cadastrar',
        component: CadastroComponent,
      },
      {
        path: 'editar/:id',
        component: EditarComponent,
        canActivate: [parametroValidoGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
