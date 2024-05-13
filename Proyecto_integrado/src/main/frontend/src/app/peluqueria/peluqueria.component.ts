import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PeluqueriaService} from "../peluqueria.service";
import {Peluqueria} from "../modelos/peluqueria";
import {CommonModule} from "@angular/common";
import {ClientesService} from "../clientes.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-peluqueria',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './peluqueria.component.html',
  styleUrl: './peluqueria.component.css'
})
export class PeluqueriaComponent implements OnInit{

  idPeluqueria:number =0;
  public peluqueria:Peluqueria;
  showTooltip: boolean = false;
  icono: any;

  constructor(
    private route:ActivatedRoute,
    private peluqueriaService: PeluqueriaService,
    private clienteService: ClientesService,
    private coockieService: CookieService) {
    this.peluqueria = {idPeluqueria: 1,nombre:"",descripcion:"",direccion:"",urlImagen:"",urlImagen2: ""};

  }

  ngOnInit() {
    this.idPeluqueria = this.route.snapshot.params['id'];
    this.peluqueriaService.find(this.idPeluqueria).subscribe(res => {
      this.peluqueria = res;
      console.log(this.peluqueria)
      this.icono = document.getElementById("corazon");
    })
  }

  makeFav(){
    console.log(this.peluqueria.idPeluqueria)
    this.clienteService.fav(Number.parseInt(this.coockieService.get('usuario')), this.peluqueria.idPeluqueria)
      .subscribe(res=>{
        console.log(res)
        console.log(this.icono)
        if (this.icono.classList.contains("fa-regular")){
          this.icono.classList.remove("fa-regular");
          this.icono.classList.add("fa-solid");
        }else{
          this.icono.classList.remove("fa-solid");
          this.icono.classList.add("fa-regular");
        }

      });
  }
}
