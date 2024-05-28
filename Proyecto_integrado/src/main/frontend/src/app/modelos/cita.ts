import {Cliente} from "./cliente";
import {Peluqueria} from "./peluqueria";

export interface Cita{
  id:number | undefined,
  cliente: Cliente | null,
  peluqueria: Peluqueria | null,
  fecha:Date,
  hora:string
}
