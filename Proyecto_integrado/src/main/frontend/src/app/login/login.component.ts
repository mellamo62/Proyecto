import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientesService} from "../clientes.service";
import {Cliente} from "../modelos/cliente";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

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
        console.log(res)
        res.forEach(r => {
          clientes.push(r);
        })
        console.log(clientes)
        clientes.forEach(c => {
          if (this.loginForm.get('username')?.value == c.usuario) {
            this.cookieService.set("usuario", c.usuario);
            this.router.navigate(['home']);
          }
        })
      })
  }
}
