import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Interconeccion } from '../bean/bean-interconeccion';


@Component({
  selector: 'app-dialog-confirma-interconeccion',
  templateUrl: './dialog-confirma-interconeccion.component.html',
  styleUrls: ['./dialog-confirma-interconeccion.component.css']
})
export class DialogConfirmaInterconeccionComponent implements OnInit {


dataInterconeccion : Interconeccion;


  constructor(  public dialogLoad: MatDialogRef<DialogConfirmaInterconeccionComponent>,@Inject(MAT_DIALOG_DATA)  data
            
              ) 
  {
   
  this.dataInterconeccion = data;

  }

 public cerrarDialog()
 {
   this.dialogLoad.close();
 }



  ngOnInit() 
  {
  }

 

}
