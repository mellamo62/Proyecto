import {Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {PeluqueriasComponent} from "./components/peluquerias/peluquerias.component";
import {PeluqueriaComponent} from "./components/peluqueria/peluqueria.component";
import {PedirCitaComponent} from "./components/pedir-cita/pedir-cita.component";
import {EditarPerfilComponent} from "./components/editar-perfil/editar-perfil.component";
import {PerfilComponent} from "./components/perfil/perfil.component";
import {PrincipalComponent} from "./components/principal/principal.component";


export const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'peluquerias', component: PeluqueriasComponent},
      {path: 'peluquerias/:id', component: PeluqueriaComponent},
      {path: 'peluquerias/nombre/:name', component: PeluqueriasComponent},
      {path: 'peluquerias/fav/:idCliente', component: PeluqueriasComponent},
      {path: 'peluquerias/cita/:idPeluqueria', component: PedirCitaComponent},
      {path: 'perfil', component: PerfilComponent},
      {path: 'perfil/:id', component: EditarPerfilComponent},
      {path: 'login', component: LoginComponent},
      {path: '', component: PrincipalComponent}
    ]
  }
];
