import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {ClientesService} from "../../services/clientes.service";
import {CookieService} from "ngx-cookie-service";
import {NgIf} from "@angular/common";
import {Cliente} from "../../modelos/cliente";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  public registerForm: FormGroup;
  public userNameError: boolean;
  public nameError:boolean;
  public lastNameError: boolean;
  public passError: boolean;
  public passRepError: boolean;
  public userNameRepError: boolean;
  public showSuccessMessage: boolean;
  private clientes: Cliente[];


  constructor(private clienteService: ClientesService,
              private router: Router,
              formBuilder: FormBuilder) {
    this.userNameError = false;
    this.nameError = false;
    this.lastNameError = false;
    this.passError = false;
    this.passRepError = false;
    this.showSuccessMessage = false;
    this.userNameRepError = false;
    this.clientes = [];
    this.registerForm = formBuilder.group({
      "username": new FormControl('', Validators.required),
      "password": new FormControl('', [Validators.required, Validators.minLength(5)]),
      "passwordRep": new FormControl('', Validators.required),
      "name": new FormControl('', Validators.required),
      "lastName": new FormControl('', Validators.required)
    }, {validator: this.compararPassword});
  }

  ngOnInit() {
    this.clienteService.getAll()
      .subscribe(res=>{
        this.clientes = res;
      })
  }

  compararPassword(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const passwordRep = formGroup.get('passwordRep')?.value;

    return password === passwordRep ? null : {contraseniasNoCoinciden: true};
  }

  submit() {

    console.log(this.registerForm.value)

    if (!this.registerForm.get('username')?.value) {
      this.userNameError = true;

    }else{
      this.clientes.forEach(cli =>{
        if (this.registerForm.get('username')?.value == cli.usuario){
          this.userNameRepError = true;
        }
      })
    }
    if(!this.registerForm.get('name')?.value){
      this.nameError = true;
    }
    if (!this.registerForm.get('lastName')?.value){
      this.lastNameError = true;
    }
    if (!this.registerForm.get('password')?.value){
      this.passError = true;
    }
    if (!this.registerForm.get('passwordRep')?.value){
      this.passRepError = true;
    }
    if(!this.nameError && !this.lastNameError && ! this.userNameError && !this.userNameRepError && !this.passError && !this.passRepError){
      this.showSuccessMessage = true;
      let contenedor = document.getElementById('contenedor') as HTMLElement;


      setTimeout(()=>{
        contenedor.classList.add('salir')
      },500)

      setTimeout(() => {
        let cliente: Cliente = {
          idCliente: 0,
          usuario: this.registerForm.get('username')?.value,
          password: this.registerForm.get('password')?.value,
          nombre: this.registerForm.get('name')?.value,
          apellidos: this.registerForm.get('lastName')?.value,
          fotoPerfil: "assets/static/avatar.webp"
        };

        this.clienteService.create(cliente)
          .subscribe(res => {
            console.log(res)
          });

        this.router.navigate(['login']);
        }, 1500)
    }


  }

  logIn() {
    let contenedor = document.getElementById('contenedor') as HTMLElement;
    contenedor.classList.add('salir')

    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 1100)
  }

  onInputChangeLastName() {
    console.log(this.registerForm.get('lastName')?.value)
    this.lastNameError = !this.registerForm.get('lastName')?.value;

  }
  onInputChangeName() {
    this.nameError = !this.registerForm.get('name')?.value;

  }
  onInputChangePass() {
    this.passError = !this.registerForm.get('password')?.value;

  }
  onInputChangePassRep() {
    this.passRepError = !this.registerForm.get('passwordRep')?.value;

  }
  onInputChangeUserName() {
    this.userNameError = !this.registerForm.get('username')?.value;

  }


}
