import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

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

  constructor() {
    this.minDateValue = new Date();
  }

  public changeDay(event:any){
    const fechaSeleccionada: Date = event;

    const dia = fechaSeleccionada.getDate().toString().padStart(2, '0');
    const mes = (fechaSeleccionada.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript comienzan en 0
    const anio = fechaSeleccionada.getFullYear();

    const fechaFormateada = `${dia}-${mes}-${anio}`;

    console.log('Fecha seleccionada:', fechaFormateada);
  }

}
