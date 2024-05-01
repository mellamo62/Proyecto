import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Peluqueria} from "./peluqueria";

@Injectable({
  providedIn: 'root'
})
export class PeluqueriaService {

  private apiURL = "http://localhost:8080/peluquerias/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Peluqueria[]> {
    return this.httpClient.get<Peluqueria[]>(this.apiURL)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: number): Observable<Peluqueria> {
    return this.httpClient.get<Peluqueria>(this.apiURL + id)
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
