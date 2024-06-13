import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Peluqueria} from "../modelos/peluqueria";

@Injectable({
  providedIn: 'root'
})
export class PeluqueriaService {

  private apiURL = "http://83.60.88.29:8080/peluquerias/";

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
