import {Component, OnInit} from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {HorariosService} from "../../services/horarios.service";
import {ClientesService} from "../../services/clientes.service";
import {PeluqueriaService} from "../../services/peluqueria.service";
import {Cliente} from "../../modelos/cliente";
import {Peluqueria} from "../../modelos/peluqueria";
import {RequestData} from "../../modelos/RequestData";
import {Cita} from "../../modelos/cita";

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
export class PedirCitaComponent implements OnInit{
  date: any;
  minDateValue: any;
  id:number;
  horario:any;
  fechaFormateada:any;
  cita:RequestData;
  public showConfirmation: boolean = false;
  public horas:boolean;
  public horasIselected:boolean;
  boton:any;
  public citas:any;

  constructor(
    private route:ActivatedRoute,
    private horariosService: HorariosService,
    private clientesService:ClientesService,
    private peluqueriaService: PeluqueriaService,
    private cookieService: CookieService,
    private router:Router
  ) {
    this.minDateValue = new Date();
    this.id = this.route.snapshot.params['idPeluqueria'];
    this.cita= {
      cliente:null,
      fecha: null,
      hora: null,
      peluqueria: null
    };
    this.horas = false;
    this.horasIselected = false;
    this.citas =[];
  }

  ngOnInit() {
    this.boton = document.getElementById("pedirCita");
    console.log(this.boton)
    this.boton.style.opacity ="0";
    this.horariosService.getCitasByPeluqueria(this.id)
      .subscribe(res=>{
        console.log("citas de peluqueria")
        console.log(res)
        this.citas = res;
      })
  }

  formatTime(fecha:Date){
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript comienzan en 0
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;
  }

  public changeDay(event:any){
    if (this.horasIselected){
      this.horasIselected = !this.horasIselected;
      this.boton.style.opacity ="0";
    }
    const fechaSeleccionada: Date = event;
    this.horas = true;

    this.fechaFormateada = this.formatTime(fechaSeleccionada);
    this.horariosService.getOneByPeluqueria(this.id)
      .subscribe(res=>{
        this.horario = res;
        console.log(this.horario)
        this.citas.forEach((c:any)=>{
          if (this.formatTime(new Date(c.fecha)) == this.fechaFormateada){
            console.log(c.hora)
            this.horario = this.horario.filter((h:any) => h.hora != c.hora);
          }
        })
        console.log(this.horario)
      });
  }

  public check(selectedHour:string){
    this.horasIselected = true;
    this.boton.style.opacity ="1";
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

    setTimeout(()=>{
      this.cita = {
      cliente: cliente,
      peluqueria: peluqueria,
      fecha: this.fechaFormateada,
      hora: selectedHour
    }
      console.log(this.cita)

    },500)
  }



  public confirmSelection(): void {
    console.log('Confirmado');
    this.submit();
    this.router.navigate(['home']);

  }

  public cancelSelection(): void {
    console.log('Cancelado');
    this.showConfirmation = false;
  }

  public confirmSelectionWithModal(): void {
    this.showConfirmation = true;
  }

  submit(){
    this.clientesService.createCita(this.cita)
      .subscribe(res=>{
        console.log(res)
      });
  }

}
