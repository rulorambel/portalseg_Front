import { Bitacora } from './bean-bitacora';

export interface RespuestaBitacora {
    codigo: string;
    mensaje: string;
    data: Bitacora[];
}
