import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
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
import {CitasService} from "../../services/citas.service";

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
export class PedirCitaComponent implements OnInit {
  @ViewChild('pedirCita', {static: false}) boton!: ElementRef;
  date: any;
  minDateValue: any;
  id: number;
  horario: any;
  fechaFormateada: any;
  cita: RequestData;
  public showConfirmation: boolean;
  public horas: boolean;
  public horasIselected: boolean;
  public citas: any;
  selectedHora: string;

  constructor(
    private route: ActivatedRoute,
    private horariosService: HorariosService,
    private clientesService: ClientesService,
    private peluqueriaService: PeluqueriaService,
    private citaService: CitasService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.minDateValue = new Date();
    this.id = this.route.snapshot.params['idPeluqueria'];
    this.cita = {
      cliente: null,
      fecha: null,
      hora: null,
      peluqueria: null
    };
    this.horas = false;
    this.horasIselected = false;
    this.citas = [];
    this.showConfirmation = false;
    this.selectedHora = "";
  }

  ngOnInit() {

    setTimeout(() => {
      let bloque = document.getElementById('bloque') as HTMLElement;
      bloque.classList.remove('contenedor')
    }, 1500)

    this.citaService.getCitasByPeluqueria(this.id)
      .subscribe(res => {
        this.citas = res;
        let pedirCita = document.getElementById('bloqueCita') as HTMLElement;
        pedirCita.classList.add('rightBoton')
        const self = this;
        document.addEventListener('click', function (event) {
          const confirmation = document.getElementById('confirmation') as HTMLInputElement;
          const confirmationOut = document.getElementById('confirmationBloque') as HTMLInputElement;
          const target = event.target as Node

          if (confirmation) {
            const isClickInside = !confirmation.contains(target) && confirmationOut.contains(target);
            if (isClickInside) {
              self.showConfirmation = false;
            }
          }
        });
      })
  }

  formatTime(fecha: Date) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript comienzan en 0
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;
  }

  public changeDay(event: any) {
    this.selectedHora = "";
    if (this.horasIselected) {
      this.horasIselected = !this.horasIselected;
      let pedirCitas = document.getElementById('bloqueCita') as HTMLElement;
      pedirCitas.classList.remove('moveRightBoton')
      pedirCitas.classList.remove('rightBoton')
      pedirCitas.classList.add('moveLeftBoton');
    }
    const fechaSeleccionada: Date = event;
    this.horas = true;

    this.fechaFormateada = this.formatTime(fechaSeleccionada);
    this.horariosService.getOneByPeluqueria(this.id)
      .subscribe(res => {
        this.horario = res;
        this.citas.forEach((c: any) => {
          if (this.formatTime(new Date(c.fecha)) == this.fechaFormateada) {
            this.horario = this.horario.filter((h: any) => h.hora != c.hora);
          }
        })
        if (this.fechaFormateada == this.formatTime(new Date())){
          this.horario = this.horario.filter((h:any) => {
            let hora = h.hora.split(':');
            if (hora[0] > new Date().getHours()){
              return h.hora
            }else{
              return
            }
          })
        }
        let horas = document.getElementById('horas') as HTMLElement;
        let clases = horas.classList.value.split(' ');
        clases = clases.filter(c => c.includes("animateHoras"));
        if (clases.length > 0) {
          horas.classList.remove('animateHoras');
          horas.classList.add('disappear')
          setTimeout(() => {
            horas.classList.remove('disappear')
            horas.classList.add('animateHoras')
          }, 800)
        } else {
          horas.classList.add('animateHoras')
        }
      });
  }

  public check(selectedHour: string) {
    this.horasIselected = true;
    this.selectedHora = selectedHour;
    let pedirCitas = document.getElementById('bloqueCita') as HTMLElement;
    pedirCitas.classList.remove('moveLeftBoton')
    pedirCitas.classList.add('moveRightBoton')
    let idCliente = Number.parseInt(this.cookieService.get('usuario'));
    let cliente: Cliente;
    this.clientesService.get(idCliente)
      .subscribe(res => {
        cliente = res;
      });

    let idPeluqueria = this.route.snapshot.params['idPeluqueria'];

    let peluqueria: Peluqueria;
    this.peluqueriaService.find(idPeluqueria)
      .subscribe(res => {
        peluqueria = res;
      });

    setTimeout(() => {
      this.cita = {
        cliente: cliente,
        peluqueria: peluqueria,
        fecha: this.fechaFormateada,
        hora: selectedHour
      }

    }, 500)
  }


  public confirmSelection(): void {
    this.showConfirmation = false;
    let bloque = document.getElementById('bloque') as HTMLElement;
    bloque.classList.add('animateOut');
    this.submit();
    setTimeout(() => {
      this.router.navigate(['home/citasPedidas']);
    }, 800)


  }

  public cancelSelection(): void {
    let bloque = document.getElementById('confirmation') as HTMLElement;
    bloque.classList.add('animateOut');

    setTimeout(() => {
      this.showConfirmation = false;
    }, 800)

  }

  public confirmSelectionWithModal(): void {
    this.showConfirmation = true;
    setTimeout(() => {
      let confirmation = document.getElementById('confirmation') as HTMLElement;
      confirmation.classList.add('confirmation-animate')
    }, 10)
  }

  submit() {
    this.citaService.createCita(this.cita)
      .subscribe(res => {
      });
  }

}
