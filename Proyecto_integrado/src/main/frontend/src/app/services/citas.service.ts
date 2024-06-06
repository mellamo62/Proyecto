import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cliente} from "../modelos/cliente";
import {Cita} from "../modelos/cita";
import {Peluqueria} from "../modelos/peluqueria";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiURL= "http://83.60.195.211:8080/citas/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  constructor(private httpClient: HttpClient) { }

  edit(cita:Cita) {
    return this.httpClient.put<Cita>(this.apiURL+cita.id, cita);
  }

  delete(id:number){
    return this.httpClient.delete<Cita>(this.apiURL+id);
  }
}
