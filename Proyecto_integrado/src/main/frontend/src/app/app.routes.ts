import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {PrincipalComponent} from "./principal/principal.component";
import {PerfilComponent} from "./perfil/perfil.component";
import {PeluqueriasComponent} from "./peluquerias/peluquerias.component";
import {PeluqueriaComponent} from "./peluqueria/peluqueria.component";

export const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: 'peluquerias', component: PeluqueriasComponent},
      {path: 'peluquerias/:id', component:PeluqueriaComponent},
      {path: 'perfil', component: PerfilComponent},
      {path: 'login', component: LoginComponent},
      {path: '', component: PrincipalComponent}
    ]
  }
];
