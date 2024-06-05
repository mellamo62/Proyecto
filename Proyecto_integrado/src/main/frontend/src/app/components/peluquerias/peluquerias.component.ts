import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Peluqueria} from "../../modelos/peluqueria";
import {PeluqueriaService} from "../../services/peluqueria.service";
import {ClientesService} from "../../services/clientes.service";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-peluquerias',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink
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
  public expired:any[];
  public citas:any;
  public isCita:boolean;
  public noCita:boolean;
  public isFav:boolean;
  public noFav:boolean;

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
    this.noCita = false;
    this.isFav = false;
    this.noFav = false;
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


    let citasPedidas = this.route.snapshot.url[0].path;

    if (citasPedidas != "citasPedidas"){
      this.peluqueriaService.getAll().subscribe(res => {
        this.name = this.route.snapshot.params['name'];
        this.fav = this.route.snapshot.params['idCliente'];

        if (this.name){
          this.peluquerias = res.filter(p => p.nombre.includes(this.name));

        }else if(this.fav){
          this.isFav = true;
          setTimeout(()=>{
            this.favoritos.forEach((f:any) =>{
              this.peluquerias.push(f.peluqueria)
            })
            if (this.peluquerias.length ==0){
              this.noFav = true;
            }
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
          res.sort((a:any, b:any) =>{
          const dateComparison = new Date(b.fecha).getTime() - new Date(a.fecha).getTime();

          if (dateComparison !== 0) {
            return dateComparison;
          } else {
            const timeA = a.hora.split(':').map(Number);
            const timeB = b.hora.split(':').map(Number);

            const totalSecondsA = timeA[0] * 3600;
            const totalSecondsB = timeB[0] * 3600;

            return totalSecondsB - totalSecondsA;
          }});
          let index=0
          this.citas = res;
          if (this.citas.length == 0){
            this.noCita = true;
          }
          res.forEach((c:any)=>{
            c.peluqueria.id = c.id;
            c.fecha = new Date(c.fecha).getFullYear()+"-"+ ((new Date(c.fecha).getMonth()+1 < 10) ? 0 : "") + (new Date(c.fecha).getMonth()+1)+"-"+new Date(c.fecha).getDate();
            this.peluquerias.push(c.peluqueria)
            console.log(c.fecha)
            let fecha = new Date(c.fecha)
            let fechaCita = fecha.getTime();
            let hoy:any = new Date();
            hoy.setHours(0,0,0,0)
            hoy = hoy.getTime();
            let horaCita = c.hora.split(':');
            console.log("horas")
            console.log(fechaCita)
            console.log(hoy)
            console.log(new Date().getHours() >= horaCita[0])
            if (fechaCita < hoy){
              console.log("entro en la primera")
              this.expired.push(c.peluqueria.id);
            }else if (fechaCita == hoy && new Date().getHours() <= horaCita[0]){
              console.log("entro en la segunda")
              this.expired.push(c.peluqueria.id);
            }
            index++;
          })
          console.log(this.expired)
        })
    }
    setTimeout(()=>{
      console.log("peluquerias y citas")
      console.log(this.peluquerias)
      console.log(this.citas)
    },1000)

    });
  }

  routePeluqueria(peluqueria:any) {

    let contenedor = document.getElementById('contenedor') as HTMLElement;
    contenedor.classList.add('salir')

    if (!this.isCita){

      setTimeout(()=>{
        this.router.navigate(['/home/peluquerias/' + peluqueria.idPeluqueria]);
      }, 1400)
    }else{
      setTimeout(()=>{
        console.log(peluqueria)
        this.router.navigate(['/home/cita/' + peluqueria.id+"/"+peluqueria.idPeluqueria]);
      }, 1400)
    }


  }


}
