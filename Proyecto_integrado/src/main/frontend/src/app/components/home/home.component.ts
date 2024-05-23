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
export class HomeComponent implements OnInit{

  public cliente:any;
  constructor(private router: Router, private clienteService: ClientesService, private coockieService:CookieService) {
    this.clienteService.get(Number.parseInt(this.coockieService.get('usuario')))
      .subscribe((data: Cliente) => {
        this.cliente = data;
        console.log(this.cliente)
      });
  }

  ngOnInit() {
    document.addEventListener('click', function(event) {
      const checkbox = document.getElementById('check') as HTMLInputElement;
      const sidebar = document.getElementById('sidebar') as HTMLInputElement;
      const estiloSidebar = getComputedStyle(sidebar);
      const cilindroAr = document.getElementById('cilindroArriba') as HTMLInputElement;
      const cilindroAb = document.getElementById('cilindroAbajo') as HTMLInputElement;
      const sidebarImage = document.getElementById('imagenPerfil') as HTMLInputElement;
      const target = event.target as Node

      const isClickInside = sidebar.contains(target) || cilindroAb.contains(target) || cilindroAr.contains(target) ;

      if (!isClickInside && estiloSidebar.getPropertyValue('right') == "54.4px" || event.target === sidebarImage) {
        checkbox.checked = false;
      }
    });
  }

  routeSearch(name:string){
    this.router.navigate(['home/peluquerias/nombre/'+name]);
  }


}
