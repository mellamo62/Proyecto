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

  public peluquerias: any[];
  private name:string;
  private fav:number;
  public favoritos:any;
  public favoritosPeluqueria:any[];
  public favoritosArray:any[];
  public isCita:boolean;
  public expired:any[];
  public citas:any;

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
    this.isCita = false;
    this.expired = [];
    this.citas = [];
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

    let citasPedidas = this.route.snapshot.url[0].path;

    if (citasPedidas != "citasPedidas"){
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
            console.log(this.peluquerias)
          }, 200);

        }else {
          this.peluquerias = res;
        }

        this.favoritos.forEach((fav:any)=>{
          console.log(fav)
          this.favoritosArray.push(fav.peluqueria.idPeluqueria);
        })

      })
    }else{
      this.isCita = true;
      this.clienteService.getCitas(idCliente)
        .subscribe((res:any)=>{
          res.sort((a:any, b:any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
          let index=0
          this.citas = res;
          res.forEach((c:any)=>{
            c.peluqueria.id = c.id;
            c.fecha = new Date(c.fecha).getDate()+"/"+(new Date(c.fecha).getMonth()+1)+"/"+new Date(c.fecha).getFullYear();
            this.peluquerias.push(c.peluqueria)
            if (new Date(c.fecha).getTime() <= new Date().getTime()){
              this.expired.push(c.peluqueria.id);
            }
            index++;
          })

          console.log("peluquerias y citas")
          console.log(this.peluquerias)
          console.log(this.citas)

        })
    }

  }

  routePeluqueria(id:any) {
    if (!this.isCita){
      this.router.navigate(['/home/peluquerias/' + id]);
    }

  }


}
