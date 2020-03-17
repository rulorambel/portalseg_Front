import { TipoServicio } from './bean-tiposervicio';

export interface RespuestaTipoServicio {
    codigo: String;
    mensaje: String;
    data: TipoServicio[];
}
