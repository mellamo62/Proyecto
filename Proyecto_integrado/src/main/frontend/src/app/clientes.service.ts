import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Cliente} from "./cliente";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiURL= "http://localhost:8080/clientes/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }


  get(id:number):Observable<Cliente>{
    return this.httpClient.get<Cliente>(this.apiURL+id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.apiURL, JSON.stringify(cliente), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
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
