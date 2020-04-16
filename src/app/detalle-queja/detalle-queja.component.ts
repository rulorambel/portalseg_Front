/**************************************************************************************  
*  Se encarga de mosttrar el Detalle de la queja y de darle seguimiento.
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @class       DetalleQuejaComponent
*  	
*  
*-------------------------------------------------------------------------------------
*  
*
**************************************************************************************/
import { Output, EventEmitter ,Component } from '@angular/core';
import {ServicioVarialesGlobalesService} from '../servicio-variales-globales.service';
import { HttpParams} from '@angular/common/http';
import { ServicioHttpService } from '../servicio-http.service';
import { Queja} from '../bean/bean-queja';
import {Bitacora} from '../bean/bean-bitacora';

@Component({
  selector: 'app-detalle-queja',
  templateUrl: './detalle-queja.component.html',
  styleUrls: ['./detalle-queja.component.css']
})

export class DetalleQuejaComponent  {

  @Output() cierraComponente  = new EventEmitter();
  @Output() actualizaQuejaSeleccion = new EventEmitter();

    Bitacora : Bitacora[];
    disabled_btnEnviar :string;
    disabled_btnServicioOK :string;
    visibleLoad :boolean=false;
    lblQueja :string;
    problema :string;
    FolioConsecionario:string;
    NIS:string;
    FechaReparacion:string;
    HorarioAcceso:string;
    Prioridad:string;
    Estado:string;
    validacionCliente :boolean=false;
    disabled_SIPO : boolean = false;



  constructor( public variables :ServicioVarialesGlobalesService ,
               public servhttp  : ServicioHttpService  )
   {
    this.disabled_btnEnviar="true";
    this.disabled_btnServicioOK="true"
   }

/**************************************************************************************  
*   muestra el detalle de una queja selecionada.
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       muestraDetalle
*  	@param:		    .
*  
*-------------------------------------------------------------------------------------
*   @return:      Arreglo con la bitacora consultada vía WS
*
**************************************************************************************/

  public muestraDetalle()
   {
    this.limpiarComponente();
    let queja :Queja;
    queja = this.variables.getQuejaSeleccionada();
     console.log (queja);
 
    this.lblQueja =queja["IDqueja"];
    this.problema = queja["problemaReportado"];
    this.FolioConsecionario= queja["folioConcesionario"];
    this.NIS = queja["referencia"];
    this.FechaReparacion = queja["fechaHorareparacion"];
    this.HorarioAcceso = queja["horarioAcceso"];
    this.Prioridad  = queja["prioridad"] ;
    this.Estado  = queja["estadoGlobal"] ;
    
    this.disabled_SIPO = queja["notificadoPor"] == "SIPO";
    
    if ( queja["validacionCliente"] == "true")
    this.validacionCliente  = true; 
    else 
    this.validacionCliente  = false; 

    if(this.validacionCliente == false && this.Estado=="VALIDACION CON EL CLIENTE") 
   
      {
          this.disabled_btnServicioOK="false";
       }

      this.consultaBitacora(); 
  }

/**************************************************************************************  
*   Refresca todos los campos de la queja consultando nuevamente al ws.
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      27/03/2020  
*   @Version:      1.0
*   @Funcion       actualizarQueja
*  	@param:		    .
*  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

public actualizarQueja()
   {
    this.visibleLoad=true;
    this.disabled_btnServicioOK="true";
    let parametro:string = "\""+ this.lblQueja.replace(/,/g,"\",\"") +"\""; 
    let parametros = new HttpParams()
     .set("querry",parametro)
     .set("siglas", "\""+ this.variables.getTipoServicio() +"\"")
     .set("cuc", this.variables.getCUC())
     .set("callback", "\"SIPO\",\"SEG\"")
     .set("estado", "\"INICIAL\",\"DIAGNOSTICO\",\"PENDIENTE POR PARO RELOJ\",\"EN PROCESO\",\"REPARADO\",\"VALIDACION CON EL CLIENTE\" ")
 
    this.servhttp.consultaQueja(parametros)
     .subscribe(data=>{
                  if(data["codigo"]=="0" )
                  {
                    console.log (data);
                   // this.variables.getQuejaSeleccionada();
                    this.variables.setQuejaSeleccionada( data['data'][0]);                   
                    this.lblQueja = data['data'][0]["IDqueja"];
                    this.problema = data['data'][0]["problemaReportado"];
                    this.FolioConsecionario= data['data'][0]["folioConcesionario"];
                    this.NIS = data['data'][0]["referencia"];
                    this.FechaReparacion = data['data'][0]["fechaHorareparacion"];
                    this.HorarioAcceso = data['data'][0]["horarioAcceso"];
                    this.Prioridad  = data['data'][0]["prioridad"] ;
                    this.Estado  = data['data'][0]["estadoGlobal"] ;
                    this.actualizaQuejaSeleccion.emit();
                   
                    if ( data['data'][0]["validacionCliente"] == "true")
                        this.validacionCliente  = true; 
                        else 
                        this.validacionCliente  = false; 

                        if(this.validacionCliente == false && this.Estado=="VALIDACION CON EL CLIENTE") 
                      
                          {
                              this.disabled_btnServicioOK="false";
                          }

                    this.consultaBitacora();
                  }
                  else{
                    this.variables.muestraBarra("No encontramos Información en nuestra Lista de Incidentes","MENSAJE");
                  } });
}

/**************************************************************************************  
*   Cambia el orden de la bitacora.
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       parseaArreglo
*  	@param:		    .
*  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
public parseaArreglo()
{
  this.Bitacora.reverse();
  
}

/**************************************************************************************  
*   Busca el valor de un texto en la bitacora.
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       parseaArreglo
*  	@param:		    .
*  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

/*filtraBitacora(filtro)
{
  
  let cadena:string =filtro.target.value;

  if (this.Bitacora===undefined)
  return;

  console.log(

this.Bitacora.filter(

  bitacora => {Number(bitacora.numeroActividad.toString()) < 3
  console.log (Number(bitacora.numeroActividad.toString()) < 3);
  })
  );
}*/

/**************************************************************************************  
*   Cosulta al ws la bicacora de la queja.
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       consultaBitacora
*  	@param:		    .
*  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

public consultaBitacora()
{
  console.log("Que hay en la queja seleccionada : ");
  console.log(this.variables.getQuejaSeleccionada());
  console.log("Inicia consulta");
  console.log(this.variables.getQuejaSeleccionada()["idIncidente"]);
  
  this.visibleLoad=true;
  if(this.lblQueja===undefined){
      this.variables.muestraBarra("No es posible consultar la Bitacora", "Error"); 
      return
  }else
  {
      this.disabled_btnEnviar="true";
      this.Bitacora = null;
      let parametro:string ;
      
      if ( this.variables.getQuejaSeleccionada()["idIncidente"]=="")
      {
         parametro = "id.evento= \""+this.lblQueja+"\" and tipo.actualiza  isin {\"Comunicación concesionario\",\"Actualización concesionario\"}";
      }
      else 
      {
        console.log(this.variables.getQuejaSeleccionada()["idIncidente"])
        parametro = "id.evento isin {\""+this.lblQueja+"\",\""+ this.variables.getQuejaSeleccionada()["idIncidente"]+"\" } "
        +"and tipo.actualiza  isin {\"Comunicación concesionario\",\"Actualización concesionario\",\"Cambio de Estatus Global\",\"Datos de liquidación\"}";

      }
      let parametros = new HttpParams()
      .set("querry",parametro);   
      this.servhttp.consultaBitacora(parametros)
       .subscribe(data=>{
           this.visibleLoad=false;
          if(data["codigo"]=="0" )
          {          
            this.Bitacora =  data['data'];          
            this.enviaAcuseRecibo();          
          }
          else 
          this.variables.muestraBarra(data['mensaje'], "MSG");        
                  }
          );
  }
}

/**************************************************************************************  
*   funcion publica qeu determina si se envia un comentario o una validación de cierre.
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       enviaActualizacion
*  	@param:		    objtxt numero de Queja .
*                 objchk check de validacion por el usuario
*  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

public enviaActualizacion(objtxt , objchk)
{
  this.visibleLoad=true;
  this.actualizaQueja(objtxt.value,objchk.checked ); 
  objtxt.value="";
}


/**************************************************************************************  
*  permite enviar un comentario o una actualización a la queja.
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       escribeComentario
*  	@param:		    evento de que determina que hay un mensaje en el input de mensajes
*  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
  public escribeComentario(evento)
  {
    this.disabled_btnEnviar="false";
  }

 
   
/**************************************************************************************  
*  Envía una actualización de la queja al ws.
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       actualizaQueja
*  	@param:		    evento de que determina que hay un mensaje en el input de mensajes
*  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

   private actualizaQueja(comentario : string, tipoMov : boolean)
   {
     console.log("funcion actualiza queja");
      let movimiento:string ;
      let strXML:string  ;

      //if (tipoMov==true){
         movimiento="RespuestaValidaCierreQueja";
         strXML = this.formaXMLActualizacionValidacion(comentario);
      /*}
      else {
        movimiento = "SolicitudActualizaQueja";
        strXML = this.formaXMLActualizacionBitacora(comentario);
      }*/
      let parametros = new HttpParams()
      .set("mov",movimiento)
      .set("param",strXML);

        this.servhttp.abcQueja(parametros).subscribe(data=>{
   
          if (data["codigoDeRespuesta"] == "10000")
          {
            this.actualizarQueja();
            //this.consultaBitacora();
          }
          else {
            this.variables.muestraBarra("Por el momento no podemos actualizar tus comentarios","ERROR");
          }});
   }

 /*  private actualizaValidacionCte(comentario : string)
   {
      let movimiento:string = "SolicitudActualizaQueja";
      let strXML:string  = this.formaXMLActualizacionBitacora(comentario);

      let parametros = new HttpParams()
      .set("mov",movimiento)
      .set("param",strXML);

        this.servhttp.abcQueja(parametros).subscribe(data=>{
        
          if (data["codigoDeRespuesta"] == "10000")
          {
            this.consultaBitacora();
          }
          else {
            this.variables.muestraBarra("Por el momento no podemos actualizar tus comentarios","ERROR");
          }});
   }
*/

   
/**************************************************************************************  
*  forma el XML para enviar un comentario , esté xml se enviará al ws
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       formaXMLActualizacionBitacora
*  	@param:		    evento de que determina que hay un mensaje en el input de mensajes
*  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

   private formaXMLActualizacionBitacora(comentarios:string)
   {
   
    return "<AseguramientoQuejas>"
          +"<SolicitudAseguramiento>"
          +"<IdentificadorDeQueja>"+this.lblQueja+"</IdentificadorDeQueja>"
          +"<NombreDeUsuarioDeEmpresa>"+this.variables.getUsuario()+"</NombreDeUsuarioDeEmpresa>"
          +"<DescripcionDetalladaDeFalla>00000_ENTER_"+comentarios+"</DescripcionDetalladaDeFalla>"
          +"<EsAcuseDeLeido>ACUSE</EsAcuseDeLeido>"
          +"</SolicitudAseguramiento>"
          +"<DatosControl>"
          +"<IdCorrelacion>"+this.getIDCorre()+"</IdCorrelacion>"
          +"</DatosControl>"
          +"</AseguramientoQuejas>";

   }

   /**************************************************************************************  
*  forma el XML para enviar un comentario , esté xml se enviará al ws para actualizar la qeuja
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       formaXMLActualizacionBitacora
*  	@param:		    evento de que determina que hay un mensaje en el input de mensajes
*  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

   private formaXMLActualizacionValidacion (comentarios:string)
   {
    return "<AseguramientoQuejas>"
    +"<SolicitudAseguramiento>"
    +"<IdentificadorDeQueja>"+this.lblQueja+"</IdentificadorDeQueja>"
    +"<NombreDeUsuarioDeEmpresa>"+ this.variables.getUsuario()+"</NombreDeUsuarioDeEmpresa>"
    +"<DescripcionDetalladaDeFalla>00000_ENTER_"+comentarios+"</DescripcionDetalladaDeFalla>"
    +"<EsAcuseDeLeido>MENSAJE</EsAcuseDeLeido>"
    +"</SolicitudAseguramiento>"
    +"<DatosControl>"
    +"<IdCorrelacion>"+this.getIDCorre()+"</IdCorrelacion>"
    +"</DatosControl>"
    +"</AseguramientoQuejas>";


   }
   /**************************************************************************************  
*  forma un id para enviarlo al WS
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       getIDCorre
*  	@param:		    evento de que determina que hay un mensaje en el input de mensajes
*  
*-------------------------------------------------------------------------------------
*   @return:     IDSEG
*
**************************************************************************************/
   private getIDCorre()
  {
    let d = new Date();
    return 'SEG-' +  this.lblQueja +'-'+d.getTime();
  }

  /**************************************************************************************  
*  limpia los componentes antes de cada consulta
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       limpiarComponente
*  	@param:		    
*  
*-------------------------------------------------------------------------------------
*   @return:     IDSEG
*
**************************************************************************************/
  private limpiarComponente()
  {
    this.Bitacora=null;
    this.lblQueja ="";
    this.problema = "";
    this.FolioConsecionario="";
    this.NIS = "";
    this.FechaReparacion = "";
    this.HorarioAcceso = "";
    this.Prioridad = "";
    this.Estado = "";
    this.disabled_btnEnviar="true";
    this.disabled_btnServicioOK="true"

  }

    /**************************************************************************************  
*  Cierra el formulario del Detalle y ya no es visible al usuario
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       cerrarComponent
*  	@param:		    
*  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
  public cerrarComponent()
  {
    this.limpiarComponente();
    this.cierraComponente.emit();

  }

  public enviaAcuseRecibo()
  {
    if (this.Bitacora != null) {

    this.Bitacora.sort();
    console.log("entro a la funcion acuse de recibo");
    this.Bitacora.forEach(i => {
      if(i.acuse==false /*&& i.tipoActualizacion== "Comunicación concesionario"*/)
      {
        let movimiento:string ;
        let strXML:string  ;
        console.log("*********************ifo");
        console.log(i);
    
          movimiento = "SolicitudActualizaQueja";
          strXML = this.formaXMLAcuseRecibo(i.idregistro);
        
        let parametros = new HttpParams()
        .set("mov",movimiento)
        .set("param",strXML);
  
          this.servhttp.abcQueja(parametros).subscribe(data=>{
     
          });

      }
      
    });
  }

  }

  private formaXMLAcuseRecibo (idAcuse:string)
  {
   return "<AseguramientoQuejas>"
   +"<SolicitudAseguramiento>"
   +"<IdentificadorDeQueja>"+this.lblQueja+"</IdentificadorDeQueja>"
   +"<NombreDeUsuarioDeEmpresa>"+this.variables.getUsuario()+"</NombreDeUsuarioDeEmpresa>"
   +"<DescripcionDetalladaDeFalla>"+idAcuse+"_ENTER_Acuse de recibo_ENTER_</DescripcionDetalladaDeFalla>"
   +"<EsAcuseDeLeido>ACUSE</EsAcuseDeLeido>"
   +"</SolicitudAseguramiento>"
   +"<DatosControl>"
   +"<IdCorrelacion>"+this.getIDCorre()+"</IdCorrelacion>"
   +"</DatosControl>"
   +"</AseguramientoQuejas>";

  }


}
