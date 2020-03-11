export interface Bitacora {

    IDEvento    : string;
    IDExterno   : string;
    idregistro  : string	;
    acuse       : boolean;
    comentario  : string[];
    fase        : string	;
    fecha       : Date	;
    fechaAcuse  : Date	;
    grupo       : string;
    mensaje     : string;
    nombre      : string;
    tipoActualizacion: string;
    usuario     : string;
    usuarioAcuse: string;


}
