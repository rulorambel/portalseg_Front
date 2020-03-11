import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent  {

  constructor(public dialogLoad: MatDialogRef<LoadComponent>,@Inject(MAT_DIALOG_DATA)  data) {
   }




  public cerrarDialog()
  {

    this.dialogLoad.close();
  }


}
