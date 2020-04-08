
/**************************************************************************************  <
*
*   @Author:		  Anahi Flores
*   @Date:		    17/03/2020  
*   @update:      17/03/2020  
*   @Version:      1.0
*   @Class       AltaQuejaComponent
*-------------------------------------------------------------------------------------
*   @Objetivo:    Se encarga de dar de Alta una Queja
*
**************************************************************************************/
import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpParams} from '@angular/common/http';
import { FormControl,Validators,  FormGroup} from '@angular/forms';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { ServicioHttpService} from'../servicio-http.service';
import { InterlocutoresSitioComponent} from '../interlocutores-sitio/interlocutores-sitio.component';
import { ServicioVarialesGlobalesService} from '../servicio-variales-globales.service';
import {LoadComponent } from '../carga-lenta/load.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-alta-queja-aux',
  templateUrl: './alta-queja-aux.component.html',
  styleUrls: ['./alta-queja-aux.component.css']
})


export class AltaQuejaAUXComponent implements OnInit {
  FormularioAlta:FormGroup;
  disabled_btnCreaQueja:string="false";
 

 @ViewChild(InterlocutoresSitioComponent,{static: false}) interlocutores: InterlocutoresSitioComponent;

  Days = [{name: 'Lunes'},{name: 'Martes'},{name: 'Miércoles'}, {name: 'Jueves'},{name: 'Viernes'},{name: 'Sábado'}, {name: 'Domingo'} ];
  Times=[{name:'00:00'},{name:'00:30'},{name:'01:00'},{name:'01:30'},{name:'02:00'},{name:'02:30'},{name:'03:00'},{name:'03:30'},{name:'04:00'},{name:'04:30'},{name:'05:00'},
          {name:'05:30'},{name:'06:00'},{name:'06:30'},{name:'07:00'},{name:'07:30'},{name:'08:00'},{name:'08:30'},{name:'09:00'},{name:'09:30'},{name:'10:00'},{name:'10:30'},
          {name:'11:00'},{name:'11:30'},{name:'12:00'},{name:'12:30'},{name:'13:00'},{name:'13:30'},{name:'14:00'},{name:'14:30'},{name:'15:00'},{name:'15:30'},{name:'16:00'},
          {name:'16:30'},{name:'17:00'},{name:'17:30'},{name:'18:00'},{name:'18:30'},{name:'19:00'},{name:'19:30'},{name:'20:00'},{name:'20:30'},{name:'21:00'},{name:'21:30'},
          {name:'22:00'},{name:'22:30'},{name:'23:00'},{name:'23:30'}];

Fallas:any;
CaracteristicaDet:any;


  constructor( private servhttp : ServicioHttpService ,
               public variables : ServicioVarialesGlobalesService , 
               private pipeFecha : DatePipe,
               private dialogRef: MatDialog )
  {
    this.FormularioAlta= this.createFormGroup();
    this.filtraFallas();
    this.generarCadenaFallas();
   }

   ngOnInit() {
  }

    /**************************************************************************************  
*   Valida que se hayan capturado todos los datos de la Queja
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    crearQueja
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
  crearQueja()
  {
   this.disabled_btnCreaQueja="true";

   if (this.interlocutores.FormularioContacto.status =="INVALID")
      {
        this.variables.muestraBarra("Para crear un Incidente es necesario contar con la Información correcta de Contactos en Sitio","Error");
        this.disabled_btnCreaQueja="false";
        return;
       }
       if (this.FormularioAlta.status =="INVALID")
       {
         this.variables.muestraBarra("Para crear un Incidente es necesario contar con la información correcta","Error");
         this.disabled_btnCreaQueja="false";
         return;
        }
        this.enviaQueja();
  }

 /**************************************************************************************  
*   Crea el formulario para la alta de la Queja
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    createFormGroup
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

  private createFormGroup()
  {
    
    return new FormGroup({
        NIS             : new FormControl({value: this.variables.getReferenciaSelecionada(), disabled: true}),
        Severidad       : new FormControl('', [Validators.required]),
        DescripFalla    : new FormControl('', [Validators.required]),       
        Catalogacion    : new FormControl('', [Validators.required]),       
        DiaAccesoIni    : new FormControl('', [Validators.required]),
        DiaAccesoFin    : new FormControl('', [Validators.required]),
        HrAccesoIni     : new FormControl('', [Validators.required]),
        HrAccesoFin     : new FormControl('', [Validators.required]),
        Observaciones   : new FormControl('' ),
        Caracteristica  : new FormControl('' ),
        FolioCliente    : new FormControl('', [Validators.required])

      });
  }

  

 /**************************************************************************************  
*   envía la creación de la Queja al WS
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    buscaContactos
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

private enviaQueja()
{

 let dialogo = this.openLoad();
 
  let movimiento:string = "SolicitudAltaQueja";
  let strXML:string  = this.formaXML();

  let parametros = new HttpParams()
  .set("mov",movimiento)
  .set("param",strXML);

  console.log(strXML);
  this.servhttp.creaQueja(parametros)
  .subscribe(data=>{
    this.disabled_btnCreaQueja="false";
    dialogo.close();
    console.log(data);
    
    if(data["codigoDeRespuesta"]== "10000" )
    {
      data["descripcionDelError"] = "Se ha Creado el Incidente: "+ data["identificadorDeQueja"] ;

      this.openDialog(data) ;
       }
    else
     {
      let strerror:string;
      strerror= data["descripcionDelError"];
      
      this.variables.muestraBarra(strerror.substr(0,strerror.indexOf(".")),"ERROR" );

    }
    this.limpiarPantallaAlta();
  });
 
}

 /**************************************************************************************  
*   Forma el XML para crear la Queja
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    formaXML
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

private formaXML()
{
console.log (this.generarCadenaFallas());
  let fechaActual= this.formatoFecha(new Date());
  return  "<AseguramientoQuejas>"
              +"<SolicitudAseguramiento>"
                      +"<FechaDeCita>"+fechaActual +"</FechaDeCita>"
                      +"<CUCEmpresarial>"+ this.variables.getCUC()+"</CUCEmpresarial>"
                      +"<IdentificadorDeEmpresa>IdentificadorDeEmpresa</IdentificadorDeEmpresa>"
                      +"<NombreDeUsuarioDeEmpresa>"+this.variables.getUsuario()+"</NombreDeUsuarioDeEmpresa>"
                      +"<DireccionDeEmpresa>Direccion de la empresa</DireccionDeEmpresa>"
                      +"<NombreDeEmpresa>"+this.variables.getEmpresasSelecionadas()[0].RazonSocial+"</NombreDeEmpresa>"   
                      +"<HorarioDeAccesoASitioDiaInicio>"+ this.DiaAccesoIni.value["name"]  +"</HorarioDeAccesoASitioDiaInicio>"
                      +"<HorarioDeAccesoASitioHoraInicio>"+this.HrAccesoIni.value["name"]+"</HorarioDeAccesoASitioHoraInicio>"
                      +"<HorarioDeAccesoASitioDiaFin>"+ this.DiaAccesoFin.value["name"]+"</HorarioDeAccesoASitioDiaFin>"
                      +"<HorarioDeAccesoASitioHoraFin>"+this.HrAccesoFin.value["name"] +"</HorarioDeAccesoASitioHoraFin>"
                      +"<TelefonoCentroDeAtencion/>"
                      +"<FechaDeDeteccionDeFalla>"+fechaActual+"</FechaDeDeteccionDeFalla>"
                      +"<NombreDeContactoEnSitio>"+this.valoresContacto(this.interlocutores.FormularioContacto.value["ContSitContacto"],"Nombre")+"</NombreDeContactoEnSitio>"
                      +"<ApellidoPaternoDeContactoEnSitio>"+this.valoresContacto(this.interlocutores.FormularioContacto.value["ContSitContacto"],"apellidoPaterno")+"</ApellidoPaternoDeContactoEnSitio>"
                      +"<ApellidoMaternoDeContactoEnSitio>"+this.valoresContacto(this.interlocutores.FormularioContacto.value["ContSitContacto"],"apellidoMaterno")+"</ApellidoMaternoDeContactoEnSitio>"
                      +"<TelefonoDeContactoEnSitio>"+ this.interlocutores.FormularioContacto.value["ContSitTelefono"]+"</TelefonoDeContactoEnSitio>"
                      +"<MovilDeContactoEnSitio>"+this.interlocutores.FormularioContacto.value["ContSitCelular"]+"</MovilDeContactoEnSitio>"
                      +"<NombreDeContactoParaSeguimiento>"+this.variables.getNombre()+"</NombreDeContactoParaSeguimiento>"
                      +"<ApellidoPaternoDeContactoParaSeguimiento>"+ this.variables.getApep()+"</ApellidoPaternoDeContactoParaSeguimiento>"
                      +"<ApellidoMaternoDeContactoParaSeguimiento>"+ this.variables.getApem()+"</ApellidoMaternoDeContactoParaSeguimiento>"
                      +"<TelefonoDeContactoParaSeguimiento>"+this.variables.getTelefono()+"</TelefonoDeContactoParaSeguimiento>"
                      +"<MovilDeContactoParaSeguimiento>"+this.variables.getCelular()+"</MovilDeContactoParaSeguimiento>"
                      +"<CorreoDeContactoParaSeguimiento>"+this.variables.getCorreo()+"</CorreoDeContactoParaSeguimiento>"
                      +"<DescripcionDetalladaDeFalla>"+((this.Observaciones.value == null || this.Observaciones.value == '')?'SOLICITUD A REGISTRAR':this.Observaciones.value)+"</DescripcionDetalladaDeFalla>"
                      +"<SeveridadDeLaFalla>"+this.Severidad.value+"</SeveridadDeLaFalla>"
                      +"<CatalogacionDeFalla>"+this.generarCadenaFallas()+"</CatalogacionDeFalla>" 
                      +"<IdentificadorNISDeServicio>"+this.variables.getReferenciaSelecionada()+"</IdentificadorNISDeServicio>"
                      +"<DatosServicioDeComparticion>"
                      +"<IdentificadorNISDeServicio></IdentificadorNISDeServicio>"
                          +"<GeolocalizacionLongitud></GeolocalizacionLongitud>"
                          +"<GeolocalizacionLatitud></GeolocalizacionLatitud>"
                          +"<TipoDeElemento></TipoDeElemento>"
                          +"<IdentificadorElemento></IdentificadorElemento>"
                      +"</DatosServicioDeComparticion>"
                      +"<DatosServicioDeInterconexion-Trafico-Portabilidad>"
                      +"<Origen1></Origen1>"
                      +"<Destino1></Destino1>"
                      +"<Origen2></Origen2>"
                      +"<Destino2></Destino2>"
                      +"<IPOrigen></IPOrigen>"
                      +"<IPDestino></IPDestino>"
                      +"<TDD-IDO></TDD-IDO>"
                      +"<TDD-IDD></TDD-IDD>"
                      +"<TDD-10D></TDD-10D>"
                      +"<PortID></PortID>"
                      +"<CIC></CIC>"
                      +"<CentralOrigenOCPIP></CentralOrigenOCPIP>"
                      +"<CentralDestinoDCPIP></CentralDestinoDCPIP>"
                  +"</DatosServicioDeInterconexion-Trafico-Portabilidad>"
                      +"<FallaMasiva></FallaMasiva>"
                      +"<Prioridad>"+this.Severidad.value+"</Prioridad>"
                      +"<Comentarios>"+this.DescripFalla.value+"</Comentarios>"
                      +"<FolioDelCliente>"+this.FolioCliente.value+"</FolioDelCliente>"
          +"</SolicitudAseguramiento>"
          +"<DatosControl>"
              +"<IdCorrelacion>" + this.getIDCorre ()+"</IdCorrelacion>"
          +"</DatosControl>" 
          +"</AseguramientoQuejas>";
  }
  

  get NIS () {return this.FormularioAlta.get('NIS');}
  get Severidad    (){return this.FormularioAlta.get('Severidad');}
  get DescripFalla (){return this.FormularioAlta.get('DescripFalla');}
  get Catalogacion (){return this.FormularioAlta.get('Catalogacion');}
  get DiaAccesoIni (){return this.FormularioAlta.get('DiaAccesoIni');}
  get DiaAccesoFin (){return this.FormularioAlta.get('DiaAccesoFin');}
  get HrAccesoIni  (){return this.FormularioAlta.get('HrAccesoIni');}
  get HrAccesoFin  (){return this.FormularioAlta.get('HrAccesoFin');}
  get FolioCliente (){return this.FormularioAlta.get('FolioCliente');}
  get Caracteristica (){return this.FormularioAlta.get('Caracteristica');}
  get IpOrigen  (){return this.FormularioAlta.get('IpOrigen');}
  get IpDestino (){return this.FormularioAlta.get('IpDestino');}
  get CentralOrigen (){return this.FormularioAlta.get('CentralOrigen');}
  get CentralDestino (){return this.FormularioAlta.get('CentralDestino');}
  get CIC (){return this.FormularioAlta.get('CIC');}
  get Observaciones (){return this.FormularioAlta.get('Observaciones');}

  
  
  private getIDCorre()
  {
    let d = new Date();
    return 'SEG-' +  this.variables.getReferenciaSelecionada() +'-'+d.getTime();
  }

 /**************************************************************************************  
*   Convierte la fecha en el formato solicitado por el WS
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    formatoFecha
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

  private formatoFecha(fecha)
  {
    let date =this.pipeFecha.transform( fecha, 'dd/MM/yyyy hh:mm:ss');
    return date;   
  }

  /**************************************************************************************  
*  Abre el dialogo de la respuesta del WS
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    openDialog
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

  openDialog(data) 
  {
 
    
    let config = new MatDialogConfig();
    
    config.data=data;
    config.backdropClass='dialog-backdrop';
    
    
    }

  /**************************************************************************************  
*  Abre el dialogo de la imagen de Carga lenta
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    openDialog
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
   public openLoad() 
   {
     
    let config = new MatDialogConfig();
 config.data=null;
 config.backdropClass='dialog-load';
 const dlgn = this.dialogRef.open(LoadComponent,config );
 return dlgn;
  }

 /**************************************************************************************  
*  limpia los formularios de la pantalla
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    limpiarPantallaAlta
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
   public limpiarPantallaAlta()
    {
      this.interlocutores.limpiaSeccionInterlocutor();
      this.FormularioAlta.reset();
      this.NIS.setValue(this.variables.getReferenciaSelecionada());
    }


/**************************************************************************************  
*  Muestra en el campo Problema Reportado las fallas de acuedo al tipo de Servicio
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    filtraFallas
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
 private filtraFallas()
 {
    if(this.variables.getTipoServicio() == "LE" )
    {
      this.Fallas = [ {name: 'Fuera de servicio sin redundancia'},{name: 'Fuera de servicio con redundancia'},
                      {name: 'Cortes'},{name: 'Errores'},
                      {name: 'Degradación del servicio'},{name: 'Asistencia a pruebas'}]; 
      
                          
    }
    else if (this.variables.getTipoServicio() == "INX" )
    {
      this.Fallas = [ {name: 'Fuera de servicio sin redundancia'}, {name: 'Fuera de servicio con redundancia'},
                      {name: 'Cortes'},{name: 'Errores'},
                      {name: 'Degradación del servicio'},{name: 'Asistencia a pruebas'},
                      {name: 'Problemas de tráfico de voz'},{name: 'Troncales bloqueadas'}];     

    }
    else if (this.variables.getTipoServicio() == "AUX" )
    {
      this.Fallas = [ {name: 'Fuera de servicio sin redundancia'},{name: 'Fuera de servicio con redundancia'},
                      {name: 'Cortes'},{name: 'Errores'},
                      {name: 'Degradación del servicio'},{name: 'Asistencia a pruebas'},
                      {name: 'Problemas de tráfico de voz'},{name: 'Soporte primer nivel'}];

    }
    else if (this.variables.getTipoServicio() == "CMP" )
    {
      this.Fallas = [ {name: 'Asistencia a pruebas'}];

    }
   
}


/**************************************************************************************  
*  Muestra lista de valores del campo Caracteristica detallada  de acuedo al campo Problema Reportado
*
*   @Author:		Anahi Flores
*   @Date:		  09/01/2020
*   @update:    13/01/2020
*   @Version:   1.0
*   @Funcion    filtraCaracteristicaDet
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/ 
public filtraCaracteristicaDet(evento)

{
  console.log("filtraCaracteristicaDet");
  console.log (evento);
  console.log (this.Catalogacion);

  this.CaracteristicaDet =[{}];
  this.CaracteristicaDesobligatoria();
  this.Caracteristica.setValue("");


   if(evento == "Fuera de servicio sin redundancia")

   {
     this.CaracteristicaDet = [ {name: 'Daño en equipo'},{name: 'Daño en infraestructura'},
                     {name: 'Módem / NTU / Demarcador'},{name: 'Sin servicio'},]; 
      this.CaracteristicaObligatoria();
     
    }
    else if (evento == "Fuera de servicio con redundancia" )
    {
      this.CaracteristicaDet = [ {name: 'Daño en equipo'},{name: 'Daño en infraestructura'},
      {name: 'Módem / NTU / Demarcador'},{name: 'Sin servicio'},];
      this.CaracteristicaObligatoria();
     
    }
    else if (evento == "Degradación del servicio" )
    {
      this.CaracteristicaDet = [ {name: 'Lentitud'},{name: 'No alcanza el ancho de banda'},
      {name: 'Pérdida de paquetes'},];
      this.CaracteristicaObligatoria();
     
    }

    else if (evento == "Asistencia a pruebas")
    {
      this.CaracteristicaDet = [ {name: 'Acceso por falla'},{name: 'Histórico de alarmas'},
      {name: 'Monitoreo'}, {name: 'Pruebas conjuntas'},];
      this.CaracteristicaObligatoria();
     
    }

  }

/**************************************************************************************  
*  Función que convierte a Caracteristica Detallada en requerida
*
*   @Author:		Anahi Flores
*   @Date:		  13/01/2020
*   @update:    13/01/2020
*   @Version:   1.0
*   @Funcion    CaracteristicaObligatoria
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/ 
private CaracteristicaObligatoria()
{
  this.FormularioAlta.controls["Caracteristica"].setValidators(Validators.required);
  this.FormularioAlta.controls["Caracteristica"].updateValueAndValidity();

}
/**************************************************************************************  
*  Función que permite que el campo Caracteristica Detallada no sea requerida.
*
*   @Author:		Anahi Flores
*   @Date:		  13/01/2020
*   @update:    13/01/2020
*   @Version:   1.0
*   @Funcion    CaracteristicaObligatoria
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/ 
private CaracteristicaDesobligatoria()
{
  this.FormularioAlta.controls["Caracteristica"].setValidators(null);
  this.FormularioAlta.controls["Caracteristica"].updateValueAndValidity();
 

}
/**************************************************************************************  
* Genera la Cadena para el tag CatalogacionDeFalla, despendiendo de los valores ingresados en campo Problema Reportado y Caracteristica Detallada
*
*   @Author:		Anahi Flores
*   @Date:		  13/01/2020
*   @update:    13/01/2020
*   @Version:   1.0
*   @Funcion    CaracteristicaObligatoria
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/ 
  private generarCadenaFallas()
 {
   console.log("this.generarCadenaFallas()" );
    console.log (this.FormularioAlta.value["Caracteristica"])

  if (this.Caracteristica.value == null || this.Caracteristica.value ==""  )
  {
    return this.Catalogacion.value;
  }
   else {
    return this.Catalogacion.value + "/" + this.Caracteristica.value;}
   
 }
 /**************************************************************************************  
* Separa los valores del Contacto ingresado.
*
*   @Author:		Raúl Ramirez
*   @Date:		  22/01/2020
*   @update:    22/01/2020
*   @Version:   1.0
*   @Funcion    valoresContacto
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/ 

 private valoresContacto (nombreCompleto, separador)
 {
  let arrayDeCadenas = nombreCompleto.split(" ");

  let tamano =arrayDeCadenas.length;
  let valor = "";
//console.log ("el tamaño es de:" + tamano+ " "+nombreCompleto);
  switch (separador) {

    case 'Nombre':
      if (tamano <= 3)
    valor= arrayDeCadenas [0];
else{
    for(var i=0;i<tamano-2;i++) {

  if (i==0) 
  valor=arrayDeCadenas [i];

     else valor = valor+ " " + arrayDeCadenas[i];
    }
  }
return valor;

        break;

    case 'apellidoPaterno':

    if (tamano >= 3)
   {   valor = arrayDeCadenas[tamano -2];
   }
      else{ 
        valor= arrayDeCadenas [1];
      }
      return valor;
    break;

    case 'apellidoMaterno':
      if (tamano >= 3)
      valor = arrayDeCadenas[tamano-1];
      else valor = "";
    return valor;
      break;
    default:
}

 } 

}