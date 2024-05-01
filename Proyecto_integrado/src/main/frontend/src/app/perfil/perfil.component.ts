import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ClientesService} from "../clientes.service";
import {Cliente} from "../cliente";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

  form: FormGroup =  new FormGroup({
    file:  new FormControl('', [ Validators.required])
  });

  private files:any = null;

  public cliente:Cliente = {id:1,usuario:"", nombre:"", apellidos: "", image: ""};
  constructor(public clienteService: ClientesService) {
  }

  ngOnInit() {

    this.clienteService.get(1).subscribe((data:Cliente) =>{
      this.cliente=data;
      console.log(this.cliente)
    });


  }

  submit(){
    console.log(this.files);
    let data:Cliente = {
      id:7,
      usuario: "mellamo",
      nombre:"mellamo",
      apellidos:"apellido",
      image: this.files
    }
    this.clienteService.create(data).subscribe(res=>{
      console.log(res)
    });
  }

  onChange(event:any) {
    this.files = event.target.files[0];
  }

}
