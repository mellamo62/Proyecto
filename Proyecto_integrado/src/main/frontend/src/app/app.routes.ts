import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {PrincipalComponent} from "./principal/principal.component";

export const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'principal', component: PrincipalComponent}
    ]
  }
];
