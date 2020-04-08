
/**************************************************************************************  
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Class       ServicioHttpService
*-------------------------------------------------------------------------------------
*   @Objetivo:     Hacer la conexion para los ws que se van a utilizar en la app.
*
**************************************************************************************/
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {ServicioVarialesGlobalesService } from'./servicio-variales-globales.service';
import { Contacto } from './bean/bean-contacto';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse} from '@angular/common/http';
import { BeanABCQueja } from './bean/bean-abcqueja';
import { BeanBuscar } from './bean/bean-comparticion';
import { RespuestaReferencia } from './bean/bean-referencia-resp';
import { RespuestaQueja } from './bean/bean-queja-resp';
import { RespuestaBitacora } from './bean/bean-bitacora-resp';
import { RespuestaTipoServicio } from './bean/bean-tiposervicio-resp';
import { RespuestaContacto } from './bean/bean-contacto-resp';
import { RespuestaInterconeccion } from './bean/bean-interconeccion-resp';
import { RespuestaBeanCatCaoNIR } from './bean/bean-ciudad-resp';
import { RespuestaBeanCatCaoCentralEqp } from './bean/bean-central-resp';
import { RespuestaBeanCatCaoOpcDpcIp } from './bean/bean-ip-resp';

@Injectable({
  providedIn: 'root'
})
export class ServicioHttpService {

  reenvio: number =3; // número de reenvios que se intentará conectar a los ws

  constructor(private http : HttpClient , private variables : ServicioVarialesGlobalesService ) { 

  }

/**************************************************************************************  
*    Obtiene los nemonicos correspondientes al Tipo de Servicio.
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Funcion       consultaServicios
*  	@param:		    parametros.
*  
*-------------------------------------------------------------------------------------
*   @return:      regresa los nemonicos válidos de acuerdo al tipo de servicio.
*
**************************************************************************************/
  consultaServicios(  parametros:HttpParams)
  {
   const httpOptions = new HttpHeaders()
   .set('Content-Type', 'application/json')
   .set('Accept', 'application/json')

   return  this.http.get<RespuestaTipoServicio>("/ServiceSeg/subtiposervicio",{headers: httpOptions, params:parametros})
          .pipe (retry(this.reenvio) , catchError(this.handleError)) ;   
  }

/**************************************************************************************  
*    Obtiene la información de las referencias que el usuario introduce en la lista de servicios.
*
*   @Author:		  RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:     1.0
*   @Funcion      consultaReferencias
*  	@param:		    parametros.
*  
*-------------------------------------------------------------------------------------
*   @return:      Set de datos de las referencias buscadas en el WS.
*
**************************************************************************************/
  consultaReferencias(  parametros:HttpParams)
  {
    
   const httpOptions = new HttpHeaders()
   .set('Content-Type', 'application/json')
   .set('Accept', 'application/json')
   
    return  this.http.get<RespuestaReferencia>("/IfaceSeg2/referencia",{headers: httpOptions, params:parametros})
   //return this.http.get<Referencia[]>("/MSServicio/webapi/servicioprueba",{headers: httpOptions, params:parametros})      
   .pipe (retry(this.reenvio) , catchError(this.handleError)) ;
   
  }

  /**************************************************************************************  
*    Obtiene la información de las queja correspondiente a la referencia seleccionada en la lista de servicios.
*    Obtiene la información de las quejas que el usuario introduce en lnoa busqueda de quejas.
*
*   @Author:		  RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:     1.0
*   @Funcion      consultaQueja
*  	@param:		    paremetros querry de busqueda en el ws.
*  
*-------------------------------------------------------------------------------------
*   @return:      Arreglo con la información de la queja o quejas que se consultan en el ws
*
**************************************************************************************/

  consultaQueja(parametros:HttpParams)
{
  const httpOptions = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  return  this.http.get<RespuestaQueja>("/IfaceSeg2/consultaqueja",{headers: httpOptions, params:parametros} )
          .pipe (retry(this.reenvio) , catchError(this.handleError)) ;
}

abcQueja(  parametros:HttpParams)
{
 const httpOptions = new HttpHeaders()
 .set('Content-Type', 'application/json')
 .set('Accept', 'application/json')

 return  this.http.get<BeanABCQueja[]>("/IfaceSeg2/abcquejas",{headers: httpOptions, params:parametros} )
        .pipe (retry(this.reenvio) , catchError(this.handleError)) ;
 
}
/**************************************************************************************  
*    Atrapa errores al tratar de conectarse a un ws y envía un mensaje a la consola del navegador.
*
*   @Author:	  	RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:     1.0
*   @Funcion       consultaBitacora
*  	@param:		    Parametros Querry de busqueda de bitacora.
*  
*-------------------------------------------------------------------------------------
*   @return:      Arreglo con la bitacora consultada vía WS
*
**************************************************************************************/

consultaBitacora(parametros:HttpParams)
{
  const httpOptions = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')

  return  this.http.get<RespuestaBitacora>("/IfaceSeg2/bitacora",{headers: httpOptions, params:parametros} )
          .pipe (retry(this.reenvio) , catchError(this.handleError)) ;
}

/**************************************************************************************  
*   Consulta los contactos al ws
*
*   @Author:		RuloRamBel
*   @Date:		   11/11/2019
*   @update:     11/11/2019  
*   @Version:    1.0
*   @Funcion     consultaContactos
*  	@param:		   Parametros Querry de busqueda de contactos.
*  
*-------------------------------------------------------------------------------------
*   @return:      Arreglo con contactos consultada vía WS
*
**************************************************************************************/
consultaContactos(parametros:HttpParams)
{
  console.log("entrada a consulta contactos");
  const httpOptions = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  return  this.http.get<RespuestaContacto>("/IfaceSeg2/contacto",{headers: httpOptions, params:parametros} )
          .pipe (retry(this.reenvio) , catchError(this.handleError)) ;

}

/**************************************************************************************  
*   Crea un contacto en la base de datos vía el ws
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:     1.0
*   @Funcion      creaContacto
*  	@param:		    Parametros Querry de busqueda de contactos.
*  
*-------------------------------------------------------------------------------------
*   @return:      Arreglo con el contacto creado
*
**************************************************************************************/

creaContacto(parametros:Contacto)
{
  console.log("entrada a CREAR contactos");
  const httpOptions = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
    
  return this.http.post<Contacto>("/IfaceSeg2/contacto",parametros,{headers: httpOptions} )
  .pipe (retry(this.reenvio) , catchError(this.handleError)) ;

}

/**************************************************************************************  
*   Modifica un contacto en la base de datos vía el ws
*
*   @Author:		RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:     1.0
*   @Funcion      modificaContacto
*  	@param:		    Parametros Querry de busqueda de contactos.
*  
*-------------------------------------------------------------------------------------
*   @return:      Arreglo con el contacto creado
*
**************************************************************************************/
modificaContacto(contacto:Contacto, parametros:HttpParams)
{
  const httpOptions = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
    console.log(contacto);
  return this.http.patch<Contacto>("/IfaceSeg2/contacto" ,contacto,{headers: httpOptions, params:parametros} )
        .pipe (retry(this.reenvio) , catchError(this.handleError));
}
/**************************************************************************************  
*   Crea una Queja en la base de datos vía el ws
*
*   @Author:		 RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:     1.0
*   @Funcion      creaQueja
*  	@param:		    Parametros Querry de busqueda de contactos.
*  
*-------------------------------------------------------------------------------------
*   @return:      Arreglo con el contacto creado
*
**************************************************************************************/
creaQueja(  parametros:HttpParams)
{
 const httpOptions = new HttpHeaders()
 .set('Content-Type', 'application/json')
 .set('Accept', 'application/json')

 return  this.http.get<BeanABCQueja[]>("/IfaceSeg2/abcquejas",{headers: httpOptions, params:parametros} )
        .pipe (retry(this.reenvio) , catchError(this.handleError)) ;
 
}

  /**************************************************************************************  
*    Atrapa errores al tratar de conectarse a un ws y envía un mensaje a la consola del navegador.
*
*   @Author:	  	RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:     1.0
*   @Funcion      handleError
*  	@param:		    HttpErrorResponse.
*  
*-------------------------------------------------------------------------------------
*   @return:      
*
**************************************************************************************/
  private handleError(error: HttpErrorResponse) {
  
  
    if (error.error instanceof ErrorEvent) {
      console.error('ERROR: ', error.error.message);
    } else {
     
      console.error( error.status+ ":" +error.error);
    }
    
    return throwError('Por el momento no podemos atender tu solicitud. Por favor intentalo más tarde');
  }


mostrarError()
{
 console.log("valiendo vergas")

}
/**************************************************************************************  
*    Obtiene la información de las interconecciones que el usuario introduce en la lista de servicios.
*
*   @Author:		 RuloRamBel
*   @Date:		    27/12/2019
*   @update:      27/12/2019  
*   @Version:     1.0
*   @Funcion      consultaInterconeccion
*  	@param:		    parametros.
*  
*-------------------------------------------------------------------------------------
*   @return:      Set de datos de las referencias buscadas en el WS.
*
**************************************************************************************/
consultaInterconeccion(  parametros:HttpParams)
{
 const httpOptions = new HttpHeaders()
 .set('Content-Type', 'application/json')
 .set('Accept', 'application/json')
 
  return  this.http.get<RespuestaInterconeccion>("/IfaceSeg2/sidecci",{headers: httpOptions, params:parametros})
 .pipe (retry(this.reenvio) , catchError(this.handleError)) ;
 
}

/**************************************************************************************  
*    Obtiene la información de la Ciudad buscadas en WS
*
*   @Author:		  Anahi Flores
*   @Date:		    17/12/2019
*   @update:      17/12/2019  
*   @Version:     1.0
*   @Funcion      consultaCiudad
*  	@param:		    parametros.
*  
*-------------------------------------------------------------------------------------
*   @return:      Set de datos de las Ciudad buscadas en el WS.
*
**************************************************************************************/
consultaCiudad(parametros:HttpParams)
{
  const httpOptions = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  return  this.http.get<RespuestaBeanCatCaoNIR>("/IfaceSeg2/ciudad",{headers: httpOptions, params:parametros} )
          .pipe (retry(this.reenvio) , catchError(this.handleError)) ;

}
/**************************************************************************************  
*    Obtiene la información de la Central buscadas en WS
*
*   @Author:		  Anahi Flores
*   @Date:		    17/12/2019
*   @update:      17/12/2019  
*   @Version:     1.0
*   @Funcion      consultaCentral
*  	@param:		    parametros.
*  
*-------------------------------------------------------------------------------------
*   @return:      Set de datos de las Centrales buscadas en el WS.
*
**************************************************************************************/
consultaCentral(parametros:HttpParams)
{
  const httpOptions = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  return  this.http.get<RespuestaBeanCatCaoCentralEqp>("/IfaceSeg2/central",{headers: httpOptions, params:parametros} )
          .pipe (retry(this.reenvio) , catchError(this.handleError)) ;

}

/**************************************************************************************  
*    Obtiene la información del Operador mediante IP Origen buscadas en WS
*
*   @Author:		  Anahi Flores
*   @Date:		    17/12/2019
*   @update:      17/12/2019  
*   @Version:     1.0
*   @Funcion      consultaOperador
*  	@param:		    parametros.
*  
*-------------------------------------------------------------------------------------
*   @return:      Set de datos de los Operadores buscadas en el WS.
*
**************************************************************************************/
consultaOperador(parametros:HttpParams)
{
  const httpOptions = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  return  this.http.get<RespuestaBeanCatCaoOpcDpcIp>("/IfaceSeg2/ips",{headers: httpOptions, params:parametros} )
          .pipe (retry(this.reenvio) , catchError(this.handleError)) ;

}

/**************************************************************************************  
*    Obtiene la información de SICEG11 buscadas mediante los datos de comparticiónen WS
*
*   @Author:		  Anahi Flores
*   @Date:		    25/02/2019
*   @update:      25/02/2019  
*   @Version:     1.0
*   @Funcion      consultaSICEG11
*  	@param:		    parametros.
*  
*-------------------------------------------------------------------------------------
*   @return:      Set de datos de los Operadores buscadas en el WS.
*
**************************************************************************************/
consultaSICEG11(parametros:HttpParams)
{
  const httpOptions = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  return  this.http.get<BeanBuscar>("/IfaceSeg2/consultaElemento",{headers: httpOptions, params:parametros} )
          .pipe (retry(this.reenvio) , catchError(this.handleError)) ;

}
}
