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
  private Destino  :string;
  private CentralOrigen  :string;
  private CentralDestino :string;
  private IpOrigen :string;
  private IpDestino :string;
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
  private BndAlta: boolean;
  private BndAltaIncidente: boolean;
  private OperadorOrigen: string;
  private OperadorDestino: string;
  private CiudadOrigen: string;
  private CiudadDestino: string;

  
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
    return typeof this.ReferenciaSelecionada == 'undefined' ? '' : this.ReferenciaSelecionada;
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
*   @update:    13/03/2020
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
  return typeof this.Origen == 'undefined' ? '' : this.Origen;
}

public setDestino(pDestino:string)
{
  this.Destino = pDestino;
}
public getDestino()
{
  return typeof this.Destino == 'undefined' ? '' : this.Destino;
}

public setCentralOrigen(pCentralOrigen:string)
{
  this.CentralOrigen = pCentralOrigen;
}
public getCentralOrigen()
{
  return typeof this.CentralOrigen == 'undefined' ? '' : this.CentralOrigen;
}

public setCentralDestino(pCentralDestino:string)
{
  this.CentralDestino = pCentralDestino;
}
public getCentralDestino()
{
  return typeof this.CentralDestino == 'undefined' ? '' : this.CentralDestino;
}

public setIpOrigen(pIpOrigen:string)
{
  this.IpOrigen = pIpOrigen;
}
public getIpOrigen()
{
  return typeof this.IpOrigen == 'undefined' ? '' : this.IpOrigen;
}

public setIpDestino(pIpDestino:string)
{
  this.IpDestino = pIpDestino;
}
public getIpDestino()
{
  return typeof this.IpDestino == 'undefined' ? '' : this.IpDestino;
}

public setIDO(pIDO:string)
{
  this.IDO = pIDO;
}
public getIDO()
{
  return typeof this.IDO == 'undefined' ? '' : this.IDO;
}

public setIDD(pIDD:string)
{
  this.IDD = pIDD;
}
public getIDD()
{
  return typeof this.IDD == 'undefined' ? '' : this.IDD;
}

public setDigitos(pDigitos:string)
{
  this.Digitos = pDigitos;
}
public getDigitos()
{
  return typeof this.Digitos == 'undefined' ? '' : this.Digitos;
}


public setPortID(pPortID:string)
{
  this.PortID = pPortID;
}
public getPortID()
{
  return typeof this.PortID == 'undefined' ? '' : this.PortID;
}

public setOperadorOrigen(pOperadorOrigen:string)
{
  this.OperadorOrigen = pOperadorOrigen;
}
public getOperadorOrigen()
{
  return typeof this.OperadorOrigen == 'undefined' ? '' : this.OperadorOrigen;
}

public setOperadorDestino(pOperadorDestino:string)
{
  this.OperadorDestino = pOperadorDestino;
}
public getOperadorDestino()
{
  return typeof this.OperadorDestino == 'undefined' ? '' : this.OperadorDestino;
}

public setCiudadOrigen(pCiudadOrigen:string)
{
  this.CiudadOrigen = pCiudadOrigen;
}
public getCiudadOrigen()
{
  return typeof this.CiudadOrigen == 'undefined' ? '' : this.CiudadOrigen;
}

public setCiudadDestino(pCiudadDestino:string)
{
  this.CiudadDestino = pCiudadDestino;
}
public getCiudadDestino()
{
  return typeof this.CiudadDestino == 'undefined' ? '' : this.CiudadDestino;
}

public setCIC(pCIC:string)
{
  this.CIC = pCIC;
}
public getCIC()
{
  return typeof this.CIC == 'undefined' ? '' : this.CIC;
}
/**************************************************************************************  
*   Variables para Tipo de Servicio Compartición
*
*   @Author:		Anahi Flores
*   @Date:		  17/02/2020
*   @update:    13/03/2020
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
 
  return typeof this.IdNis == 'undefined' ? '' : this.IdNis;
}

public setGeoLatitud(pGeoLatitud:string)
{
  this.GeoLatitud = pGeoLatitud;
}
public getGeoLatitud()
{
  return typeof this.GeoLatitud == 'undefined' ? '' : this.GeoLatitud;
}

public setTipoElemento(pTipoElemento:string)
{
  this.TipoElemento = pTipoElemento;
}
public getTipoElemento()
{
  return typeof this.TipoElemento == 'undefined' ? '' : this.TipoElemento;
}

public setGeoLongitud(pGeoLongitud:string)
{
  this.GeoLongitud = pGeoLongitud;
}
public getGeoLongitud()
{
  return typeof this.GeoLongitud == 'undefined' ? '' : this.GeoLongitud;
}

public setIdElemento(pIdElemento:string)
{
  this.IdElemento  = pIdElemento;
}
public getIdElemento ()
{
  return typeof this.IdElemento == 'undefined' ? '' : this.IdElemento;
}

  public setBndAlta(pAlta:boolean) {
    this.BndAlta = pAlta;
  }

  public getBndAlta(){
    return this.BndAlta;
  }

  /**************************************************************************************  
*   Permite unicamente digitos
*
*   @Author:		Anahi Flores
*   @Date:		  31/03/2020
*   @update:    31/03/2020 
*   @Version:   1.0
*   @Funcion    numberOnly
*  	@param:		  
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

public numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  console.log(charCode);
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}


public setBndAltaIncidente(pAlta:boolean) {
  this.BndAltaIncidente = pAlta;
}

public getBndAltaIncidente(){
  return this.BndAltaIncidente;
}
}

