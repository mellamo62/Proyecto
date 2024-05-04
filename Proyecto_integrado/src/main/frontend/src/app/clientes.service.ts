import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Cliente} from "./modelos/cliente";

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

  constructor(private httpClient: HttpClient) { }


  get(id:number):Observable<Cliente>{
    return this.httpClient.get<Cliente>(this.apiURL+id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(cliente: Cliente) {
    let formData = new FormData();
    formData.append('usuario', cliente.usuario);
    formData.append('nombre', cliente.nombre);
    formData.append('apellidos', cliente.apellidos);
    formData.append('image', cliente.image, cliente.image.name);

    let headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })

    return this.httpClient.post<Cliente>(this.apiURL, formData, this.httpOptions);
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
