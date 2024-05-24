import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  constructor(private router: Router) {
  }

  LogIn(){
    let contenedor = document.getElementById('contenedor') as HTMLElement;

    contenedor.classList.add('salida');

    setTimeout(()=>{
      this.router.navigate(['/login']);
    }, 700)
  }

}
