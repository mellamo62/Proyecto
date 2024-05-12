import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Cliente} from "./modelos/cliente";
import {PeluqueriaService} from "./peluqueria.service";
import {Peluqueria} from "./modelos/peluqueria";
import {RequestData} from "./modelos/RequestData";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiURL= "http://localhost:8080/clientes/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  create(cliente: Cliente) {
    let formData = new FormData();
    formData.append('usuario', cliente.usuario);
    formData.append('nombre', cliente.nombre);
    formData.append('apellidos', cliente.apellidos);
    formData.append('image', cliente.image, cliente.image.name);

    return this.httpClient.post<Cliente>(this.apiURL, formData, this.httpOptions);
  }

  constructor(private httpClient: HttpClient) { }


  get(id:number):Observable<Cliente>{
    return this.httpClient.get<Cliente>(this.apiURL+id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createCita(info: RequestData){

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return this.httpClient.post<any>(this.apiURL+"cita", info, {headers})
  }

  fav(idCliente: number, idPeluqueria:number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return this.httpClient.post<Cliente>(this.apiURL+"fav/"+idCliente+"/"+idPeluqueria, null);
  }

  all(){
    return this.httpClient.get<Cliente[]>(this.apiURL);
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
