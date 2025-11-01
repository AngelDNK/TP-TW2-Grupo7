import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// URL base del backend
const API_URL = 'http://localhost:3000/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // 🔹 LOGIN
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/signin`, data);
  }

  // 🔹 REGISTRO
  signup(data: { nombre: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/signup`, data);
  }

  // 🔹 RECUPERAR CONTRASEÑA
  recuperar(data: { email: string }): Observable<any> {
    return this.http.post(`${API_URL}/recuperar`, data);
  }
}