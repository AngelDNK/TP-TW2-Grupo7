import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,],
  template: `

    <router-outlet></router-outlet>

    <footer class="footer bg-dark text-light text-center py-3 mt-auto">
      <div class="container">
        <p class="mb-1 fw-bold">TP Taller Web 2 - Grupo 7</p>
        <p class="mb-0">Integrantes:</p>
        <small>
          BARREGO, LEANDRO EZEQUIEL |
          DANGELO, AGUSTIN ELIAN |
          DIAZ, DAMIAN VALENTIN |
          DI ROCCO DEL GIUDICE, GIULIANA |
          LEYES DELVALLE, ANGEL ANTONIO |
          PIEDRAFITA, SANTIAGO TOMÁS
        </small>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  `]
})
export class App {
  constructor(private router: Router) {}

  irSignup() {
    console.log('➡️ Intentando navegar a /signup');
    this.router.navigate(['/signup']);
  }
}