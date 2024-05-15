import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Peluqueria} from "../../modelos/peluqueria";
import {PeluqueriaService} from "../../services/peluqueria.service";
import {ClientesService} from "../../services/clientes.service";
import {CookieService} from "ngx-cookie-service";


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
  private fav:number;
  public favoritos:any;
  public favoritosPeluqueria:any[];
  public favoritosArray:any[];

  constructor(
    private route:ActivatedRoute,
    private peluqueriaService: PeluqueriaService,
    private clienteService: ClientesService,
    private router: Router,
    private coockieService: CookieService
  ) {
    this.peluquerias = [];
    this.name ="";
    this.fav =0;
    this.favoritosPeluqueria =[];
    this.favoritosArray =[];
  }

  ngOnInit() {
    let idCliente =Number.parseInt(this.coockieService.get('usuario'));
    this.clienteService.getFavCliente(idCliente)
    .subscribe((res:any)=>{
      this.favoritos = res;
      this.favoritos.forEach((f:any)=>{
        this.favoritosPeluqueria.push(f.peluqueria);
      })
      console.log("favorito")
      console.log(this.favoritosPeluqueria)
    });

    this.peluqueriaService.getAll().subscribe(res => {
      this.name = this.route.snapshot.params['name'];
      this.fav = this.route.snapshot.params['idCliente'];



      if (this.name){
        this.peluquerias = res.filter(p => p.nombre.includes(this.name));

      }else if(this.fav){
        setTimeout(()=>{
          this.favoritos.forEach((f:any) =>{
            this.peluquerias.push(f.peluqueria)
          })

        }, 200);

      }else {
        this.peluquerias = res;
        // console.log(this.favoritosPeluqueria)
        // this.peluquerias.forEach((f:any) =>{
        //   console.log("es favorita?")
        //   console.log(f);
        //
        //   console.log(this.favoritosPeluqueria.includes(f))
        // })
      }

      // console.log("bucle")
      // this.peluquerias.forEach(pelu =>{
      //   console.log(pelu)
      //   this.favoritosPeluqueria.forEach(fav =>{
      //     console.log(fav)
      //     if (pelu.idPeluqueria == fav.idPeluqueria){
      //       this.favoritosArray.push()
      //     }
      //
      //   })
      // })
      // console.log("array de fvoritos")
      // console.log(this.favoritosArray)

    })
  }

  routePeluqueria(id:any) {
    this.router.navigate(['/home/peluquerias/' + id]);
  }


}
