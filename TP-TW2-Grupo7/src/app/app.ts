import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './servicios/auth';
import { SearchService } from './servicios/search';
import { CarritoService } from './servicios/carrito';
import { Observable } from 'rxjs';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './servicios/auth.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    
    <nav class="fixed w-full top-0 z-50 glass-effect md:p-0">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          
          <a class="text-xl font-bold text-white md:block hidden" routerLink="/">TP Taller Web 2 - Grupo 7</a>
          <a class="text-xl font-bold text-white md:hidden block" routerLink="/">TW2 - Grupo 7</a>

          
          <div class="hidden md:flex items-center space-x-4">
            <ng-container *ngIf="authService.obtenerUsuarioLogueado(); else noLogueadoDesktop">
            
              <a  *ngIf="authService.esCliente()" routerLink="/pedidos"
                 class="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                Mis pedidos
              </a>

              

              <a *ngIf="authService.esCliente()"
                 routerLink="/carrito"
                 class="text-gray-300 hover:text-white relative mx-3"
                 title="Ver carrito">

                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                  </path>
                </svg>

                <span *ngIf="(totalItemsCarrito$ | async) as total; else noItemsDesktop"
                      class="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold
                             rounded-full h-5 w-5 flex items-center justify-center">
                  {{ total }}
                </span>
                <ng-template #noItemsDesktop></ng-template>
              </a>

              
              <a (click)="logout()"
                 class="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer m-0">
                Cerrar sesión
              </a>
            </ng-container>

            <ng-template #noLogueadoDesktop>
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

         
          <button
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            type="button"
            (click)="toggleMenu()"
            aria-label="Abrir menú">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        
        <div *ngIf="isMenuOpen" class="md:hidden border-t border-slate-700">
         
          <ng-container *ngIf="authService.obtenerUsuarioLogueado(); else noLogueadoMobile">

            


            <div class="px-2 pb-2 space-y-2">

              
                <a *ngIf="authService.esCliente()" routerLink="/pedidos"
                class="w-full flex items-center justify-between text-gray-200 bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium mt-2">
                Mis pedidos
                </a>

              
              <a *ngIf="authService.esCliente()"
                 routerLink="/carrito"
                 (click)="closeMenu()"
                 class="w-full flex items-center justify-between text-gray-200 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md text-sm font-medium">
                <span>Ver carrito</span>

                <span class="relative">
                  <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                    </path>
                  </svg>

                  <span *ngIf="(totalItemsCarrito$ | async) as total"
                        class="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold
                               rounded-full h-4 w-4 flex items-center justify-center">
                    {{ total }}
                  </span>
                </span>
              </a>

              
              <button
                (click)="logout(true)"
                class="w-full text-left text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium">
                Cerrar sesión
              </button>
            </div>
          </ng-container>

          
          <ng-template #noLogueadoMobile>
            <div class="px-2 pt-2 pb-3 space-y-2">
              <a routerLink="/signin"
                 (click)="closeMenu()"
                 class="block text-gray-200 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md text-sm font-medium">
                Iniciar sesión
              </a>
              <a routerLink="/signup"
                 (click)="closeMenu()"
                 class="block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                Registrarse
              </a>
            </div>
          </ng-template>
        </div>
      </div>
    </nav>

    
    <router-outlet></router-outlet>

    
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
  isMenuOpen = false;

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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout(fromMobile: boolean = false): void {
    this.authService.logout();
    if (fromMobile) {
      this.closeMenu();
    }
    this.router.navigate(['/signin']);
  }
}
