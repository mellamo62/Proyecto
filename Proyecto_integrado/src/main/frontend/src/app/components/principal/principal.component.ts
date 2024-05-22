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

  constructor(private cookieService: CookieService, private router: Router) {
  }

  ngOnInit() {
    this.usuarioId = this.cookieService.get('usuario');
  }

  citas(option:number){
    console.log("citas")
    let principal = document.getElementById('bloque') as HTMLElement
    principal.classList.add('irse');
    setTimeout(()=>{
      switch (option){
        case 0:
          this.router.navigate(["/home/citasPedidas"]);
          break;
        case 1:
          this.router.navigate(['/home/peluquerias/fav/'+this.usuarioId]);
          break;
        case 2:
          this.router.navigate(["/home/peluquerias"]);
          break;
      }

    },1250)

  }
}
