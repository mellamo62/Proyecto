import {Cliente} from "./cliente";
import {Peluqueria} from "./peluqueria";

export interface RequestData {
  cliente:Cliente | null,
  peluqueria:Peluqueria | null,
  fecha:string | null,
  hora:string | null
}
