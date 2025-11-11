import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './servicios/auth';
import { SearchService } from './servicios/search';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/">TP Taller Web 2 - Grupo 7</a>

        <!-- 🔍 Input de búsqueda -->
        <input
          type="text"
          class="form-control w-25 mx-3"
          placeholder="Buscar producto..."
          (input)="onSearchChange($event)"
        />

        <div class="d-flex" *ngIf="authService.obtenerUsuarioLogueado(); else noLogueado">
          <a routerLink="/productos" class="nav-link text-white">Productos</a>
          <a *ngIf="authService.esCliente()" routerLink="/carrito" class="nav-link text-white">
            Carrito
          </a>
          <a (click)="logout()" class="nav-link text-white">Cerrar sesión</a>
        </div>
        <ng-template #noLogueado>
          <div class="d-flex">
            <a routerLink="/signin" class="nav-link text-white">Iniciar sesión</a>
            <a routerLink="/signup" class="nav-link text-white">Registrarse</a>
            <a routerLink="/recuperar" class="nav-link text-white">Recuperar contraseña</a>
          </div>
        </ng-template>
      </div>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .nav-link {
        margin-left: 20px;
        cursor: pointer;
        text-decoration: none;
      }
      .nav-link:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class App {
  constructor(
    public authService: AuthService,
    private router: Router,
    public searchService: SearchService
  ) {}

  onSearchChange(event: any) {
    this.searchService.setSearchTerm(event.target.value); // 🔄 actualiza el término
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
