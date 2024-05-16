import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import {Peluqueria} from "../../modelos/peluqueria";
import {PeluqueriaService} from "../../services/peluqueria.service";
import {ClientesService} from "../../services/clientes.service";

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
  idCliente:number;

  constructor(
    private route:ActivatedRoute,
    private peluqueriaService: PeluqueriaService,
    private clienteService: ClientesService,
    private coockieService: CookieService) {
    this.peluqueria = {idPeluqueria: 1,nombre:"",descripcion:"",direccion:"",urlImagen:"",urlImagen2: ""};
    this.idCliente = Number.parseInt(this.coockieService.get('usuario'));

  }

  ngOnInit() {
    this.idPeluqueria = this.route.snapshot.params['id'];
    this.peluqueriaService.find(this.idPeluqueria).subscribe(res => {
      this.peluqueria = res;
      console.log(this.peluqueria)
      this.icono = document.getElementById("corazon");
    })

    setTimeout(()=>{
      let favs:any = [];
      this.clienteService.getFavCliente(this.idCliente)
        .subscribe(res=>{
          favs = res;
          favs.forEach((fav:any) => {
            console.log(fav)
            if (this.peluqueria.idPeluqueria == fav.peluqueria.idPeluqueria){
              this.icono.classList.remove("fa-regular");
              this.icono.classList.add("fa-solid");
            }
          })
        })

    },100)
  }

  makeFav(){
    console.log(this.peluqueria.idPeluqueria)
    if (this.icono.classList.contains("fa-regular")){
      this.icono.classList.remove("fa-regular");
      this.icono.classList.add("fa-solid");
      this.clienteService.fav(Number.parseInt(this.coockieService.get('usuario')), this.peluqueria.idPeluqueria)
        .subscribe(res=>{
          console.log(res)
        });
    }else{
      this.icono.classList.remove("fa-solid");
      this.icono.classList.add("fa-regular");
      this.clienteService.deleteFav(this.idPeluqueria, this.idCliente)
        .subscribe(res=>{
          console.log(res)
        });
    }
  }
}
