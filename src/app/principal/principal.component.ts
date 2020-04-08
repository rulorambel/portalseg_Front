import { Component , ViewChild} from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { AltaQuejaComponent} from '../alta-queja/alta-queja.component'
import { AltaQuejaCMPComponent } from '../alta-queja-cmp/alta-queja-cmp.component'
import { ConsultaQuejaComponent } from '../consulta-queja/consulta-queja.component';
import { ServicioVarialesGlobalesService} from '../servicio-variales-globales.service';
import { ServicioHttpService } from '../servicio-http.service'; 
import { AltaQuejaInxComponent } from '../alta-queja-inx/alta-queja-inx.component'
import { AltaQuejaAUXComponent } from '../alta-queja-aux/alta-queja-aux.component'


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  @ViewChild(AltaQuejaComponent,{static: false}) alta: AltaQuejaComponent;
  @ViewChild(AltaQuejaCMPComponent,{static: false}) altaCMP: AltaQuejaCMPComponent;
  @ViewChild(ConsultaQuejaComponent,{static: false}) consulta: ConsultaQuejaComponent;
  @ViewChild(AltaQuejaInxComponent,{static: false}) altaInx: AltaQuejaInxComponent;
  @ViewChild(AltaQuejaAUXComponent,{static: false}) altaAUX: AltaQuejaAUXComponent;

  step = 0;
  esvisibleAltaCMP :boolean=false;
  esvisibleAlta :boolean=false;
  esvisibleAltaInx :boolean=false;
  esvisibleAltaAUX :boolean=false;



  constructor(private rutaActiva: ActivatedRoute ,
              private serviciohttp: ServicioHttpService,
              private variables :ServicioVarialesGlobalesService,
              private ruta : Router){
    
    this.variables.setCUC( this.rutaActiva.snapshot.params.cuc);   
    this.variables.setUsuario(this.rutaActiva.snapshot.params.user);
    this.variables.setNombre(this.rutaActiva.snapshot.params.nombre);
    this.variables.setApep(this.rutaActiva.snapshot.params.apep);
    this.variables.setApem(this.rutaActiva.snapshot.params.apem);
    this.variables.setCorreo(this.rutaActiva.snapshot.params.correo);
    this.variables.setTelefono(this.rutaActiva.snapshot.params.telefono);
    this.variables.setCelular(this.rutaActiva.snapshot.params.celular);
    this.variables.setBndAltaIncidente(false);


    const TipoServicio : string = this.rutaActiva.snapshot.params.tserv;

    if  ( TipoServicio !="INX" && TipoServicio!="LE" && TipoServicio !="AUX" && TipoServicio !="CMP" )
    {
      this.ruta.navigateByUrl("portalseg/error");
    }
    else{
      

          this.variables.setTipoServicio ( TipoServicio); 

          if (TipoServicio == "CMP")
            {
              this.esvisibleAltaCMP = true;
              this.esvisibleAlta=false;
              this.esvisibleAltaInx = false;
              this.esvisibleAltaInx = false;
            }
            
            if (TipoServicio == "INX")
            {
              this.esvisibleAltaInx = true;
              this.esvisibleAltaCMP=false;
              this.esvisibleAlta=false;
              this.esvisibleAltaAUX = false;
            }

            if (TipoServicio == "LE")
            {
              this.esvisibleAltaInx = false;
              this.esvisibleAltaCMP=false;
              this.esvisibleAlta=true;
              this.esvisibleAltaInx = false;
            }
            if (TipoServicio == "AUX")
            {
              this.esvisibleAltaCMP = false;
              this.esvisibleAlta=false;
              this.esvisibleAltaInx = false;
              this.esvisibleAltaAUX = true;

            }
            
            
         }
  }

  limpiarComponentes(event)
  {
   this.alta.limpiarPantallaAlta();
   this.variables.setBndAltaIncidente(false);
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() 
  {
    this.step++;
  }

  prevStep()
  {
    this.step--;
  }

  cambiarAAlta(event)
  {
    this.limpiacomponentes();
    this.step === 1;
    this.setStep(1);
    
  }

  cambiarAConsulta(event)
  {  
    this.limpiacomponentes();
    this.step === 2;
    this.setStep(2);
    this.consulta.muestraQuejas();
  }

  siceg11Event(event) 
  {
   console.log("Ingresa al evento");
    this.altaCMP.llenaSICEG11();
  }

private limpiacomponentes()
{
  this.alta.limpiarPantallaAlta();
  this.consulta.limpiaComponente();

}

}
