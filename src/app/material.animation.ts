
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule, MatInputModule} from '@angular/material'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule,MatListOption} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
//import {MatSnackBar} from '@angular/material/snack-bar';

import { NgModule } from '@angular/core';


@NgModule ({
  imports:  [MatExpansionModule ,MatButtonModule, MatExpansionModule, MatInputModule,MatIconModule,MatTableModule,MatPaginatorModule,
              FormsModule , ReactiveFormsModule,MatSelectModule,MatDialogModule,MatListModule,MatCheckboxModule],
              
  exports:  [MatExpansionModule ,MatButtonModule , MatExpansionModule, MatInputModule,MatIconModule,MatTableModule,MatPaginatorModule,
              FormsModule , ReactiveFormsModule,MatSelectModule,MatDialogModule,MatListModule,MatCheckboxModule],
})

export class CoustomMaterial {
}
