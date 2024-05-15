import { Component } from '@angular/core';
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
export class RegisterComponent {

  public registerForm: FormGroup;

  constructor(private clienteService: ClientesService,
              private router: Router,
              private cookieService: CookieService,
              private formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      "username": new FormControl('', Validators.required),
      "password": new FormControl('', [Validators.required, Validators.minLength(5)]),
      "passwordRep": new FormControl('', Validators.required),
      "name": new FormControl('', Validators.required),
      "lastName": new FormControl('', Validators.required)
    },{ validator: this.compararPassword });
  }

  compararPassword(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const passwordRep = formGroup.get('passwordRep')?.value;

    return password === passwordRep ? null : { contraseniasNoCoinciden: true };
  }

  submit(){

    let cliente:Cliente ={
      idCliente: 0,
      usuario: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      nombre: this.registerForm.get('name')?.value,
      apellidos: this.registerForm.get('lastName')?.value,
      fotoPerfil: "assets/static/avatar.webp"
    };

    this.clienteService.create(cliente)
      .subscribe(res=>{
        console.log(res)
      });

    this.router.navigate(['login']);
  }


}
