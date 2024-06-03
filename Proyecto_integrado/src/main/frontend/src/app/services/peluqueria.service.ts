import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Peluqueria} from "../modelos/peluqueria";

@Injectable({
  providedIn: 'root'
})
export class PeluqueriaService {

  private apiURL = "http://192.168.1.40:8080/peluquerias/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  constructor(private httpClient: HttpClient) { }

  create(peluqueria: Peluqueria): Observable<Peluqueria> {
    return this.httpClient.post<Peluqueria>(this.apiURL, JSON.stringify(peluqueria), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

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
