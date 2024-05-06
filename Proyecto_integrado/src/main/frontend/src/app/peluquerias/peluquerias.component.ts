import {Component, Input, OnInit} from '@angular/core';
import {PeluqueriaService} from "../peluqueria.service";
import {Peluqueria} from "../modelos/peluqueria";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-peluquerias',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './peluquerias.component.html',
  styleUrl: './peluquerias.component.css'
})
export class PeluqueriasComponent implements OnInit {

  public peluquerias: Peluqueria[];
  private name:string;
  private fav: number;

  constructor(
    private route:ActivatedRoute,
    private peluqueriaService: PeluqueriaService,
    private router: Router
  ) {
    this.peluquerias = [];
    this.name ="";
    this.fav = 0;
  }

  ngOnInit() {

    this.peluqueriaService.getAll().subscribe(res => {
      this.name = this.route.snapshot.params['name'];
      this.fav = this.route.snapshot.params['fav'];
      console.log(this.name)
      if (this.name){
        this.peluquerias = res.filter(p => p.nombre.includes(this.name));
      }else if(this.fav >= 0){
        console.log(this.fav)
      }else {
        this.peluquerias = res;
      }

    })
  }

  routePeluqueria(id:any) {
    this.router.navigate(['/peluquerias/' + id]);
  }
}
