import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ClientesService} from "../clientes.service";
import {Cliente} from "../modelos/cliente";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  providers: [HttpClientModule]
})
export class PerfilComponent implements OnInit {

  form: FormGroup = new FormGroup({
    file: new FormControl('', [Validators.required])
  });

  private files: any = null;

  public cliente: Cliente = {idCliente: 1, usuario: "", nombre: "", apellidos: "", fotoPerfil:""};

  constructor(public clienteService: ClientesService,private coockieService: CookieService) {
    this.clienteService.get(Number.parseInt(this.coockieService.get('usuario'))).subscribe((data: Cliente) => {
    this.cliente = data;
    console.log(this.cliente)
  });
  }

  ngOnInit() {

  }

  submit() {
    console.log(this.files);
    let idCliente = Number.parseInt(this.coockieService.get('usuario'));
    this.clienteService.get(idCliente)
      .subscribe(res=>{
        this.cliente = res;
        console.log("cliente")

        this.cliente.fotoPerfil = "./assets/files/clientes/"+this.files.name;
        console.log(this.cliente)
      });


    setTimeout(()=>{
      let formFile = new FormData();
      formFile.append('file', this.files);

      this.clienteService.create(formFile,this.cliente)
        .subscribe(res => {
          console.log(res)
        });
    },500)

  }

  onChange(event: any) {
    this.files = event.target.files[0];
  }

}
