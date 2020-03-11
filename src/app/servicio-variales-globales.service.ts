import { Injectable } from '@angular/core';
import {TipoServicio} from './bean/bean-tiposervicio';
import { Queja } from './bean/bean-queja';
import { Empresa } from './bean/bean-empresa';
import { MatSnackBar  } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})

export class ServicioVarialesGlobalesService {

  private QuejaSelecionada : Queja;
  private EmpresasSelecionadas :Empresa[];
  private ReferenciaSelecionada:string;
  private CUC : string;
  private TipoServicio :string;
  private Usuario:string;
  private TipoFalla :string;
  private Correo :string;
  private Telefono :string;
  private Nombre  :string;
  private Apep  :string;
  private Apem  :string;
  private Celular  :string;
  private Origen  :string;
  private Destino  :string
  private ipOrigen :string;
  private ipDestino :string;
  private IDO :string;
  private IDD :string;
  private Digitos :string;
  private PortID :string;
  private CIC :string;
  private IdNis  :string
  private GeoLatitud :string    
  private GeoLongitud  :string  
  private IdElemento :string
  private TipoElemento :string


  constructor( private snack : MatSnackBar ) { }

  public setEmpresasSelecionadas(data : Empresa[] )
  {
    this.EmpresasSelecionadas = data;
  }

  public setTipoServicio(pTipoServicio:string)
  {
    this.TipoServicio = pTipoServicio;
  }
  
  public setQuejaSeleccionada (data:Queja)
  {
    this.QuejaSelecionada= data;
  }

  public setReferenciaSelecionada (pReferencia)
  {
      this.ReferenciaSelecionada= pReferencia;
  }

  public getReferenciaSelecionada ()
  {
      return this.ReferenciaSelecionada;
  }

  public getQuejaSeleccionada ()
  {
   return this.QuejaSelecionada;

  }

  public getTipoServicio()
  {
    return this.TipoServicio;
  }
  public getEmpresasSelecionadas()
  {
    return this.EmpresasSelecionadas ;
  }

  public getTipoFalla()
  {
    return this.TipoFalla;
  }

  public muestraBarra(mensaje:string,tipo:string )
{  
  if (tipo=="Error" || tipo=="ERROR" || tipo=="Error") 
  {
    this.snack.open(mensaje,'',{duration:6000,verticalPosition:"bottom" , panelClass:['red-snackbar']   });
  }else
  {
    this.snack.open(mensaje,'',{duration:6000,verticalPosition:'top' , panelClass:  ['blue-snackbar'] });
  }
}
/**************************************************************************************  
*   Variables para url de SEG
*
*   @Author:		RuloRamBel
*   @Date:		  14/01/2020
*   @update:    14/01/2020 
*   @Version:   1.0
*   @Funcion    formaXML
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
public setUsuario(pUsuario : string)
{
  this.Usuario = pUsuario;
}

public getUsuario()
{
return this.Usuario
}

public setCorreo(pCorreo : string)
{
  this.Correo = pCorreo;
}

public getCorreo()
{
return this.Correo
}

public setTelefono(pTelefono : string)
{
this.Telefono = pTelefono;
}

public getTelefono()
{
return this.Telefono
}

public setCelular(pCelular : string)
{
this.Celular = pCelular;
}

public getCelular()
{
return this.Celular
}

public setNombre(pNombre : string)
{
this.Nombre = pNombre;
}
public getNombre()
{
return this.Nombre ;
}

public setApep(pApep:string)
{
  this.Apep = pApep;
}
public getApep()
{
  return this.Apep ;
}

public setApem(pApem:string)
{
  this.Apem = pApem;
}
public getApem()
{
  return this.Apem ;
}

public setCUC(pCUC:string)
{
  this.CUC = pCUC;
}
public getCUC()
{
  return this.CUC ;
}

/**************************************************************************************  
*   Variables para Tipo de Servicio Interconexión
*
*   @Author:		Anahi Flores
*   @Date:		  17/01/2020
*   @update:    17/01/2020
*   @Version:   1.0
* 
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

public setOrigen(pOrigen:string)
{
  this.Origen = pOrigen;
}
public getOrigen()
{
  return this.Origen;
}

public setDestino(pDestino:string)
{
  this.Destino = pDestino;
}
public getDestino()
{
  return this.Destino ;
}

public setipOrigen(pipOrigen:string)
{
  this.ipOrigen = pipOrigen;
}
public getipOrigen()
{
  return this.ipOrigen ;
}

public setipDestino(pipDestino:string)
{
  this.ipDestino = pipDestino;
}
public getipDestino()
{
  return this.ipDestino ;
}

public setIDO(pIDO:string)
{
  this.IDO = pIDO;
}
public getIDO()
{
  return this.IDO;
}

public setIDD(pIDD:string)
{
  this.IDD = pIDD;
}
public getIDD()
{
  return this.IDD;
}

public setDigitos(pDigitos:string)
{
  this.Digitos = pDigitos;
}
public getDigitos()
{
  return this.Digitos;
}


public setPortID(pPortID:string)
{
  this.PortID = pPortID;
}
public getPortID()
{
  return this.PortID;
}


public setCIC(pCIC:string)
{
  this.CIC = pCIC;
}
public getCIC()
{
  return this.CIC;
}
/**************************************************************************************  
*   Variables para Tipo de Servicio Compartición
*
*   @Author:		Anahi Flores
*   @Date:		  17/02/2020
*   @update:    17/02/2020
*   @Version:   1.0
* 
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

public setIdNis(pIdNis:string)
{
  this.IdNis = pIdNis;
}
public getIdNis()
{
  return this.IdNis;
}

public setGeoLatitud(pGeoLatitud:string)
{
  this.GeoLatitud = pGeoLatitud;
}
public getGeoLatitud()
{
  return this.GeoLatitud;
}

public setTipoElemento(pTipoElemento:string)
{
  this.TipoElemento = pTipoElemento;
}
public getTipoElemento()
{
  return this.TipoElemento;
}

public setGeoLongitud(pGeoLongitud:string)
{
  this.GeoLongitud = pGeoLongitud;
}
public getGeoLongitud()
{
  return this.GeoLongitud;
}

public setIdElemento(pIdElemento:string)
{
  this.IdElemento  = pIdElemento;
}
public getIdElemento ()
{
  return this.IdElemento;
}
}
