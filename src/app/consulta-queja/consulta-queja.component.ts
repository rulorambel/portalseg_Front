
/**************************************************************************************  <
*
*   @Author:		  RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Class       ConsultaQuejaComponent
*-------------------------------------------------------------------------------------
*   @Objetivo:    Se encarga mostrar las quejas abiertas de una referencia selecionada 
* en la lista de Servicios o de las que el usuario quiera consultar
*
**************************************************************************************/
import { Component,ViewChild } from '@angular/core';
import { Queja } from '../bean/bean-queja';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { HttpParams} from '@angular/common/http';
import { ServicioHttpService } from '../servicio-http.service';
import { ServicioVarialesGlobalesService } from '../servicio-variales-globales.service';
import {DetalleQuejaComponent} from '../detalle-queja/detalle-queja.component'


@Component({
  selector: 'app-consulta-queja',
  templateUrl: './consulta-queja.component.html',
  styleUrls: ['./consulta-queja.component.css']
})


export class ConsultaQuejaComponent {
  displayedColumns: string[] = ['ID','Estado','Asignado','Fecha', 'callback.type'];
  dataSource: any ;
  Mensaje : string;
  esvisibleDetalle :boolean=false;
  visibleLoad :boolean=false;

  @ViewChild(DetalleQuejaComponent,{static: false}) detallequeja: DetalleQuejaComponent;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private servhttp : ServicioHttpService,
              private variables :ServicioVarialesGlobalesService) {
          //      this.esvisibleDetalle=true;
              }


/**************************************************************************************  
*   construye el querry para enviarlo como consulta al WS y mostrar el resultado en pantalla
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       consultaQueja
*  	@param:		      
*-------------------------------------------------------------------------------------
*   @return:      .
*
**************************************************************************************/

consultaQueja(queja)
{ 

  this.limpiaComponente();
  this.visibleLoad=true;
  let parametro:string = this.armaStrQuerry(queja);


  
  let parametros = new HttpParams()
     .set("querry",parametro);
 
    this.servhttp.consultaQueja(parametros)
       .subscribe(data=>{
        this.visibleLoad=false;
        if(data["codigo"]=="0" )
                           {
                             
                             this.dataSource  =  new MatTableDataSource<Queja>(data['data']) ;
                             this.dataSource.paginator = this.paginator;
                           }
                        else{
                             this.variables.muestraBarra("No encontramos información en nuestra lista de quejas","MENSAJE");
                            }

      });
}

/**************************************************************************************  
*   construye el querry para enviarlo como consulta al WS 
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       armaStrQuerry
*  	@param:		      
*-------------------------------------------------------------------------------------
*   @return:      .
*
**************************************************************************************/


private armaStrQuerry(strQuejas)
{
  let querry:string ="";
    
  if (strQuejas==="" || strQuejas ===undefined)
     querry="tmx.sd.tipo.servicio isin {"+ this.regresaServiciosValidos() + 
            "} and tmx.sd.cuc=\""+this.variables.getCUC()+"\" and open<>\"Cerrada\" and callback.type isin {\"SIPO\",\"SEG\"}";
  else
    querry="incident.id isin {\""+strQuejas +"\"} and tmx.sd.tipo.servicio isin {"+ this.regresaServiciosValidos() 
            + "} and tmx.sd.cuc=\""+this.variables.getCUC()+"\" and open<>\"Cerrada\" and callback.type isin {\"SIPO\",\"SEG\"}";

  return querry;

}

/**************************************************************************************  
*   De acuerdo al tipo de servicio determina que tipos de servicios son validos
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       regresaServiciosValidos
*  	@param:		      
*-------------------------------------------------------------------------------------
*   @return:      string con los tipos de sevicios con los que se consultarán las quejas.
*
**************************************************************************************/
private regresaServiciosValidos()
{
  let servicio : string="";

  switch (this.variables.getTipoServicio())
   {
    case 'LE':
      servicio = "\"ENLACE DEDICADO\"";
    break;
    case 'INX':
      servicio = "\"INTERCONEXION\", \"PORTABILIDAD\", , \"TRAFICO\"";
    break;
    case 'AUX':
      servicio = "\"DESAGREGACION\",\"SOPORTE UNINET\"";
    break;
    case 'CMP':
      servicio = "\"COUBICACION\",\"COMPARTICION\",\"SOPORTE UNINET\"";
    break;
  }

  return servicio;
}
/**************************************************************************************  
*   limpia el campo consulta
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       limpiaQueja
*  	@param:		      input del campo consulta.
*-------------------------------------------------------------------------------------
*   @return:      
*
**************************************************************************************/

limpiaQueja(queja)
  {
    queja.value="";   
  }


/**************************************************************************************  
*  limpia el grid de Quejas .
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       limpiaComponente
*  	@param:		   
*-------------------------------------------------------------------------------------
*   @return:      
*
**************************************************************************************/
  limpiaComponente()
  {
    this.esvisibleDetalle=false;
    this.dataSource=null;
    this.Mensaje="";
  }

  /**************************************************************************************  
*  Envía la queja seleccionada para mostrar su detalle.
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       selecionDato
*  	@param:		   
*-------------------------------------------------------------------------------------
*   @return:      
*
**************************************************************************************/
  
  selecionDato(dato)
  {
    this.variables.setQuejaSeleccionada(dato);
   this.esvisibleDetalle=true;
   this.detallequeja.muestraDetalle();
  }

    /**************************************************************************************  
*  recibe una queja de la lista de servicios para mostrarla en pantalla
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       selecionDato
*  	@param:		   
*-------------------------------------------------------------------------------------
*   @return:      
*
**************************************************************************************/
   muestraQuejas()
  {
  
    let quejas:Queja[];
    let queja : Queja;
    queja = this.variables.getQuejaSeleccionada();

   quejas = [{	
     
    IDqueja:queja.IDqueja,
    NIS:queja.NIS,
    asignado:queja.asignado,
    estadoGlobal:queja.estadoGlobal,
    fechaHorareparacion:queja.fechaHorareparacion,
    folioConcesionario: queja.folioConcesionario,
    horarioAcceso: queja.horarioAcceso,
    idIncidente:queja.idIncidente,
    mensaje: queja.mensaje,
    prioridad:  queja.prioridad,
    problemaReportado: queja.problemaReportado,
    referencia:queja.referencia,
    validacionCliente: queja.validacionCliente,  
    notificadoPor: queja.notificadoPor

  }]; 
    
    
    this.dataSource =  new MatTableDataSource<Queja>(quejas)   ;
    this.dataSource.paginator = this.paginator;
    this.Mensaje= "El elemento " + this.variables.getReferenciaSelecionada() +" tiene un Incidente en Proceso";
  }



  public cierraDetalle(event)
  {
    this.esvisibleDetalle=false;
  }
}
