import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ClientesService} from "../clientes.service";
import {Cliente} from "../cliente";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

  public cliente:Cliente = {id:1,usuario:"", nombre:"", apellidos: "", imagen:""};
  constructor(public clienteService: ClientesService) {
  }

  ngOnInit() {

    this.clienteService.get(1).subscribe((data:Cliente) =>{
      this.cliente=data;
      console.log(this.cliente)
    });


  }

}
