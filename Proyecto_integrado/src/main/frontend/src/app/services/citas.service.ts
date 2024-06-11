import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cliente} from "../modelos/cliente";
import {Cita} from "../modelos/cita";

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiURL= "http://localhost:8080/citas/";

  constructor(private httpClient: HttpClient) { }

  getCitas(idCliente:number){
    return this.httpClient.get<Cliente>(this.apiURL+idCliente)
  }

  getCita(idCita:number){
    return this.httpClient.get<Cita>(this.apiURL+idCita);
  }
  edit(cita:Cita) {
    return this.httpClient.put<Cita>(this.apiURL+cita.id, cita);
  }

  delete(id:number){
    return this.httpClient.delete<Cita>(this.apiURL+id);
  }
}
