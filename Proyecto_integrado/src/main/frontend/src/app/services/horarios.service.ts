import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Peluqueria} from "../modelos/peluqueria";
import {Horarios} from "../modelos/horarios";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private apiURL = "http://localhost:8080/horarios/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  constructor( private http: HttpClient ) {}

  getOneByPeluqueria(id:number):Observable<Horarios>{
    return this.http.get<Horarios>(`${this.apiURL}one/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
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
