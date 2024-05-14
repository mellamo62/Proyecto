import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit{

  public usuarioId:any;

  constructor(private cookieService: CookieService) {
  }

  ngOnInit() {
    this.usuarioId = this.cookieService.get('usuario');
  }
}
