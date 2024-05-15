import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {Cliente} from "../../modelos/cliente";
import {ClientesService} from "../../services/clientes.service";
import {CookieService} from "ngx-cookie-service";

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
export class HomeComponent{

  public cliente:any;
  constructor(private router: Router, private clienteService: ClientesService, private coockieService:CookieService) {
    this.clienteService.get(Number.parseInt(this.coockieService.get('usuario')))
      .subscribe((data: Cliente) => {
        this.cliente = data;
        console.log(this.cliente)
      });
  }

  routeSearch(name:string){
    this.router.navigate(['home/peluquerias/nombre/'+name]);
  }
}
