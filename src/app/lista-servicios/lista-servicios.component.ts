/**************************************************************************************  <
*
*   @Author:		  RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Class       ListaServiciosComponent
*-------------------------------------------------------------------------------------
*   @Objetivo:    Se encarga mostrar los servicios de un Usuario y de 
*                enviar la Referencia selecionada a una Alta de Queja o a la consulta de la Queja
*                cuando la Referencia selecionada ya tiene una queja en proceso.
*
**************************************************************************************/
import { Output, EventEmitter ,Component, ViewChild } from '@angular/core';
import { HttpParams} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';
import { ServicioVarialesGlobalesService} from '../servicio-variales-globales.service';
import { ServicioHttpService } from '../servicio-http.service'; 
import {Referencia} from '../bean/bean-referencia';
import { Empresa } from '../bean/bean-empresa';
import {LoadComponent } from '../carga-lenta/load.component';
import {DialogConfirmaInterconeccionComponent} from '../dialog-confirma-interconeccion/dialog-confirma-interconeccion.component'
import { Interconeccion } from '../bean/bean-interconeccion';
import {DialogAltaInterconeccionComponent } from '../dialog-alta-interconeccion/dialog-alta-interconeccion.component';
import { DialogAltaCmpComponent } from '../dialog-alta-cmp/dialog-alta-cmp.component';
import { RespuestaReferencia } from '../bean/bean-referencia-resp';
import { RespuestaInterconeccion } from '../bean/bean-interconeccion-resp';


@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css']
})


export class ListaServiciosComponent {
  displayedColumns: string[] = ['Referencia','Familia','Puntas','Domicilio','Empresa', 'CUC', 'Cliente', 'Folio'];
  disabled_btnBuscar:boolean=false;
  visibleLoad :boolean=false;
  dataSource : any;
  strArchivo :string;
  valor: string;
  

  @Output() cambiaAlta = new EventEmitter();
  @Output() cambiaConsulta = new EventEmitter();
  @Output() limpiaHijos  = new EventEmitter();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(  private serviciohttp : ServicioHttpService,
                private variables :ServicioVarialesGlobalesService,
                private cargaLenta: MatDialog )  { 
  
  }
  
/**************************************************************************************  
*   limpia el campo de Referencia cuando el usuario requiera limpiar el campo de las referencias que se Consultaran
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    limpiaReferencia
*  	@param:		  Referencia = objeto html input  de la referencia.*  
*-------------------------------------------------------------------------------------
*   @return:      .
*
**************************************************************************************/
  public limpiaReferencia(referencia)
  {
    referencia.value="";
  }

/**************************************************************************************  
*   Válida y selecciona el flujo que 
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      26/12/2019 
*           ->Se separa la funcionalidad , primero se válida el tipo de servicio 
*           ->Si es interconección y es un número télefonico consulta el cátalogo de SIDECCI
*           ->Si es cualquier otro tipo de servicio o no es un número télefonico va a consultar SISA.    
*   @Version:      1.0
*   @Funcion       consultaReferencias
*  	@param:		    referencia = cadena de referencias que se requieren buscar, deben de estar separadas por Coma :","  
*-------------------------------------------------------------------------------------
*   @return:      .
*
**************************************************************************************/
public ejecutaBusqueda(strFolio)
  
  { 
    this.valoresPreBusqueda();
    if (strFolio === "" || strFolio===undefined || strFolio ===null )
      {
        this.variables.muestraBarra("Necesitamos una Referencia para iniciar la busqueda","MSG");
      } /*else if (!this.validaMnemonico(strFolio)) {
        this.variables.muestraBarra("Referencia ingresada no pertenece al Tipo de Servicio indicado","MSG");
      }*/
      else 
      {
        // this.valor = strFolio.substr(0,3);
            let TipoServicio : string = this.variables.getTipoServicio();
            switch(TipoServicio)
            {
              case  "INX":
                //Ejecuta las validaciones y flujo para Interacciones
                if(this.esNumero(strFolio))
                  this.consultaInterconecciones(strFolio);
                else
                  this.consultaServicios(strFolio);
              break;
              case  "CMP":
                //Ejecuta las validaciones y flujo para Compartición
                this.consultaComparticion(strFolio);
              break;
              case  "LE":
                //Ejecuta las validaciones y flujo para Elaces Dedicados
                this.consultaServicios(strFolio);
              break;
              case "AUX":
                //Ejecuta las validaciones y flujo para Auxiliares
                this.consultaServicios(strFolio);
              break;
        }
      }

      this.valoresPostBusqueda();
  }



/**************************************************************************************  
*   Válida que una cadena sea un número
*
*   @Author:		RuloRamBel
*   @Date:		  27/12/2019
*   @update:    27/12/2019  
*   @Version:   1.0
*   @Funcion    esNumero
*  	@param:		 cadena  
*-------------------------------------------------------------------------------------
*   @return:  Regresa true si la cadena es un numero y false si es una cadena alfanúmerica
*
**************************************************************************************/
  private esNumero(cadena:string)
  {
     if (cadena.match( /^([0-9])*$/) ==null)
     return false;
    else 
      return true;
  }

/**************************************************************************************  
*   Arma el Querry que se enviará al WS cuando el servicio es digerente de interconección
*
*   @Author:		RuloRamBel
*   @Date:		  26/12/2019
*   @update:    24/03/2020  
*   @Version:   1.0
*   @Funcion    consultaServicios
*  	@param:		  referencia = cadena de referencias que se requieren buscar, deben de estar separadas por Coma :","  
*-------------------------------------------------------------------------------------
*   @return:      .
*
**************************************************************************************/
public consultaServicios(referencias:string)
{

  let parametro:string = "\""+ referencias.replace(/,/g,"\",\"") +"\"";
  
  let parametros = new HttpParams()
   .set("querry",parametro)
   .set("siglas", this.variables.getTipoServicio())
   .set("cuc", this.variables.getCUC());
        
  this.serviciohttp.consultaReferencias(parametros)
    .subscribe(Servicios =>{this.mostrarSetPantalla(Servicios)});     
 }

 /**************************************************************************************  
*  Muestra en el Grid los servicios encontrados en la consulta 
*
*   @Author:		RuloRamBel
*   @Date:		  09/03/2020
*   @update:    09/03/2020  
*   @Version:   1.0
*   @Funcion    mostrarSetPantalla
*  	@param:		  referencias = Conjunto de Servicios que se mostraran en pantalla  
*-------------------------------------------------------------------------------------
*   @return:      .
*
**************************************************************************************/
 public mostrarSetPantalla(Servicios: RespuestaReferencia)
 {
    if (Servicios["codigo"]=="0")
    {
      this.dataSource  =  new MatTableDataSource<Referencia>(Servicios['data'])  ;
      this.dataSource.paginator = this.paginator;    
    } else
    {
      this.variables.muestraBarra("no encontramos datos en nuestra lista de servicios", "ERROR");
    }
}

/**************************************************************************************  
*   Arma el Querry que se enviará al WS cuando el servicio es digerente de interconección 
*
*   @Author:		RuloRamBel
*   @Date:		  27/12/2019
*   @update:    27/12/2019  
*   @Version:   1.0
*   @Funcion    consultaInterconecciones
*  	@param:		  número teléfonico de la interconección que se quiere buscar  
*-------------------------------------------------------------------------------------
*   @return:      .
*
**************************************************************************************/
public consultaInterconecciones(pNumeroTelefonico:string)
{
 console.log("Que llego " + pNumeroTelefonico)
    let parametros = new HttpParams()
      .set("cuc",this.variables.getCUC())
      .set("numero",pNumeroTelefonico)
      /*.set("valor", this.valor)*/;
  
    this.serviciohttp.consultaInterconeccion(parametros)
      .subscribe(  Respuesta =>{ this.evaluaRespConsultaInterconeccion (Respuesta); });
      
  
}

/**************************************************************************************  
*   Evalua la respuesta de la consulta hecha a la BD
*   Sí el servicio existe en la BD y en SIDECCI se muestra en pantalla 
*   Sí el servicio existe en la BD pero no en SIDECCI se muestra una pantalla para darlo de alta
*   Sí no exite en la BD se muestra un mensaje al usuario.
*   @Author:		RuloRamBel
*   @Date:		  09/03/2020
*   @update:    09/03/2020  
*   @Version:   1.0
*   @Funcion    evaluaRespConsultaInterconeccion
*  	@param:		  Set de datos provenientes de la consulta a la BD  
*-------------------------------------------------------------------------------------
*   @return:      .
*
**************************************************************************************/
public  evaluaRespConsultaInterconeccion (data : RespuestaInterconeccion) 
{
  console.log( data["codigo"],  data["mensaje"]);
   if(data["codigo"]=="0")
    {

      console.log("dentro del if ");
      console.log(data['data'][0]);
      
      if(data['data'][0]["validacion"]=="No")
      {
        let dlg = this.abrirConfAltaCatInter(data['data'][0]);
          dlg.afterClosed().subscribe( Formulario=>{ this.RespConfimacionAltaInter(Formulario,data['data'][0] );  });
      }
      else if(data[0]["validacion"]=="Si")
      { console.log("si");
      console.log(data['data'][0]);
      this.llenaSetReferencia( null, data['data'][0] , "Si")
      }
  }
  else{
    this.variables.muestraBarra("El número no existe en nuestra lista de servicios ","MSG");
  }
}

/**************************************************************************************  
*   Valída la respuesta del formulario de confirmación
*   Sí el usuario escoje Sí , se abrirá el pop up de alta
*   @Author:		RuloRamBel
*   @Date:		  09/03/2019
*   @update:    09/03/2019  
*   @Version:   1.0
*   @Funcion    abrirAltaInter
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
public RespConfimacionAltaInter(pFormulario : any , data : Interconeccion)
{
  if(pFormulario==true)
  {
      let altainter = this.abrirAltaInterconeccion( data );
      altainter.afterClosed().subscribe(Formulario=> { this.llenaSetReferencia( Formulario, data , "No")} );
  }
}

/**************************************************************************************  
*   Valída la respuesta del formulario de confirmación
*   Sí el usuario escoje Sí , se abrirá el pop up de alta
*   @Author:		RuloRamBel
*   @Date:		  09/03/2019
*   @update:    09/03/2019  
*   @Version:   1.0
*   @Funcion    llenaSetReferencia
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
public llenaSetReferencia( pFormulario : any , data : Interconeccion , validacion : string)
{
  let referencias:RespuestaReferencia;
  console.log (data);
  if(validacion=="Si")
    {
        referencias = {
          'codigo': "0",
          'mensaje': 'Correcto',
          'data': [{
            referencia:"TNT"+ "-" + data["noNal"] ,
            CUCEmpresarial: this.variables.getCUC(),
            cliente:data["empresa"]   ,
            folio: "" ,
            familia: "",
            puntas: "" ,
            domicilio:data["central"],
            empresa:data["empresa"] ,
          }]
        };
  }
  else{
    console.log("Enmtar en el no " ) ;
    console.log(pFormulario)
        referencias = {
          'codigo': "0",
          'mensaje': 'Correcto',
          'data':  [{
            referencia:pFormulario.value["Tipo"] + "-" + data["noNal"] ,
            CUCEmpresarial: this.variables.getCUC(),
            cliente:data["empresa"]   ,
            folio: "" ,
            familia: "",
            puntas: "" ,
            domicilio:pFormulario.value["CiudadOrigen"]+"/" + pFormulario.value["CiudadDestino"],
            empresa:data["empresa"] ,
           }]
        };
    }
    this.mostrarSetPantalla(referencias);

}




/**************************************************************************************  
*   Limpia las variables globales y emite un evento al componente principal para que 
* desencadene una limpieza de toda la pantalla.
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       limpiaComponentes
*  	@param:		      
*-------------------------------------------------------------------------------------
*   @return:      .
*
**************************************************************************************/

  private limpiaComponentes()
  {
    this.variables.setQuejaSeleccionada(null);
    this.variables.setReferenciaSelecionada("");
    this.variables.setEmpresasSelecionadas(null);
    this.limpiaHijos.emit();
  }

/**************************************************************************************  
*   Envía los datos de la Referencia selecionada por el usuario en el Grid de Referencias
*   previamente válida que no haya una queja abierta para la referencia selecionada
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       limpiaComponentes
*  	@param:		      
*-------------------------------------------------------------------------------------
*   @return:      .
*
**************************************************************************************/

    public selecionDato(obj) 
    {
      let dlg = this.abreCarga();
      this.limpiaComponentes();
      const referencia :string= obj["referencia"];
      const parametro:string = "affected.item = \""+ referencia+ "\" and  ~(open =\"Cerrada\" or open =\"Cerrado\" or open =\"Cancelada\")";
      this.variables.setReferenciaSelecionada(obj["referencia"]);
     
      let parametros = new HttpParams()
      .set("querry",parametro);
  
      this.serviciohttp.consultaQueja(parametros)
        .subscribe(data=>{
                          dlg.close();
                           if (data["codigo"]== "0")
                            {
                              this.variables.setQuejaSeleccionada( data['data'][0] );
                              this.cambiaConsulta.emit();          
                            }
                            else 
                            {
                              let arrEmpresas :Empresa[] =[{ CUC :obj["CUCEmpresarial"] , RazonSocial:  obj["cliente"]}];
                              this.variables.setCUC(obj["CUCEmpresarial"]);
                              this.variables.setReferenciaSelecionada(obj["referencia"]);
                              this.variables.setEmpresasSelecionadas(arrEmpresas);
                              
                              this.cambiaAlta.emit();
                            }});
}

/**************************************************************************************  
*   limpia solo el componente : Lista de Servicios (imput Referencia y Grid)
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       limpiaPantalla
*  	@param:		      
*-------------------------------------------------------------------------------------
*   @return:      .
*
**************************************************************************************/

public limpiaPantalla (obj)
{
  this.limpiaReferencia(obj)
  this.dataSource=null;
}

/**************************************************************************************  
*  lee el archivo selecionado por el usuario en una cadena separada por comas:","
*   para déspues ejecutar la consulta
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       agregaArchivo
*  	@param:		      
*-------------------------------------------------------------------------------------
*   @return:      .
*
**************************************************************************************/

public agregaArchivo(archivo)
{

  this.strArchivo = "";
  let objArchivo = archivo.srcElement.files;
  this.strArchivo = objArchivo[0].name;

    if(this.validaArchivo( objArchivo[0] ))
    {
      let reader = new FileReader();
      reader.readAsText(archivo.target.files[0]);

      reader.onload = () => 
        {
            let strReferencias:string="";
            let csvDatos = reader.result;
            let csvRecordsArray = (<string>csvDatos).split(/\r\n|\n/);  

            csvRecordsArray.forEach(element => {
              strReferencias+= element;
            });
            this.consultaServicios(strReferencias);

            reader.onerror = function () {  
              console.error('No podemos leer tú archivo!');  
            };  
            
        };
    }

    else 
    {
      this.variables.muestraBarra("El archivo" + this.strArchivo +" No es un formato válido" ,"Error");
    }
  
}

/**************************************************************************************  
*  válida que el archivo seleccionado por el usario sea CSV
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       validaArchivo
*  	@param:		      
*-------------------------------------------------------------------------------------
*   @return:      .
*
**************************************************************************************/

  private validaArchivo (archivo: any) 
  {  
    return archivo.name.endsWith(".csv");  
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
public abreCarga() 
{ let config = new MatDialogConfig();
 config.data=null;
 config.backdropClass='dialog-load';
 const dlgn = this.cargaLenta.open(LoadComponent,config );
 return dlgn;
}



/**************************************************************************************  
*  Abre el pop-up de confirmación de alta de una interconeccion
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    abrirConfAltaCatInter
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
public abrirConfAltaCatInter(setData:Interconeccion) 
{ let config = new MatDialogConfig();
 config.data=setData;
 config.backdropClass='dialog-load';
 const dlgn = this.cargaLenta.open(DialogConfirmaInterconeccionComponent,config );
 return dlgn;
}

public abrirAltaInterconeccion(setData:Interconeccion)
{
    let config = new MatDialogConfig();
    config.data=setData;
    config.backdropClass='dialog-load';
    const dlgn = this.cargaLenta.open(DialogAltaInterconeccionComponent,config );
    return dlgn;
}


public abreDialogoAltaComparticion() 
{ 
  console.log("ya entra al fomulario de CMP");
 let config = new MatDialogConfig();
 config.data=null;
 config.backdropClass='dialog-load';
 const dlgn = this.cargaLenta.open(DialogAltaCmpComponent,config );
 return dlgn;
}


public  valoresPreBusqueda() 
{
    this.dataSource=null;
    this.disabled_btnBuscar=true;
    this.visibleLoad =true;
}

public valoresPostBusqueda()
{
  this.disabled_btnBuscar=false;
  this.visibleLoad =false;
} 


/**************************************************************************************  
*   Arma el Querry que se enviará al WS cuando el servicio es digerente de Compartición
*
*   @Author:		AnahI Flores
*   @Date:		  03/03/2020
*   @update:    25/03/2020  
*   @Version:   1.0
*   @Funcion    consultaComparticion
*  	@param:		  referencia = cadena de referencias que se requieren buscar, deben de estar separadas por Coma :","  
*-------------------------------------------------------------------------------------
*   @return:      .
*
**************************************************************************************/

public consultaComparticion(referencias:string)
{
    if(referencias.startsWith("NIS-") && referencias.length == 17) {
      this.variables.setIdNis(referencias);
      console.log (this.variables.getTipoServicio());
      this.consultaServiciosCMP(referencias);
      let dlg = this.abreDialogoAltaComparticion(); 
      dlg.afterClosed().subscribe(Respuesta=> { this.llenaSetReferenciaCMP(Respuesta)} );
    } else {
      this.variables.muestraBarra("Referencia no valida para servicios de Compartición","MSG");
    }
    this.disabled_btnBuscar=false;
    this.visibleLoad =false; 
  
}
public consultaServiciosCMP(referencias:string)
{

  let parametro:string = "\""+ referencias.replace(/,/g,"\",\"") +"\"";
  
  let parametros = new HttpParams()
   .set("querry",parametro)
   .set("siglas", this.variables.getTipoServicio())
   .set("cuc", this.variables.getCUC());
        
  this.serviciohttp.consultaReferencias(parametros)
    .subscribe(
                data=>{
             
                  this.disabled_btnBuscar=false;
                  this.visibleLoad =false;
                  if (data["codigo"]=="0")
                  {
                    this.dataSource  =  new MatTableDataSource<Referencia>(data['data'])  ;
                    this.dataSource.paginator = this.paginator;
                  } else{
                    this.variables.muestraBarra("no encontramos datos en nuestra lista de servicios", "ERROR");
                }
              });     
 }

public llenaSetReferenciaCMP( resp : any)
{
    console.log(this.variables.getIdNis());
    if(this.variables.getIdNis() != null) {

     this.variables.setGeoLatitud = resp.value["GeoLatitud"];
      this.consultaServiciosCMP(this.variables.getIdNis())
    }
}

/**************************************************************************************  
*  Válida que el nemonico de la Referencia de acuerdo aL Tipo de Servicio
*
*   @Author:		Anahi Flores
*   @Date:		    19/03/2020
*   @update:      20/03/2020  
*   @Version:     1.0
*   @Funcion      validaNemonico
*  	@param:		      
*-------------------------------------------------------------------------------------
*   @return:      .
*
*************************************************************************************

  public validaMnemonico(str:string) {
    this.valor = str.substr(0,3);
    let enlaces = ["A01","A02", "A03", "A04", "A06", "A08", "A12", "A16","A32", "C00", "C01", "C02", "C03", "C04", "C05", "C07", "C15", "C1G", "C20", "C30", "C40", "C50", "C75", "CB2", "CB4", "CB6", "D01", "D02", "D03", "D04", "D06", "D08", "D12", "D16", "D32", "D34", "DS0", "DS3", "E0-", "E1-", "E1P", "F10","F20", "F30", "F40", "F50", "F60", "F90", "FB2", "FB4"]
    let interconexiones = ["E1C","E1L", "E1X", "E1Z", "OTA", "ESC", "1GL", "1SL", "TC1", "1GI", "1SI", "E17", "E1D", "E1I", "E1N", "E1R", "E1T", "E1U", "ERL", "ES7", "ESL", "OT-", "OTZ", "EZC", "TS1", "PGC", "PIL", "PLC", "XCC", "XCR", "XOC", "XOR", "XRC", "PRE", "PRS", "PCO", "PGA", "PGO", "PHA", "PHC", "PHO", "PIA", "PIC", "PID", "PIE", "PIO", "PIS", "PS7", "PSC", "PSD", "PSR", "XOT", "XRR", "XSC", "XSR", "PTC", "P1L", "P1O", "PCS", "PNA", "PCC", "PGL", "PHL", "CBL", "CC2", "CBC", "CBD", "CBX", "CL2", "CBP", "CBT" ];
    let comparticion = ["NIS"]
    let auxiliares = ["NCA"]
    let tipoServicio = this.variables.getTipoServicio();
    if(enlaces.includes(this.valor) && tipoServicio == "LE"){
      return true;
    } else if ((interconexiones.includes(this.valor) || this.esNumero(str)) && tipoServicio == "INX") {
      return true;
    }else if (comparticion.includes(this.valor) && tipoServicio == "CMP") {
      return true;
    }else if (auxiliares.includes(this.valor) && tipoServicio == "AUX") {
      return true;
    }

    return false;
  }*/

}