import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterService } from './filter.service';
import { environment } from '../../environments/environment';

const API_URL = `${environment.apiUrl}/auth`;
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
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  public estaLogueado$: Observable<boolean>;
  public esAdmin$: Observable<boolean>;
  public esCliente$: Observable<boolean>;

  constructor(private http: HttpClient, private filterService: FilterService) {
    const savedUser = this.obtenerUsuarioStorage();
    this.currentUserSubject = new BehaviorSubject<User | null>(savedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();

    this.estaLogueado$ = this.currentUser$.pipe(map(user => !!user));
    this.esAdmin$ = this.currentUser$.pipe(map(user => user?.rol === 'admin'));
    this.esCliente$ = this.currentUser$.pipe(map(user => user?.rol === 'cliente'));
  }

  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/signin`, data);
  }

  signup(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/signup`, data);
  }

  recuperar(data: { email: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_URL}/recuperar`, data);
  }

  resetPassword(data: { token: string; nuevaPassword: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_URL}/reset-password`, data);
  }

  guardarSesion(response: AuthResponse): void {
    if (!response) return;

    if (response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
    }

    if (response.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      this.currentUserSubject.next(response.user);
    }
  }

  private obtenerUsuarioStorage(): User | null {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  obtenerToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    this.filterService.limpiarFiltros();

    this.currentUserSubject.next(null);
  }
}