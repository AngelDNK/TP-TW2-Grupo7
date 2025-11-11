import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 🌐 URL base del backend
const API_URL = 'http://localhost:3000/api/auth';

// 🧩 Interfaces actualizadas según el nuevo modelo
export interface User {
  id: number;
  nombre: string;
  apellido: string;
  direccion: string;
  email: string;
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

  // 🔹 Obtener usuario logueado desde localStorage
  getUsuarioActual(): User | null {
    const userData = localStorage.getItem('usuario');
    return userData ? JSON.parse(userData) as User : null;
  }

  // 🔹 Cerrar sesión
  logout(): void {
    localStorage.removeItem('usuario');
  }
}