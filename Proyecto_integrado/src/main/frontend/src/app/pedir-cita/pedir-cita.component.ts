import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HorariosService} from "../horarios.service";
import {ActivatedRoute} from "@angular/router";
import {ClientesService} from "../clientes.service";
import {Cliente} from "../modelos/cliente";
import {Peluqueria} from "../modelos/peluqueria";
import {RequestData} from "../modelos/RequestData";
import {CookieService} from "ngx-cookie-service";
import {PeluqueriaService} from "../peluqueria.service";

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
    private clientesService:ClientesService,
    private peluqueriaService: PeluqueriaService,
    private cookieService: CookieService
  ) {
    this.minDateValue = new Date();
    this.id = this.route.snapshot.params['idPeluqueria'];
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

  public check(event:any){
    let id = Number.parseInt(this.cookieService.get('usuario'));
    let cliente:Cliente;
    this.clientesService.get(id)
      .subscribe(res=>{
        cliente = res;
      });

    let idPeluqueria = this.route.snapshot.params['idPeluqueria'];

    let peluqueria: Peluqueria;
    this.peluqueriaService.find(idPeluqueria)
      .subscribe(res=>{
        peluqueria = res;
      });

    let hora:string;

    this.horario.forEach((h: any)=>{
      if (event.target.id == h.hora){
        hora = h.hora;
      }
    })



    setTimeout(()=>{
      let cita:RequestData = {
      cliente: cliente,
      peluqueria: peluqueria,
      fecha: this.fechaFormateada,
      hora: hora
    }
      console.log(cita)
      this.clientesService.createCita(cita)
        .subscribe(res=>{
          console.log(res)
        });
    },500)




  }

}
