import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
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
export class PeluqueriaComponent implements OnInit,AfterViewInit {

  idPeluqueria:number =0;
  public peluqueria:Peluqueria;
  showTooltip: boolean = false;
  icono: any;
  idCliente:number;
  url:string="";
  geo:any;
  map:any;
  name:string="";
  region:string="";
  country:string="";
  tempC:string="";
  lastUpdated:string="";
  windV:string="";
  windDir:string="";
  icon:string="";

  constructor(
    private route:ActivatedRoute,
    private peluqueriaService: PeluqueriaService,
    private clienteService: ClientesService,
    private coockieService: CookieService) {
    this.peluqueria = {idPeluqueria: 1,nombre:"",descripcion:"",direccion:"",urlImagen:"",urlImagen2: "",latitud: 0,longitud: 0};
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

  ngAfterViewInit(){
    setTimeout(()=>{


      // this.map = new L.Map('map').setView([this.peluqueria.latitud, this.peluqueria.longitud],13);
      //
      // L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}').addTo(this.map);
      // marker([this.peluqueria.latitud, this.peluqueria.longitud]).addTo(this.map).bindPopup(`<strong>${this.peluqueria.nombre}</strong>`).openPopup();

      var mapbox_url = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9ubnltY2N1bGxhZ2giLCJhIjoiY2xsYzdveWh4MGhwcjN0cXV5Z3BwMXA1dCJ9.QoEHzPNq9DtTRrdtXfOdrw';
      var mapbox_attribution = '© Mapbox © OpenStreetMap Contributors';
      var esri_url ='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      var esri_attribution = '© Esri © OpenStreetMap Contributors';

      var lyr_satellite = L.tileLayer(esri_url, { maxZoom: 20, tileSize: 512, zoomOffset: -1, attribution: esri_attribution});
      var lyr_streets   = L.tileLayer(mapbox_url, { maxZoom: 28, tileSize: 512, zoomOffset: -1, attribution: mapbox_attribution});
      var marker = L.marker([this.peluqueria.latitud, this.peluqueria.longitud], {draggable: false}).bindPopup(`<strong>${this.peluqueria.nombre}</strong>`);
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

    },1000);
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
