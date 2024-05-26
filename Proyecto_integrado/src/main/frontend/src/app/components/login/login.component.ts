import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientesService} from "../../services/clientes.service";
import {Cliente} from "../../modelos/cliente";
import {Router, RouterLink} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  public loginForm: FormGroup;

  constructor(private service: ClientesService,
              private router: Router,
              private cookieService: CookieService) {
    this.loginForm = new FormGroup({
      "username": new FormControl('', Validators.required),
      "password": new FormControl('', Validators.required)
    });
  }


  submit() {
    let clientes: Cliente[] = [];
    this.service.all()
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
