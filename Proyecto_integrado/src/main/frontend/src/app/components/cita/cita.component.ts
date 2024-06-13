import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Peluqueria} from "../../modelos/peluqueria";
import {ActivatedRoute, Router} from "@angular/router";
import {PeluqueriaService} from "../../services/peluqueria.service";
import {ClientesService} from "../../services/clientes.service";
import {CookieService} from "ngx-cookie-service";
import * as L from "leaflet";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {HorariosService} from "../../services/horarios.service";
import {Cliente} from "../../modelos/cliente";
import {Cita} from "../../modelos/cita";
import {CitasService} from "../../services/citas.service";

@Component({
  selector: 'app-cita',
  standalone: true,
  imports: [
    NgIf,
    CalendarModule,
    FormsModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.css'
})
export class CitaComponent implements OnInit, AfterViewInit {
  idPeluqueria: number = 0;
  public peluqueria: Peluqueria;
  showTooltip: boolean = false;
  icono: any;
  idCliente: number;
  map: any;
  name: string = "";
  date: any;
  minDateValue: any;
  horario: any;
  fechaFormateada: any;
  cita: Cita;
  public showConfirmation: boolean;
  public horas: boolean;
  public horasIselected: boolean;
  public citas: any;
  selectedHora: string;
  citaId: number;
  showCancelar: boolean;
  cliente: Cliente;

  constructor(
    private route: ActivatedRoute,
    private peluqueriaService: PeluqueriaService,
    private clienteService: ClientesService,
    private horariosService: HorariosService,
    private cookieService: CookieService,
    private citasService: CitasService,
    private router: Router) {
    this.peluqueria = {
      idPeluqueria: 1,
      nombre: "",
      descripcion: "",
      direccion: "",
      urlImagen: "",
      urlImagen2: "",
      latitud: 0,
      longitud: 0
    };
    this.idCliente = Number.parseInt(this.cookieService.get('usuario'));
    this.citaId = Number.parseInt(this.route.snapshot.params['idCita']);
    this.cita = {
      id: undefined,
      cliente: null,
      peluqueria: null,
      fecha: "",
      hora: ""
    };
    this.cliente = {
      idCliente: 0,
      usuario: "",
      nombre: "",
      apellidos: "",
      password: "",
      fotoPerfil: ""
    }

    this.minDateValue = new Date();
    this.horas = false;
    this.horasIselected = false;
    this.citas = [];
    this.showConfirmation = false;
    this.showCancelar = false;
    this.selectedHora = "";

  }

  ngOnInit() {

    this.idPeluqueria = this.route.snapshot.params['idPeluqueria'];
    this.peluqueriaService.find(this.idPeluqueria).subscribe(res => {
      this.peluqueria = res;
      this.icono = document.getElementById("corazon");
    })

    this.clienteService.get(this.idCliente)
      .subscribe(res => {
        this.cliente = res;
      })

    this.citasService.getCitasByPeluqueria(this.idPeluqueria)
      .subscribe(res => {
        this.citas = res;

        const self = this;
        document.addEventListener('click', function (event) {
          const confirmation = document.getElementById('confirmation') as HTMLInputElement;
          const confirmationOut = document.getElementById('confirmationBloque') as HTMLInputElement;
          const cancel = document.getElementById('cancelar') as HTMLInputElement;
          const cancelOut = document.getElementById('cancelarBloque') as HTMLInputElement;
          const target = event.target as Node

          if (confirmation) {
            const isClickInside = !confirmation.contains(target) && confirmationOut.contains(target);
            if (isClickInside) {
              self.showConfirmation = false;
            }
          }

          if (cancel) {
            const isClickInside = !cancel.contains(target) && cancelOut.contains(target);
            if (isClickInside) {
              self.showCancelar = false;
            }
          }
        });
      })



    setTimeout(() => {
      let favs: any = [];
      this.clienteService.getFavCliente(this.idCliente)
        .subscribe(res => {
          favs = res;
          favs.forEach((fav: any) => {
            if (this.peluqueria.idPeluqueria == fav.peluqueria.idPeluqueria) {
              this.icono.classList.remove("fa-regular");
              this.icono.classList.add("fa-solid");
            }
          })
        })

    }, 100)
  }

  public changeDay(event: any) {
    this.selectedHora = "";
    if (this.horasIselected) {
      this.horasIselected = !this.horasIselected;
    }
    this.fechaFormateada = event;
    this.horas = true;


    this.horariosService.getOneByPeluqueria(this.idPeluqueria)
      .subscribe(res => {
        this.horario = res;

        let horas = document.getElementById('horas') as HTMLElement;
        let clases = horas.classList.value.split(' ');
        clases = clases.filter(c => c.includes("animateHoras"));
        if (clases.length > 0) {
          horas.classList.remove('animateHoras');
          horas.classList.add('disappear')

          setTimeout(() => {
            this.citas.forEach((c: any) => {
              if (this.formatTime(new Date(c.fecha)) == this.formatTime(this.fechaFormateada)) {
                if (this.cita.hora == c.hora) {
                  this.selectedHora = this.cita.hora;
                } else {
                  this.horario = this.horario.filter((h: any) => h.hora != c.hora);
                }

              }
            })
            horas.classList.remove('disappear')
            horas.classList.add('animateHoras')
          }, 800)
        } else {
          horas.classList.add('animateHoras')
        }

        if (!this.showConfirmation) {
          let pedirCita = document.getElementById('bloqueCita') as HTMLElement;
          setTimeout(() => {
            pedirCita.classList.add('moveRightBoton')
          }, 1000)

        }
      });
  }

  formatTime(fecha: any) {
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript comienzan en 0
    const anio = date.getFullYear();
    return `${dia}-${mes}-${anio}`;
  }


  ngAfterViewInit() {

    this.citasService.getCita(this.citaId)
      .subscribe(res => {
        this.cita = res;

        const [day, month, year] = this.cita.fecha.split('-');
        this.date = new Date(`${year}-${month}-${day}`);
        this.fechaFormateada = this.formatTime(this.date);
        this.selectedHora = this.cita.hora
      })
    this.horariosService.getOneByPeluqueria(this.idPeluqueria)
      .subscribe(res => {
        this.horario = res;
        this.citas.forEach((c: any) => {
          if (this.formatTime(c.fecha) == this.formatTime(this.fechaFormateada)) {
            if (this.cita.hora == c.hora) {
              this.selectedHora = this.cita.hora;
            } else {
              this.horario = this.horario.filter((h: any) => h.hora != c.hora);
            }
          }

        })
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
    setTimeout(() => {

      var mapbox_url = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9ubnltY2N1bGxhZ2giLCJhIjoiY2xsYzdveWh4MGhwcjN0cXV5Z3BwMXA1dCJ9.QoEHzPNq9DtTRrdtXfOdrw';
      var esri_url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

      var lyr_satellite = L.tileLayer(esri_url, {maxZoom: 20, tileSize: 512, zoomOffset: -1});
      var lyr_streets = L.tileLayer(mapbox_url, {maxZoom: 28, tileSize: 512, zoomOffset: -1});
      var marker = L.marker([this.peluqueria.latitud, this.peluqueria.longitud], {draggable: false}).bindTooltip(`<div class="row"><strong>${this.peluqueria.nombre}</strong></div>
<div class="row"><strong>${this.peluqueria.direccion}</strong></div>`);
      var lg_markers = L.layerGroup([marker]);


      this.map = L.map('map', {
        center: [this.peluqueria.latitud, this.peluqueria.longitud],
        zoom: 18,
        layers: [lyr_satellite, lyr_streets, lg_markers]
      });

      var baseMaps = {
        "Streets": lyr_streets,
        "Satellite": lyr_satellite
      };
      var overlayMaps = {
        "Markers": lg_markers,
      };

      L.control.layers(baseMaps, overlayMaps).addTo(this.map);

    }, 1000);
  }

  makeFav() {
    if (this.icono.classList.contains("fa-regular")) {
      this.icono.classList.remove("fa-regular");
      this.icono.classList.add("fa-solid");
      this.clienteService.fav(Number.parseInt(this.cookieService.get('usuario')), this.peluqueria.idPeluqueria)
        .subscribe();
    } else {
      this.icono.classList.remove("fa-solid");
      this.icono.classList.add("fa-regular");
      this.clienteService.deleteFav(this.idPeluqueria, this.idCliente)
        .subscribe();
    }
  }

  public check(selectedHour: string) {
    this.horasIselected = true;
    this.selectedHora = selectedHour;
    let cliente: Cliente;
    this.clienteService.get(this.idCliente)
      .subscribe(res => {
        cliente = res;
      });

    let peluqueria: Peluqueria;
    this.peluqueriaService.find(this.idPeluqueria)
      .subscribe(res => {
        peluqueria = res;
      });

    setTimeout(() => {
      this.cita = {
        id: undefined,
        cliente: cliente,
        peluqueria: peluqueria,
        fecha: this.fechaFormateada,
        hora: selectedHour
      }

    }, 500)
  }

  public editModal() {
    this.showConfirmation = true;
    setTimeout(() => {
      let confirmation = document.getElementById('confirmation') as HTMLElement;
      confirmation.classList.add('confirmation-animate')
    }, 10)
  }

  public borrarModal() {
    this.showCancelar = true;
    setTimeout(() => {
      let cancel = document.getElementById('cancelar') as HTMLElement;
      cancel.classList.add('confirmation-animate')
    }, 10)
  }

  public confirmSelection() {

    let cita: Cita = {
      id: this.citaId,
      peluqueria: this.peluqueria,
      cliente: this.cliente,
      fecha: this.fechaFormateada,
      hora: this.selectedHora
    }

    this.citasService.edit(cita)
      .subscribe(res => {
        this.showConfirmation = false;
        let contenedor = document.getElementById('contenedor') as HTMLElement;
        contenedor.classList.add('animateOut');
        setTimeout(() => {
          this.router.navigate(['home/citasPedidas'])
        }, 800)
      })

  }

  public cancelSelection() {
    let bloque = document.getElementById('confirmation') as HTMLElement;
    bloque.classList.remove('confirmation-animate');
    bloque.classList.add('animateOut');

    setTimeout(() => {
      this.showConfirmation = false;
    }, 800)

  }

  public confirmCancelar() {

    this.citasService.delete(this.citaId)
      .subscribe(res => {
        this.showCancelar = false;
        let contenedor = document.getElementById('contenedor') as HTMLElement;
        contenedor.classList.add('animateOut');
        setTimeout(() => {
          this.router.navigate(['home/citasPedidas'])
        }, 800)
      })
  }

  public cancelar() {
    let bloque = document.getElementById('cancelar') as HTMLElement;
    bloque.classList.remove('confirmation-animate');
    bloque.classList.add('animateOut');

    setTimeout(() => {
      this.showCancelar = false;
    }, 800)

  }
}
