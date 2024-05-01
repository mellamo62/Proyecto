import {Component, OnInit} from '@angular/core';
import {PeluqueriaService} from "../peluqueria.service";
import {Peluqueria} from "../peluqueria";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-peluquerias',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './peluquerias.component.html',
  styleUrl: './peluquerias.component.css'
})
export class PeluqueriasComponent implements OnInit {

  public peluquerias: Peluqueria[];

  constructor(
    private peluqueriaService: PeluqueriaService,
    private router: Router
  ) {
    this.peluquerias = [];
  }

  ngOnInit() {
    this.peluqueriaService.getAll().subscribe(res => {
      this.peluquerias = res;
    })
  }

  routePeluqueria(id:any) {
    this.router.navigate(['/peluquerias/' + id]);
  }
}
