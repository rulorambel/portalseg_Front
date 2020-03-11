
/**************************************************************************************  <
*
*   @Author:		  RuloRamBel
*   @Date:		    11/11/2019
*   @update:      11/11/2019  
*   @Version:      1.0
*   @Class       InterlocutoresSitioComponent
*-------------------------------------------------------------------------------------
*   @Objetivo:    Se encarga de mostrar los interlocutores de una Empresa
*                 Crear un contacto
*                 Modificar un contacto
*                 Seleccionar un contacto para crear una Queja
*
**************************************************************************************/
import { Component, OnInit , ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import {FormControl,  Validators,  FormGroup} from '@angular/forms';
import { HttpParams,} from '@angular/common/http';
import { MatPaginator} from '@angular/material/paginator';
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';

import { ServicioHttpService} from '../servicio-http.service';
import { ServicioVarialesGlobalesService } from '../servicio-variales-globales.service';
import { Contacto } from '../bean/bean-contacto';
import {LoadComponent } from '../carga-lenta/load.component';



@Component({
  selector: 'app-interlocutores-sitio',
  templateUrl: './interlocutores-sitio.component.html',
  styleUrls: ['./interlocutores-sitio.component.css']
})

export class InterlocutoresSitioComponent implements OnInit {

  FormularioContacto:FormGroup;
  displayedColumns: string[] = ['Nombre','Telefono','Correo','Celular'];
  visibleLoad:boolean=false;
  dataSource :any;
  lblEmpresa:string;
  CUCEmpresarial:string;
  strContact:string="";
  strTelefono:string="";
  strCorreo:string="";
  strCelular:string="";
  disbtnMod:boolean=true;
  disbtnCrea:boolean=true;
  Obligatorio:boolean=true;
  
  newContacto: Contacto;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
constructor(  public servhttp : ServicioHttpService , 
              public variables : ServicioVarialesGlobalesService,
              private cargaLenta: MatDialog ) 

              { 
              this.FormularioContacto = this.creaFormGroupContact();

              if(this.variables.getTipoServicio()=="LE" || this.variables.getTipoServicio()=="CMP" || this.variables.getTipoServicio()=="INX")
        {
            this.Obligatorio=true
        
        }
        else if (this.variables.getTipoServicio()=="AUX")
        {
          this.Obligatorio=false
      
      } 
         
        
             }

  ngOnInit() {
  }

  /**************************************************************************************  
*   Ejecuta una consulta de contactos en el WS y muestra el resultado en pantalla
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    buscaContactos
*  	@param:		  paramCuc : Cuc empresarial para realizar la busqueda, 
                paramRazonSocial : razon social relacionada al Cuc
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/

  public buscaContactos(paramCuc, paramRazonSocial )
  {
    console.log("Entra a consulta contactos");
    this.limpiaSeccionInterlocutor();
    this.disbtnCrea=false;  
    this.visibleLoad=true;
 
    this.lblEmpresa =  "Información de la Empresa: "+paramCuc+" - "+ paramRazonSocial;
    
    let parametro:string = "cuc isin {\""+paramCuc+"\"} and tipo= \"Interlocutor\" ";
    
    let parametros = new HttpParams()
     .set("querry",parametro);
        
    this.servhttp.consultaContactos(parametros)
      .subscribe(data=>{
        this.visibleLoad=false;

        if(data[0].mensaje =="Correcto") 
        {
          this.dataSource  =  new MatTableDataSource<Contacto>(data)  ;
          this.dataSource.paginator = this.paginator;
      
        }
        else if (data[0].mensaje=="Error")
        {
          this.variables.muestraBarra("Ocurrio un error interno, por favor intentalo más tarde", "ERROR");
        }else{
           this.variables.muestraBarra(data[0].mensaje, "Msg");
        }

      });
}

   /**************************************************************************************  
*   Permite selecionar un contacto y mostrarlo en un formato editable
*"
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    23/01/2020  
*   @Version:   1.0
*   @Funcion    muestraContacto
*  	@param:		 obj = bean Contacto para mostrarlo en pantalla
*-------------------------------------------------------------------------------------
*   @return:   Se creo arreglo para lo contactos  para que al elegir uno se oculten lo demas
*
**************************************************************************************/
  public muestraContacto(obj)
  {
    console.log (obj);
    this.strContact="";
    this.strTelefono="";
    this.strCorreo="";
    this.strCelular="";
   
    this.strContact=obj["contacto"];
    this.strTelefono=obj["telefono"];
    this.strCorreo = obj["email"];
    this.strCelular = obj["celular"];

    this.FormularioContacto.get("ContSitContacto").setValue(obj["contacto"]);
    this.FormularioContacto.get("ContSitTelefono").setValue(obj["telefono"]);
    this.FormularioContacto.get("ContSitCorreo").setValue(obj["email"]);
    this.FormularioContacto.get("ContSitCelular").setValue(obj["celular"]);

    let contactos: Contacto[];
    contactos =[{
      CUC : obj["CUC"],
      celular  : obj["celular"],
      codigo : obj["codigo"],
      contacto: obj["contacto"],
      email :obj["email"],
      tipo:  "interlocutor",	               
      telefono: "",               
      pais: "",	               
      extension: "",             
      mensaje: ""
  
    }];
    
    this.dataSource  =  new MatTableDataSource<Contacto>(contactos)  ;
          this.dataSource.paginator = this.paginator;
    this.disbtnMod=false;
  }
   /**************************************************************************************  
*   Toma los datos del contacto para su modificacion via WS
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    modificaContacto
*  	@param:	    pContacto: Nombre del contacto 
                ptelefono: Telefono del contacto 
                pcorreo:   Correo del contacto 
                pcelular:  Celular del contacto
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
  public modificaContacto(pContacto:string , ptelefono:string,pcorreo:string,pcelular:string )
  {
    console.log("Entra a modificar el contacto");
    this.disbtnMod=true;
    let dlg = this.abreCarga();
    if(this.FormularioContacto.valid==false)
    {
      this.variables.muestraBarra("Para modificar un contacto es necesario contar con la informacion correcta","Error" );
        return;
      } 
    else{
          this.newContacto = { 
                      tipo: "Interlocutor",
                      telefono:ptelefono,    
                      pais: "MEXICO",           
                      extension: "",	             
                      email: pcorreo,             
                      CUC: this.variables.getCUC() ,            
                      contacto: pContacto.toUpperCase() ,               
                      codigo: "52" ,          
                      celular: pcelular,
                      mensaje:""
                    };

            let parametro:string = "cuc = \""+this.variables.getCUC()+"\" and tipo=\"Interlocutor\" and contacto=\""+this.strContact+"\"";
            let parametros = new HttpParams()
            .set("querry",parametro);

            console.log("querry " + parametro);
            this.servhttp.modificaContacto(this.newContacto,parametros).subscribe(
              data=>{
                dlg.close();
                  if(data.contacto != "ERROR"){
                    this.variables.muestraBarra("Se ha actualizado un contacto. Por favor refresca la tabla de Interlocutores.","mensaje");
                    this.limpiaSeccionInterlocutor();
                } else
                    {
                      this.variables.muestraBarra("En estos momentos no podemos modificar el contacto. Por favor intentalo más tarde.","Error");
                    }
              });
   }
  }

    /**************************************************************************************  
*   Toma los datos del contacto para su creación via WS
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    creaContacto
*  	@param:	    pContacto: Nombre del contacto 
                ptelefono: Telefono del contacto 
                pcorreo:   Correo del contacto 
                pcelular:  Celular del contacto
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
  public creaContacto (pContacto:string , ptelefono:string,pcorreo:string,pcelular:string  )
  {
    console.log("Entra a Crear el contacto");
    this.disbtnMod=true;
    let dlg = this.abreCarga();
    if(this.FormularioContacto.valid==false)
    {
      this.variables.muestraBarra("Para crear un Contacto es necesario contar con la informacion correcta","Error");
        return;
      } 
    else{
         this.newContacto = { tipo: "Interlocutor",
                              telefono:ptelefono,    
                              pais: "MEXICO",           
                              extension: "",	             
                              email: pcorreo,             
                              CUC: this.variables.getCUC() ,            
                              contacto: pContacto.toUpperCase() ,               
                              codigo: "52" ,          
                              celular: pcelular,
                              mensaje :""};
         this.servhttp.creaContacto(this.newContacto).subscribe(
            data=>{
              dlg.close();
                    if(data.contacto != "ERROR"){
                      this.variables.muestraBarra("Se ha creado un contacto.Por favor refresca la tabla de Interlocutores.","Mensaje");
                      this.limpiaSeccionInterlocutor();
                      } else
                          {
                            this.variables.muestraBarra("En estos momentos no podemos crear el Contacto. Por favor intentalo más tarde.","Error");
                          }
            });  
    }
 
  }

 /**************************************************************************************  
*   Crea un Form en la pagina web
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    21/01/2020  
*   @Version:   1.0
*   @Funcion    FormGroup
*  	@param:	    
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
  private creaFormGroupContact()
  {    
    return new FormGroup({
        //ContSitContacto   : new FormControl('',[Validators.required,Validators.pattern(/^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+$/)]),
        ContSitContacto   : new FormControl('',[Validators.required,Validators.pattern(/(\w+)\s(\w+)/)]),
        ContSitTelefono : new FormControl('',[Validators.required,Validators.minLength(10),Validators.pattern('[0-9]{10}')]),
        ContSitCorreo  : new FormControl('', [Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)]),
        ContSitCelular  : new FormControl('',[Validators.required,Validators.minLength(10)]),
        ContSitFiltro : new FormControl('')
      });
  }

/**************************************************************************************  
*   Filtra un contacto del Grid en pantalla
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    filtraContactos
*  	@param:	    
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
  filtraContactos(filtro:string)
  {
    if (this.dataSource===undefined || this.dataSource ===null || this.dataSource == null ){
      return;
    }
    else{
    this.dataSource.filter = filtro.trim();
    }
  }

  
/**************************************************************************************  
*  Limpia la seccion de Interlocutores
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    limpiaSeccionInterlocutor
*  	@param:	    
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
  public limpiaSeccionInterlocutor()
  {
   this.disbtnMod=true;
   this.disbtnCrea=true;      
   this.FormularioContacto.reset();
   this.dataSource=null;
  }


  /**************************************************************************************  
*  No permite escribir letras en el campo de Celular
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    filtraCel
*  	@param:	    pobj objeto HTML del celular
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
  filtraCel(pobj)
  {
    let strvalue:string = pobj.target.value;
    
    if( (pobj.keyCode==8) || ( pobj.keyCode >= 48 && pobj.keyCode <= 57)    ||   (pobj.keyCode>=96  && pobj.keyCode <= 105)    )
    {
        return;
    }else
    {
      this.FormularioContacto.get("ContSitCelular").setValue(strvalue.replace(pobj.key,""));
        
    } 

  }

  /**************************************************************************************  
*  No permite escribir letras en el campo de Telefono
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    filtraCel
*  	@param:	    pobj objeto HTML del Telefono
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
  filtraTelefono(pobj)
  {
    let strvalue:string = pobj.target.value;
    
    if( (pobj.keyCode==8) || ( pobj.keyCode >= 48 && pobj.keyCode <= 57)    ||   (pobj.keyCode>=96  && pobj.keyCode <= 105)    )
    {
        return;
    }else
    {
      this.FormularioContacto.get("ContSitTelefono").setValue(strvalue.replace(pobj.key,""));
        
    } 

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
*  getters de los elementos del formulario
*
*   @Author:		RuloRamBel
*   @Date:		  11/11/2019
*   @update:    11/11/2019  
*   @Version:   1.0
*   @Funcion    ContSitContacto,ContSitTelefono,ContSitCorreo,ContSitCelular,ContSitFiltro
*  	@param:	    pobj objeto HTML del Telefono
*-------------------------------------------------------------------------------------
*   @return:     
*
**************************************************************************************/
  get ContSitContacto(){return this.FormularioContacto.get('ContSitContacto');}
  get ContSitTelefono(){return this.FormularioContacto.get('ContSitTelefono');}
  get ContSitCorreo(){return this.FormularioContacto.get('ContSitCorreo');}
  get ContSitCelular(){return this.FormularioContacto.get('ContSitCelular');}
  get ContSitFiltro (){return this.FormularioContacto.get('ContSitFiltro');}

}