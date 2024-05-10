import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cliente} from "./modelos/cliente";
import {Cita} from "./modelos/cita";
import {Peluqueria} from "./modelos/peluqueria";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiURL= "http://localhost:8080/citas/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  constructor(private httpClient: HttpClient) { }

  // create(cita: Cita, peluqueria:Peluqueria, cliente: Cliente): Observable<Cita> {
  //
  //   return this.httpClient.post<Cita>(this.apiURL, formData, this.httpOptions);
  // }
}
