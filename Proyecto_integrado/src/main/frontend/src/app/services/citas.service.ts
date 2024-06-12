import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cliente} from "../modelos/cliente";
import {Cita} from "../modelos/cita";
import {catchError, throwError} from "rxjs";
import {RequestData} from "../modelos/RequestData";

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiURL= "http://localhost:8080/citas/";

  constructor(private httpClient: HttpClient) { }

  createCita(info: RequestData){

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return this.httpClient.post<any>(this.apiURL+"cita", info, {headers})
  }
  getCitas(idCliente:number){
    return this.httpClient.get<Cliente>(this.apiURL+idCliente)
  }

  getCita(idCita:number){
    return this.httpClient.get<Cita>(this.apiURL+idCita);
  }

  getCitasByPeluqueria(id:number){
    return this.httpClient.get<Cita>(`${this.apiURL}peluqueria/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  edit(cita:Cita) {
    return this.httpClient.put<Cita>(this.apiURL+cita.id, cita);
  }

  delete(id:number){
    return this.httpClient.delete<Cita>(this.apiURL+id);
  }

  errorHandler(error: any) {

    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }
}
