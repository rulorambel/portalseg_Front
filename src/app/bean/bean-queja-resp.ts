import { Queja } from './bean-queja';

export interface RespuestaQueja {
	codigo: String;
	mensaje: String;
	data: Queja[];
}
