import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
}
