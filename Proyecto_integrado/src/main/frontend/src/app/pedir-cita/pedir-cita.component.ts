import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HorariosService} from "../horarios.service";
import {ActivatedRoute} from "@angular/router";
import {ClientesService} from "../clientes.service";
import {Cliente} from "../modelos/cliente";
import {Peluqueria} from "../modelos/peluqueria";

@Component({
  selector: 'app-pedir-cita',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule
  ],
  templateUrl: './pedir-cita.component.html',
  styleUrl: './pedir-cita.component.css'
})
export class PedirCitaComponent {
  date: any;
  minDateValue: any;
  id:number;
  horario:any;
  fechaFormateada:any;

  constructor(
    private route:ActivatedRoute,
    private horariosService: HorariosService,
    private clientesService:ClientesService
  ) {
    this.minDateValue = new Date();
    this.id = this.route.snapshot.params['id'];
  }

  public changeDay(event:any){
    const fechaSeleccionada: Date = event;

    const dia = fechaSeleccionada.getDate().toString().padStart(2, '0');
    const mes = (fechaSeleccionada.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript comienzan en 0
    const anio = fechaSeleccionada.getFullYear();

    this.fechaFormateada = `${dia}-${mes}-${anio}`;
    this.horariosService.getOneByPeluqueria(this.id)
      .subscribe(res=>{
        console.log(res)
        this.horario = res;
      });
  }

  public check(){
    // let cliente:Cliente ={
    //   idCliente:2,
    //   usuario:"crinisitian",
    //   nombre:"Cristian",
    //   apellidos: "Prieto Ortega",
    //   url_image: "https://static.wikia.nocookie.net/theghosttrick/images/6/6c/SisselCat.png/revision/latest?cb=20110322224849"
    // }
    //
    // let peluqueria:Peluqueria = {
    //   idPeluqueria:1,
    //   nombre: "Alonso",
    //   descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non imperdiet tortor.",
    //   direccion:"29120 Alhaurín el Grande, Málaga",
    //   urlImagen:"https://lh5.googleusercontent.com/p/AF1QipPvFsDxYIt7OeywZE1sglChJtm6S4meCkWxMQAc=w426-h240-k-no",
    //   urlImagen2:"https://lh5.googleusercontent.com/p/AF1QipPvFsDxYIt7OeywZE1sglChJtm6S4meCkWxMQAc=w426-h240-k-no"
    // }
    // this.clientesService.createCita(peluqueria, cliente)
    //   .subscribe(res=>{
    //     console.log(res)
    //   });

  }

}
