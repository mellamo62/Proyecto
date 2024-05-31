import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private perfilSubject = new BehaviorSubject<any>(null);
  perfil$ = this.perfilSubject.asObservable();

  constructor() { }

  actualizarPerfil(perfil: any) {
    this.perfilSubject.next(perfil);
  }
}
