import {Cliente} from "./cliente";
import {Peluqueria} from "./peluqueria";

export interface RequestData {
  cliente:Cliente,
  peluqueria:Peluqueria,
  fecha:string,
  hora:string
}
