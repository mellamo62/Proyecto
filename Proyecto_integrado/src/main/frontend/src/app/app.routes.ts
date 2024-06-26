import {Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {PeluqueriasComponent} from "./components/peluquerias/peluquerias.component";
import {PeluqueriaComponent} from "./components/peluqueria/peluqueria.component";
import {PedirCitaComponent} from "./components/pedir-cita/pedir-cita.component";
import {EditarPerfilComponent} from "./components/editar-perfil/editar-perfil.component";
import {PrincipalComponent} from "./components/principal/principal.component";
import {InicioComponent} from "./components/inicio/inicio.component";
import {RegisterComponent} from "./components/register/register.component";
import {CitaComponent} from "./components/cita/cita.component";


export const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'peluquerias', component: PeluqueriasComponent},
      {path: 'peluquerias/:id', component: PeluqueriaComponent},
      {path: 'peluquerias/nombre/:name', component: PeluqueriasComponent},
      {path: 'peluquerias/fav/:idCliente', component: PeluqueriasComponent},
      {path: 'citasPedidas', component: PeluqueriasComponent},
      {path: 'cita/:idCita/:idPeluqueria', component: CitaComponent},
      {path: 'peluquerias/cita/:idPeluqueria', component: PedirCitaComponent},
      {path: 'perfil/editar', component: EditarPerfilComponent},
      {path: '', component: PrincipalComponent}
    ]
  }
];
