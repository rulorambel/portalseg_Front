import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoustomMaterial } from './material.animation';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { AltaQuejaComponent } from './alta-queja/alta-queja.component';
import { ConsultaQuejaComponent } from './consulta-queja/consulta-queja.component';
import { DatePipe } from '@angular/common';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogInformComponent} from './dialog-inform/dialog-inform.component';
import { PrincipalComponent } from './principal/principal.component';
import { InterlocutoresSitioComponent } from './interlocutores-sitio/interlocutores-sitio.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AltaQuejaCMPComponent } from './alta-queja-cmp/alta-queja-cmp.component';
import { DetalleQuejaComponent } from './detalle-queja/detalle-queja.component';
import { LoadComponent } from './carga-lenta/load.component';
import { DialogConfirmaInterconeccionComponent } from './dialog-confirma-interconeccion/dialog-confirma-interconeccion.component';
import { DialogAltaInterconeccionComponent } from './dialog-alta-interconeccion/dialog-alta-interconeccion.component';
import { AltaQuejaInxComponent } from './alta-queja-inx/alta-queja-inx.component';
import { DialogAltaCmpComponent } from './dialog-alta-cmp/dialog-alta-cmp.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaServiciosComponent,
    AltaQuejaComponent,
    DialogInformComponent,
    ConsultaQuejaComponent,
    PrincipalComponent,
    InterlocutoresSitioComponent,
    NotFoundComponent,
    AltaQuejaCMPComponent,
    DetalleQuejaComponent,
    LoadComponent,
    DialogConfirmaInterconeccionComponent,
    DialogAltaInterconeccionComponent,
    AltaQuejaInxComponent,
    DialogAltaCmpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoustomMaterial,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule
  ],
  entryComponents: [ DialogInformComponent,LoadComponent ,DialogConfirmaInterconeccionComponent,
    DialogAltaInterconeccionComponent,DialogAltaCmpComponent],

  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
