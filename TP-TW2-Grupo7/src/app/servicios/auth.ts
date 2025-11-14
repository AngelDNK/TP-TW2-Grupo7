import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterService } from './filter.service';

// URL base del backend
const API_URL = 'http://localhost:3000/api/auth';

const USER_KEY = 'usuario';
const TOKEN_KEY = 'auth_token';

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  direccion: string;
  email: string;
  rol: 'admin' | 'cliente';
}

export interface AuthResponse {
  message: string;
  user?: User;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private filterService: FilterService) { }

  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/signin`, data);
  }

  signup(data: { nombre: string; apellido: string; direccion: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/signup`, data);
  }

  recuperar(data: { email: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_URL}/recuperar`, data);
  }

  resetPassword(data: { token: string; nuevaPassword: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_URL}/reset-password`, data);
  }

  guardarSesion(response: AuthResponse): void {
    if (typeof window === 'undefined') return;

    if (response.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    }
    if (response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
    }
  }

  obtenerToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  obtenerUsuarioLogueado(): User | null {
    if (typeof window === 'undefined') return null;

    const usuarioStorage = localStorage.getItem(USER_KEY);
    return usuarioStorage ? (JSON.parse(usuarioStorage) as User) : null;
  }

  esAdmin(): boolean {
    const usuario = this.obtenerUsuarioLogueado();
    return usuario ? usuario.rol === 'admin' : false;
  }

  esCliente(): boolean {
    const usuario = this.obtenerUsuarioLogueado();
    return usuario ? usuario.rol === 'cliente' : false;
  }

  logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    this.filterService.limpiarFiltros();
  }
}
