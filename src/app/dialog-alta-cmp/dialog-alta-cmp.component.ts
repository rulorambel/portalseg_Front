
import { Component, OnInit, Inject } from '@angular/core';
import { HttpParams} from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl,Validators,  FormGroup} from '@angular/forms';
import { ServicioHttpService} from'../servicio-http.service';
import { ServicioVarialesGlobalesService} from '../servicio-variales-globales.service';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { BeanBuscar } from '../bean/bean-comparticion';

@Component({
  selector: 'app-dialog-alta-cmp',
  templateUrl: './dialog-alta-cmp.component.html',
  styleUrls: ['./dialog-alta-cmp.component.css']
})

export class DialogAltaCmpComponent implements OnInit {
  FormularioAlta:FormGroup;
  disabled_btnCreaQueja:string="false";
  dataComparticion : BeanBuscar;

  constructor( public dialogLoad: MatDialogRef<DialogAltaCmpComponent>, @Inject(MAT_DIALOG_DATA)  data,
              private servhttp : ServicioHttpService ,
              public variables : ServicioVarialesGlobalesService , 
              private pipeFecha : DatePipe )
  {
    this.FormularioAlta= this.createFormGroup();
    this.FormularioAlta.get("IdNis").setValue(this.variables.getIdNis());
  
  }

  ngOnInit() {
  }

  private createFormGroup()
  {
    
    return new FormGroup({
   
        IdNis           : new FormControl('', [Validators.required]),
        GeoLatitud      : new FormControl('', [Validators.required]),
        GeoLongitud     : new FormControl('', [Validators.required]),
        IdElemento      : new FormControl('' ),
        TipoElemento    : new FormControl('' )

      });
  }



  public cerrarDialog()
  {
    this.variables.setIdNis  (null);
    this.variables.setGeoLatitud (null);
    this.variables.setTipoElemento (null);
    this.variables.setGeoLongitud  (null);
    this.variables.setIdElemento  (null);
    this.dialogLoad.close();
  }

  public validarServicio()
  {
    let NIS = this.FormularioAlta.get("IdNis").value;
    NIS = NIS.replace("NIS-", "");
    let parametros = new HttpParams()
      .set("movimiento","CONS_ELEMENTO")
      .set("NIS", NIS)
      .set("idElemento",this.FormularioAlta.get("IdElemento").value)
      .set("Ems_n","4871368")
      .set("tipodetrabajo",this.FormularioAlta.get("TipoElemento").value)
      .set("coords",this.FormularioAlta.get("GeoLatitud").value + "," + this.FormularioAlta.get("GeoLongitud").value);

    this.servhttp.consultaSICEG11(parametros)
    .subscribe(
                data=> {
                  if(data['error']  == "Registro encontrado") {

                    console.log("entra a datos de cmp");

                    this.variables.setIdNis  (this.IdNis.value);
                    this.variables.setGeoLatitud (this.GeoLatitud.value);
                    this.variables.setTipoElemento (this.TipoElemento.value);
                    this.variables.setGeoLongitud  (this.GeoLongitud.value);
                    this.variables.setIdElemento  (this.IdElemento.value);

                    this.dialogLoad.close(this.FormularioAlta);
                  } 
                  else
                  {
                    this.variables.setIdNis  (null);
                    this.variables.setGeoLatitud (null);
                    this.variables.setTipoElemento (null);
                    this.variables.setGeoLongitud  (null);
                    this.variables.setIdElemento  (null);

                    this.variables.muestraBarra("Error al Consultar en SICEG11","Error");           
                  }
                });
  }

  get IdNis  (){return this.FormularioAlta.get('IdNis');}
  get GeoLatitud (){return this.FormularioAlta.get('GeoLatitud');}
  get TipoElemento (){return this.FormularioAlta.get('TipoElemento');}
  get GeoLongitud (){return this.FormularioAlta.get('GeoLongitud');}
  get IdElemento (){return this.FormularioAlta.get('IdElemento');}


  public llenaSICEG11()
   {

    this.FormularioAlta.get("IdNIS").setValue(this.variables.getIdNis());
    this.FormularioAlta.get("GeoLatitud").setValue(this.variables.getGeoLatitud());
    this.FormularioAlta.get("GeoLongitud").setValue(this.variables.getGeoLongitud());
    this.FormularioAlta.get("TipoElemento").setValue(this.variables.getTipoElemento());
    this.FormularioAlta.get("IdElemento").setValue(this.variables.getIdElemento());
   
   }
}



