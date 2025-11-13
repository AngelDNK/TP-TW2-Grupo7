import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 🌐 URL base del backend
const API_URL = 'http://localhost:3000/api/auth';

// 🧩 Interfaces para tipar correctamente
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
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // 🔹 LOGIN
  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/signin`, data);
  }

  // 🔹 REGISTRO
  signup(data: { nombre: string; apellido: string; direccion: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/signup`, data);
  }

  // 🔹 RECUPERAR CONTRASEÑA
  recuperar(data: { email: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_URL}/recuperar`, data);
  }

  // 🔹 RESTABLECER CONTRASEÑA (para el link del email)
  resetPassword(data: { token: string; nuevaPassword: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_URL}/reset-password`, data);
  }

  // 🔹 Obtener usuario logueado
  obtenerUsuarioLogueado(): User | null {
    if (typeof window === 'undefined') return null;

    const usuarioStorage = localStorage.getItem('usuario');
    return usuarioStorage ? (JSON.parse(usuarioStorage) as User) : null;
  }

  // 🔹 Roles (en caso de necesitarlo en el futuro)
  esAdmin(): boolean {
    const usuario = this.obtenerUsuarioLogueado();
    return usuario ? usuario.rol === 'admin' : false;
  }

  esCliente(): boolean {
    const usuario = this.obtenerUsuarioLogueado();
    return usuario ? usuario.rol === 'cliente' : false;
  }

  // 🔹 Logout
  logout(): void {
    localStorage.removeItem('usuario');
  }
}