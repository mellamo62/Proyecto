import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import {Peluqueria} from "../../modelos/peluqueria";
import {PeluqueriaService} from "../../services/peluqueria.service";
import {ClientesService} from "../../services/clientes.service";
import * as L from "leaflet";

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
export class PeluqueriaComponent implements OnInit, AfterViewInit {

  idPeluqueria: number = 0;
  public peluqueria: Peluqueria;
  showTooltip: boolean = false;
  icono: any;
  idCliente: number;
  map: any;
  name: string = "";

  constructor(
    private route: ActivatedRoute,
    private peluqueriaService: PeluqueriaService,
    private clienteService: ClientesService,
    private coockieService: CookieService,
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
    this.idCliente = Number.parseInt(this.coockieService.get('usuario'));

  }

  ngOnInit() {
    this.idPeluqueria = this.route.snapshot.params['id'];
    this.peluqueriaService.find(this.idPeluqueria).subscribe(res => {
      this.peluqueria = res;
      this.icono = document.getElementById("corazon");
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

  ngAfterViewInit() {
    setTimeout(() => {

      var mapbox_url = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVsbGFtbzYyMSIsImEiOiJjbHd0MHVvMWYwMjJsMmxxdHZhcXlrMTU3In0.RX1pnhXIeXGhL-p2I2J5gQ';
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
      this.clienteService.fav(Number.parseInt(this.coockieService.get('usuario')), this.peluqueria.idPeluqueria)
        .subscribe();
    } else {
      this.icono.classList.remove("fa-solid");
      this.icono.classList.add("fa-regular");
      this.clienteService.deleteFav(this.idPeluqueria, this.idCliente)
        .subscribe();
    }
  }

  pedirCita(){
    let contenedor = document.getElementById('contenedor') as HTMLElement;
    contenedor.classList.remove('contenedor')
    contenedor.classList.add('animate');
    setTimeout(()=>{
      this.router.navigate([('/home/peluquerias/cita/'+this.idPeluqueria)])
    },1000)

  }
}
