import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PeluqueriaService} from "../peluqueria.service";
import {Peluqueria} from "../peluqueria";
import {PeluqueriasComponent} from "../peluquerias/peluquerias.component";

@Component({
  selector: 'app-peluqueria',
  standalone: true,
  imports: [],
  templateUrl: './peluqueria.component.html',
  styleUrl: './peluqueria.component.css'
})
export class PeluqueriaComponent implements OnInit{

  id:number =0;
  public peluqueria:Peluqueria;
  constructor(
    private route:ActivatedRoute,
    private peluqueriaService: PeluqueriaService) {
    this.peluqueria = {idPeluqueria: 1,nombre:"",descripcion:"",direccion:"",urlImagen:""};
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.peluqueriaService.find(this.id).subscribe(res => {
      this.peluqueria = res;
      console.log(this.peluqueria)
    })
  }
}
