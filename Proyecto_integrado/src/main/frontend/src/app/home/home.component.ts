import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {PeluqueriaService} from "../peluqueria.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private router: Router,
              private service: PeluqueriaService,
              private cookieService: CookieService) {
  }

  ngOnInit() {

    console.log(this.cookieService.get('logeado'));

  }

  routeSearch(name:string){
    this.router.navigate(['peluquerias/nombre/'+name]);
  }
}
