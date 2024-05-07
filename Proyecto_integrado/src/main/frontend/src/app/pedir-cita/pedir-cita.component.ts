import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HorariosService} from "../horarios.service";
import {ActivatedRoute} from "@angular/router";

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
    private horariosService: HorariosService
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
    console.log(this.fechaFormateada)
  }

}
