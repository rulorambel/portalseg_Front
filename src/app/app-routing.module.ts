import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrincipalComponent} from'../app/principal/principal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {DetalleQuejaComponent}from './detalle-queja/detalle-queja.component'



const routes: Routes = [
  //{ path: ':cuc/:user/:tserv', component: PrincipalComponent },
  {path: ':reqid/:appredir/:app/:user/:tserv/:cuc/:apep/:apem/:nombre/:correo/:celular/:telefono/:tipo/:subtipo', component: PrincipalComponent },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
