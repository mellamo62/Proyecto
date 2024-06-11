import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Cliente} from "../../modelos/cliente";
import {CookieService} from "ngx-cookie-service";
import {ClientesService} from "../../services/clientes.service";
import {RouterLink} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Location, NgIf} from "@angular/common";
import {PerfilService} from "../../services/perfil.service";

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  public formEdit: FormGroup;
  public userNameError: boolean;
  public nameError:boolean;
  public lastNameError: boolean;
  public passError: boolean;
  public passRepError: boolean;
  public userNameRepError: boolean;
  private clientes: Cliente[];
  public showSuccessMessage: boolean;


  public cliente: Cliente = {idCliente: 1, usuario: "", nombre: "", apellidos: "", password: "", fotoPerfil: ""};

  constructor(public clienteService: ClientesService,
              private coockieService: CookieService,
              private location: Location,
              private perfilService: PerfilService,
              private formBuilder: FormBuilder) {
    this.userNameError = false;
    this.nameError = false;
    this.lastNameError = false;
    this.passError = false;
    this.passRepError = false;
    this.userNameRepError = false;
    this.clientes=[];
    this.showSuccessMessage = false;
    this.formEdit = formBuilder.group({
      "username": new FormControl('', Validators.required),
      "password": new FormControl('', [Validators.required, Validators.minLength(5)]),
      "passwordRep": new FormControl('', Validators.required),
      "name": new FormControl('', Validators.required),
      "lastName": new FormControl('', Validators.required)
    },{validator: this.compararPassword})

  }

  ngOnInit() {
    setTimeout(()=>{
      let contenedor = document.getElementById('contenedor') as HTMLElement;
      contenedor.classList.remove('entra')
    }, 1000)
    this.clienteService.getAll()
      .subscribe(res=>{
        this.clientes = res;
      })
    this.clienteService.get(Number.parseInt(this.coockieService.get('usuario')))
      .subscribe((data: Cliente) => {
        this.cliente = data;
        this.formEdit.get('username')!.setValue(this.cliente.usuario);
        this.formEdit.get('password')!.setValue(this.cliente.password);
        this.formEdit.get('passwordRep')!.setValue(this.cliente.password);
        this.formEdit.get('name')!.setValue(this.cliente.nombre);
        this.formEdit.get('lastName')!.setValue(this.cliente.apellidos);
      });
  }

  compararPassword(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const passwordRep = formGroup.get('passwordRep')?.value;

    return password === passwordRep ? null : {contraseniasNoCoinciden: true};
  }

  submit() {

    if (!this.formEdit.get('username')?.value) {
      this.userNameError = true;
      this.userNameRepError = false;

    }else{
      this.userNameError = false;
      this.userNameRepError = false;
      this.clientes = this.clientes.filter(cli => cli.idCliente != this.cliente.idCliente);
      this.clientes.forEach(cli =>{
        if (this.formEdit.get('username')?.value == cli.usuario){
          this.userNameRepError = true;
        }
      })
    }
    this.nameError = !this.formEdit.get('name')?.value;
    this.lastNameError = !this.formEdit.get('lastName')?.value;
    this.passError = !this.formEdit.get('password')?.value;
    this.passRepError = !this.formEdit.get('passwordRep')?.value;

    if(!this.nameError && !this.lastNameError && ! this.userNameError && !this.userNameRepError && !this.passError && !this.passRepError){
      let cliente: Cliente = {
        idCliente: this.cliente.idCliente,
        usuario: this.formEdit.get('username')!.value,
        nombre: this.formEdit.get('name')!.value,
        apellidos: this.formEdit.get('lastName')!.value,
        password: this.formEdit.get('password')!.value,
        fotoPerfil: this.cliente.fotoPerfil
      }

      let contenedor = document.getElementById('contenedor') as HTMLElement;
      this.showSuccessMessage = true;
      setTimeout(()=>{
        contenedor.classList.add('salir');
      },500)


      setTimeout(()=>{
        this.clienteService.uploadCliente(cliente, this.cliente.idCliente)
          .subscribe((res: any) => {

            this.perfilService.actualizarPerfil(res);
          });

        this.location.back();
      },1400)
    }
  }

  changeFile() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.png') || file.name.toLowerCase().endsWith('.webp') || file.name.toLowerCase().endsWith('.jpeg') || file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.bmp') || file.name.toLowerCase().endsWith('.svg')){
        this.subirArchivo(file);
      }

    }
  }

  subirArchivo(file: File) {
    let formFile = new FormData();
    formFile.append('file', file);
    this.cliente.fotoPerfil = "/assets/files/clientes/" + file.name;
    this.clienteService.create(this.cliente)
      .subscribe((res: any) => {
        this.perfilService.actualizarPerfil(res);
      });
    this.clienteService.uploadFile(formFile).subscribe();

  }
}
