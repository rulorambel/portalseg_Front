import { Component, OnInit,Inject } from '@angular/core';
import { HttpParams} from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl,Validators,  FormGroup} from '@angular/forms';
import { ServicioHttpService} from'../servicio-http.service';
import { ServicioVarialesGlobalesService} from '../servicio-variales-globales.service';
import { DatePipe } from '@angular/common';
import { Interconeccion } from '../bean/bean-interconeccion';


@Component({
  selector: 'app-dialog-alta-interconeccion',
  templateUrl: './dialog-alta-interconeccion.component.html',
  styleUrls: ['./dialog-alta-interconeccion.component.css']
})
export class DialogAltaInterconeccionComponent implements OnInit {
  FormularioAlta:FormGroup;
  disabled_btnCreaQueja:string="false";
  dataInterconeccion : Interconeccion;
  

  constructor( public dialogLoad: MatDialogRef<DialogAltaInterconeccionComponent>,@Inject(MAT_DIALOG_DATA)  data,
              private servhttp : ServicioHttpService ,
              public variables : ServicioVarialesGlobalesService , 
              private pipeFecha : DatePipe)
  {
    this.FormularioAlta= this.createFormGroup();
    this.dataInterconeccion = data;

    this.Tipo.setValue (data.tipo);

  }

  ngOnInit() {
  }

  private createFormGroup()
  {
    
    return new FormGroup({
     
        Origen          : new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(20),Validators.pattern('[0-9]+')]),
        Destino         : new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(20),Validators.pattern('[0-9]+')]),
        IpOrigen        : new FormControl('', [Validators.required,Validators.pattern(/^([0-9]{4}|[0-9]{5}|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4})\b/gm)]),
        IpDestino       : new FormControl('', [Validators.required,Validators.pattern(/^([0-9]{4}|[0-9]{5}|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4})\b/gm)]),
        IDO             : new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern('[0-9]{3}')]),
        IDD             : new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern('[0-9]{3}')]),
        Digitos         : new FormControl('', [Validators.required,Validators.minLength(10),Validators.pattern('[0-9]{10}')]),
        PortID          : new FormControl('', [Validators.minLength(21),Validators.maxLength(23),Validators.pattern('[0-9]+')]),
        Tipo            : new FormControl('',),
        CentralOrigen   : new FormControl('',),
        CentralDestino  : new FormControl('',),
        CiudadOrigen    : new FormControl('',),
        OperadorOrigen  : new FormControl('',),
        OperadorDestino : new FormControl('',),
        CiudadDestino   : new FormControl('',)
      });
  }

  public cerrarDialog()
  {
    this.variables.setBndAlta(false);
    this.dialogLoad.close();
  }
  public enviaAlta()
  {
   if (this.FormularioAlta.status =="INVALID")
       {
         this.variables.muestraBarra("Para crear una Queja es necesario contar con la información correcta","Error");
         this.disabled_btnCreaQueja="false";
         return;
        }
     else{


      this.variables.setOrigen (this.Origen.value);
      this.variables.setDestino (this.Destino.value);
      this.variables.setIpOrigen (this.IpOrigen.value);
      this.variables.setIpDestino (this.IpDestino.value);
      this.variables.setIDO (this.IDO.value);
      this.variables.setIDD (this.IDD.value);
      this.variables.setDigitos (this.Digitos.value);
      this.variables.setPortID (this.PortID.value);
      this.variables.setCIC ('');
      this.variables.setCentralOrigen (this.CentralOrigen.value);
      this.variables.setCentralDestino (this.CentralDestino.value);
      this.variables.setOperadorOrigen (this.OperadorOrigen.value);
      this.variables.setOperadorDestino (this.OperadorDestino.value);
      this.variables.setCiudadOrigen (this.CiudadOrigen.value);
      this.variables.setCiudadDestino (this.CiudadDestino.value);
      this.variables.setBndAlta(true);

      this.dialogLoad.close(this.FormularioAlta);
   
     }   

  }


  get NIS () {return this.FormularioAlta.get('NIS');}
  get Origen      (){return this.FormularioAlta.get('Origen');}
  get Destino     (){return this.FormularioAlta.get('Destino');}
  get IpOrigen     (){return this.FormularioAlta.get('IpOrigen');}
  get IpDestino    (){return this.FormularioAlta.get('IpDestino');}
  get IDO          (){return this.FormularioAlta.get('IDO');}
  get IDD          (){return this.FormularioAlta.get('IDD');}
  get Digitos      (){return this.FormularioAlta.get('Digitos');}
  get PortID       (){return this.FormularioAlta.get('PortID');}
  get CIC          (){return this.FormularioAlta.get('CIC');}
  get CentralOrigen (){return this.FormularioAlta.get('CentralOrigen');}
  get CentralDestino (){return this.FormularioAlta.get('CentralDestino');}
  get FolioCliente (){return this.FormularioAlta.get('FolioCliente');}
  get CiudadOrigen (){return this.FormularioAlta.get('CiudadOrigen');}
  get CiudadDestino (){return this.FormularioAlta.get('CiudadDestino');}
  get OperadorOrigen (){return this.FormularioAlta.get('OperadorOrigen');}
  get OperadorDestino (){return this.FormularioAlta.get('OperadorDestino');}
  get Tipo (){return this.FormularioAlta.get('Tipo');}


 /**************************************************************************************  
*  Muestra valor en el campo Ciudad Origen referente al valor del campo ingresado por CS en el campo Origen*
*   @Author:	    Anahi Flores
*   @Date:		    19/12/2019
*   @update:      19/12/2019  
*   @Version:     1.0
*   @Funcion     buscaOrigen
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
buscaOrigen()
{
  let strNumero:string;
  strNumero = this.Origen.value;

  let intLada:number=  +strNumero.substring(0,2);

  if (intLada == 55 || intLada == 33 || intLada == 56 ||intLada == 81)
    {
      intLada =  +strNumero.substring(0,2);
    }
else
    intLada =  +strNumero.substring(0,3);

    let parametros = new HttpParams()
    .set("querry","lada=\"" + intLada + "\"");

  console.log("Origen Ingresado" + strNumero.substring(0,3));

  this.servhttp.consultaCiudad(parametros)
  .subscribe(dat=>
{ 
  console.log ("Regresando de la consulta ciudad");
  console.log (dat);
  if (dat['codigo']=="0")
  this.CiudadOrigen.setValue(dat['data'][0].ciudad);
}
        );  
}
/**************************************************************************************  
*  Muestra valor en el campo Central Origen referente al valor del campo ingresado por CS en el campo IP Origen/OPC*
*   @Author:	   Anahi Flores
*   @Date:		    19/12/2019
*   @update:      19/12/2019  
*   @Version:     1.0
*   @Funcion      buscaIpOrigen
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
buscaIpOrigen()
{
  console.log ("Entra Ip Origen"); 
  let intDpcOpcip:number = this.IpOrigen.value;

  let parametros = new HttpParams()
  .set("querry","dpc.opc.ip=\"" + intDpcOpcip + "\"");

  console.log("Ip Origen ingresada" + intDpcOpcip);

  this.servhttp.consultaCentral(parametros)
  .subscribe(dat=>
    {
      console.log ("Regresando de la consulta central");
      console.log (dat);
      if (dat['codigo']=="0")
      this.CentralOrigen.setValue(dat['data'][0].centralEqp);
    }
              );	
}


/**************************************************************************************  
*  Muestra valor en el campo Ciudad Destino referente al valor del campo ingresado por CS en el campo Destino*
*   @Author:	    Anahi Flores
*   @Date:		    19/12/2019
*   @update:      19/12/2019  
*   @Version:     1.0
*   @Funcion      buscaDestino
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
buscaDestino()
{
let strNumero:string;
strNumero = this.Destino.value;

let intLada:number=  +strNumero.substring(0,2);

if (intLada == 55 || intLada == 33 || intLada == 56 ||intLada == 81)
  {
    intLada =  +strNumero.substring(0,2);
  
  }else
  
  intLada =  +strNumero.substring(0,3);

  let parametros = new HttpParams()
  .set("querry","lada=\"" + intLada + "\"");

  console.log("Destino Ingresado" + strNumero.substring(0,3));

  this.servhttp.consultaCiudad(parametros)
  .subscribe(dat=>
  {
    console.log ("Regresando de la Consulta Ciudad");
    console.log (dat);
    if (dat['codigo']=="0")
    this.CiudadDestino.setValue(dat['data'][0].ciudad);
  }
      );
}


/**************************************************************************************  
*  Muestra valor en el campo Central Destino referente al valor del campo ingresado por CS en el campo IP Destino/OPC*
*   @Author:	    Anahi Flores
*   @Date:		    19/12/2019
*   @update:      19/12/2019 
*   @Version:     1.0
*   @Funcion      buscaIpDestino
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
buscaIpDestino()
{
  console.log ("entra ipdestino"); 

  let intDpcOpcip:number = this.IpDestino.value;

  let parametros = new HttpParams()
  .set("querry","dpc.opc.ip=\"" + intDpcOpcip + "\"");

  console.log("Ip Destino ingresada" + intDpcOpcip);

  this.servhttp.consultaCentral(parametros)
  .subscribe(dat=>
  {
    console.log ("Regresando de la consulta central");
    console.log (dat);
    if (dat['codigo']=="0")
    this.CentralDestino.setValue(dat['data'][0].centralEqp);
  }
                );

}

/**************************************************************************************  
*  Muestra valor en el campo Operador Origen referente al valor del campo ingresado por CS en el campo TDD (IDO)*
*   @Author:	   Anahi Flores 
*   @Date:		    19/12/2019
*   @update:      19/12/2019  
*   @Version:     1.0
*   @Funcion      buscaIDO
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

buscaIDO()
{
console.log ("entra busca IDO"); 

let intIdo:number = this.IDO.value;

let parametros = new HttpParams()
.set("querry","ido=\"" + intIdo + "\"");

console.log("IDO Ingresado" + intIdo);


this.servhttp.consultaOperador(parametros)
.subscribe(dat=>
{
  console.log ("Regresando de la Consulta IDO");
  console.log (dat);
  if (dat['codigo']=="0")
  this.OperadorOrigen.setValue(dat['data'][0].central);
}

      );

}

/**************************************************************************************  
*  Muestra valor en el campo Operador Destino referente al valor del campo ingresado por CS en el campo TDD (IDD)*
*   @Author:	    Anahi Flores
*   @Date:		    19/12/2019
*   @update:      19/12/2019  
*   @Version:     1.0
*   @Funcion      buscaIDO
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

buscaIDD()
{
console.log ("entra busca IDD"); 

let intIdd:number = this.IDD.value;


let parametros = new HttpParams()
.set("querry","idd=\"" + intIdd + "\"");

console.log("IDD ingresado" + intIdd);


this.servhttp.consultaOperador(parametros)
.subscribe(dat=>
{
  console.log ("Regresando de la consulta IDD");
  console.log (dat);
  if (dat['codigo']=="0")
  this.OperadorDestino.setValue(dat['data'][0].central);
}
             );

}

}
