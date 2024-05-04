import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PeluqueriaService} from "../peluqueria.service";
import {Peluqueria} from "../modelos/peluqueria";
import {PeluqueriasComponent} from "../peluquerias/peluquerias.component";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-peluqueria',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './peluqueria.component.html',
  styleUrl: './peluqueria.component.css'
})
export class PeluqueriaComponent implements OnInit{

  id:number =0;
  public peluqueria:Peluqueria;
  showTooltip: boolean = false;

  constructor(
    private route:ActivatedRoute,
    private peluqueriaService: PeluqueriaService) {
    this.peluqueria = {idPeluqueria: 1,nombre:"",descripcion:"",direccion:"",urlImagen:"",urlImagen2: ""};
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.peluqueriaService.find(this.id).subscribe(res => {
      this.peluqueria = res;
      console.log(this.peluqueria)
    })
  }
}
