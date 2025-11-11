import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './servicios/auth';
import { SearchService } from './servicios/search';
import { CarritoService } from './servicios/carrito';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <!-- INICIO: Navbar -->
    <nav class="bg-slate-800 text-white shadow-md border-b border-slate-700">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <a class="text-xl font-bold text-white" routerLink="/">TP Taller Web 2 - Grupo 7</a>

          <div class="flex-1 px-4 lg:px-12">
            <input
              type="text"
              class="w-full bg-slate-700 text-gray-200 placeholder-gray-400 px-4 py-2 rounded-md text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar producto..."
              (input)="onSearchChange($event)"
            />
          </div>

          <div class="flex items-center space-x-4">

            <!-- Estado: LOGUEADO (Usa tu lógica *ngIf) -->
            <ng-container *ngIf="authService.obtenerUsuarioLogueado(); else noLogueado">

              <a routerLink="/productos"
                 class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Productos
              </a>

              <a *ngIf="authService.esCliente()"
                 routerLink="/carrito"
                 class="text-gray-300 hover:text-white relative"
                 title="Ver carrito">

                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>

                <span *ngIf="(totalItemsCarrito$ | async) as total; else noItems"
                      class="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold
                             rounded-full h-5 w-5 flex items-center justify-center">
                  {{ total }}
                </span>
                <ng-template #noItems></ng-template>
                </a>

              <!-- Botón Cerrar Sesión (con tu (click)) -->
              <a (click)="logout()"
                 class="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                Cerrar sesión
              </a>
            </ng-container>

            <ng-template #noLogueado>
              <a routerLink="/signin"
                 class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Iniciar sesión
              </a>
              <a routerLink="/signup"
                 class="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Registrarse
              </a>
            </ng-template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido -->
    <router-outlet></router-outlet>

    <!-- FOOTER -->
    <footer class="bg-slate-800 text-gray-300 text-center py-4 mt-6">
      BARREGO, LEANDRO -  
      DANGELO, AGUSTIN - 
      DIAZ, DAMIAN -  
      DI ROCCO DEL GIUDICE, GIULIANA -   
      LEYES, ANGEL -  
      PIEDRAFITA, SANTIAGO 
    </footer>
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
totalItemsCarrito$: Observable<number>;

  constructor(
    public authService: AuthService,
    private router: Router,
    public searchService: SearchService,
    private carritoService: CarritoService
  ) {
    this.totalItemsCarrito$ = this.carritoService.totalItems$;
  }

  onSearchChange(event: any) {
    this.searchService.setSearchTerm(event.target.value);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}