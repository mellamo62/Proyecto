import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientesService} from "../../services/clientes.service";
import {Cliente} from "../../modelos/cliente";
import {Router, RouterLink} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {RegisterComponent} from "../register/register.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  public loginForm: FormGroup;
  public isIncorrect: boolean;

  constructor(private service: ClientesService,
              private router: Router,
              private cookieService: CookieService) {
    this.loginForm = new FormGroup({
      "username": new FormControl('', Validators.required),
      "password": new FormControl('', Validators.required)
    });
    this.isIncorrect = false;
  }


  submit() {
    let clientes: Cliente[] = [];
    this.service.getAll()
      .subscribe(res => {
        res.forEach(r => {
          clientes.push(r);
        })
        console.log(clientes)
        clientes.forEach((c:Cliente) => {
          if (this.loginForm.get('username')?.value == c.usuario && this.loginForm.get('password')?.value == c.password) {
            let ExpireSession = new Date();
            ExpireSession.setHours(ExpireSession.getHours() + 12)
            this.cookieService.set("usuario", c.idCliente.toString(),ExpireSession);
            let contenedor = document.getElementById("contenedor") as HTMLElement;

            contenedor.classList.add('salir');

            setTimeout(()=>{
              this.router.navigate(['/home']);
            },1100)
          }else{
            this.isIncorrect = true;
          }
        })
      })
  }

  register(){
    let contenedor = document.getElementById("contenedor") as HTMLElement;

    contenedor.classList.add('salir');

    setTimeout(()=>{
      this.router.navigate(['/register']);
    },1100)
  }
}
