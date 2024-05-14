import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Peluqueria} from "../../modelos/peluqueria";
import {PeluqueriaService} from "../../services/peluqueria.service";
import {ClientesService} from "../../services/clientes.service";


@Component({
  selector: 'app-peluquerias',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage
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
    private clienteService: ClientesService,
    private router: Router
  ) {
    this.peluquerias = [];
    this.name ="";
    this.fav = 0;
  }

  ngOnInit() {

    let favorito:any;
    this.peluqueriaService.getAll().subscribe(res => {
      this.name = this.route.snapshot.params['name'];
      this.fav = this.route.snapshot.params['idCliente'];
      
      if (this.name){
        this.peluquerias = res.filter(p => p.nombre.includes(this.name));
      }else if(this.fav){
        this.clienteService.getFavCliente(this.fav)
          .subscribe((res:any)=>{
            favorito = res;
          });

        setTimeout(()=>{
          favorito.forEach((f:any) =>{
            this.peluquerias = res.filter(p=>{
              return p.idPeluqueria == f.peluqueria.idPeluqueria;
            })
          })

          console.log(this.peluquerias)

        }, 500);

      }else {
        this.peluquerias = res;
      }

    })
  }

  routePeluqueria(id:any) {
    this.router.navigate(['/home/peluquerias/' + id]);
  }


}
