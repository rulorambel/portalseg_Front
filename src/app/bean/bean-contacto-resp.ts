import { Contacto } from './bean-contacto';

export interface RespuestaContacto {
    codigo: string;
    mensaje: string;
    data: Contacto[];
}
