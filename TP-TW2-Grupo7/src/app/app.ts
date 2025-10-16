import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/">TP Taller Web 2 - Grupo 7</a>
        <div class="d-flex">
          <a routerLink="/signin" class="nav-link text-white">Iniciar sesión</a>
          <a routerLink="/signup" class="nav-link text-white">Registrarse</a>
          <a routerLink="/recuperar" class="nav-link text-white">Recuperar contraseña</a>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .nav-link {
      margin-left: 15px;
      cursor: pointer;
      text-decoration: none;
    }
    .nav-link:hover {
      text-decoration: underline;
    }
  `]
})
export class App {}