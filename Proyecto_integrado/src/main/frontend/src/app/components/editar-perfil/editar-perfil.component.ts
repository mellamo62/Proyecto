import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Cliente} from "../../modelos/cliente";
import {CookieService} from "ngx-cookie-service";
import {ClientesService} from "../../services/clientes.service";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Location} from "@angular/common";

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  public formEdit: FormGroup;


  public cliente: Cliente = {idCliente: 1, usuario: "", nombre: "", apellidos: "", password: "", fotoPerfil: ""};

  constructor(public clienteService: ClientesService,
              private coockieService: CookieService,
              private location: Location) {
    this.formEdit = new FormGroup({
      "username": new FormControl('', Validators.required),
      "password": new FormControl('', [Validators.required, Validators.minLength(5)]),
      "passwordRep": new FormControl('', Validators.required),
      "name": new FormControl('', Validators.required),
      "lastName": new FormControl('', Validators.required)
    })

  }

  ngOnInit() {
    this.clienteService.get(Number.parseInt(this.coockieService.get('usuario')))
      .subscribe((data: Cliente) => {
        this.cliente = data;
        console.log(this.cliente)
        this.formEdit.get('username')!.setValue(this.cliente.usuario);
        this.formEdit.get('password')!.setValue(this.cliente.password);
        this.formEdit.get('passwordRep')!.setValue(this.cliente.password);
        this.formEdit.get('name')!.setValue(this.cliente.nombre);
        this.formEdit.get('lastName')!.setValue(this.cliente.apellidos);
      });


  }

  submit() {

    console.log("entra")
    console.log(this.formEdit.get('name'))
    let cliente: Cliente = {
      idCliente: this.cliente.idCliente,
      usuario: this.formEdit.get('username')!.value,
      nombre: this.formEdit.get('name')!.value,
      apellidos: this.formEdit.get('lastName')!.value,
      password: this.formEdit.get('password')!.value,
      fotoPerfil: this.cliente.fotoPerfil
    }


    this.clienteService.uploadCliente(cliente, this.cliente.idCliente)
      .subscribe((res: any) => {
        console.log("cliente")
        console.log(res)
      });

    this.location.back();

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
