import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-inform',
  templateUrl: './dialog-inform.component.html',
  styleUrls: ['./dialog-inform.component.css']
})

export class DialogInformComponent  
 {
  FechaConsulta:string;
  CodifoRespuesta:string;
  Descripcion:string;
 
  constructor( public dialogRef: MatDialogRef<DialogInformComponent>,@Inject(MAT_DIALOG_DATA)  data) {

               this.FechaConsulta= data.fechaDeRespuesta;
               this.CodifoRespuesta =data.codigoDeRespuesta
               this.Descripcion = data.descripcionDelError 

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}