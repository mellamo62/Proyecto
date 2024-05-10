import {Cliente} from "./cliente";
import {Peluqueria} from "./peluqueria";

export interface Cita{
  id:number,
  cliente: Cliente,
  peluqueria: Peluqueria,
  fecha:Date
}
