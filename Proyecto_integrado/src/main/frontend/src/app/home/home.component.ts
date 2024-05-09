import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {PeluqueriaService} from "../peluqueria.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private router: Router,
              private service: PeluqueriaService) {
  }

  ngOnInit() {
    // let peluqueria = {
    //   idPeluqueria:6,
    //   nombre: "alonso",
    //   descripcion:"alonso rules",
    //   direccion:"direccion",
    //   urlImagen:"https://lh5.googleusercontent.com/p/AF1QipPvFsDxYIt7OeywZE1sglChJtm6S4meCkWxMQAc=w426-h240-k-no",
    //   urlImagen2:"https://lh5.googleusercontent.com/p/AF1QipPvFsDxYIt7OeywZE1sglChJtm6S4meCkWxMQAc=w426-h240-k-no"
    // }
    // this.service.create(peluqueria);
  }

  routeSearch(name:string){
    this.router.navigate(['peluquerias/nombre/'+name]);
  }
}
