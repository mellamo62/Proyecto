import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {RouterLink} from "@angular/router";
import {Cliente} from "../../modelos/cliente";
import {ClientesService} from "../../services/clientes.service";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  providers: [HttpClientModule]
})
export class PerfilComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;

  private files: any = null;


  public cliente: Cliente = {idCliente: 1, usuario: "", nombre: "", apellidos: "", password: "", fotoPerfil: ""};

  constructor(public clienteService: ClientesService, private coockieService: CookieService) {
    this.clienteService.get(Number.parseInt(this.coockieService.get('usuario')))
      .subscribe((data: Cliente) => {
        this.cliente = data;
        console.log(this.cliente)
      });
  }

  submit() {
    console.log(this.files);
    let idCliente = Number.parseInt(this.coockieService.get('usuario'));
    this.clienteService.get(idCliente)
      .subscribe((res: any) => {
        this.cliente = res;
        console.log("cliente")

        this.cliente.fotoPerfil = "/assets/files/clientes/" + this.files.name;
        console.log(this.cliente)
      });


    setTimeout(() => {
      let formFile = new FormData();
      formFile.append('file', this.files);

      this.clienteService.create(this.cliente)
        .subscribe((res: any) => {
          console.log("cliente")
          console.log(res)
        });

      this.clienteService.uploadFile(formFile)
        .subscribe((res: any) => {
          console.log("archivo")
          console.log(res);
        })
    }, 500)

  }

  changeFile() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.subirArchivo(file);
    }
  }

  subirArchivo(file: File) {
    let formFile = new FormData();
    formFile.append('file', file);
    console.log(file)
    this.cliente.fotoPerfil = "/assets/files/clientes/" + file.name;
    this.clienteService.create(this.cliente)
      .subscribe((res: any) => {
        console.log("cliente")
        console.log(res)
      });
    this.clienteService.uploadFile(formFile)
      .subscribe((res: any) => {
        console.log("archivo")
        console.log(res);
      })

  }

}
