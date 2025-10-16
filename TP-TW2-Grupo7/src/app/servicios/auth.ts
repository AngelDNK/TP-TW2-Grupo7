import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:4200/api/usuarios';

  constructor(private http: HttpClient) {}

  signup(datos: any): Observable<any> {
    return this.http.post(`${this.API_URL}/signup`, datos);
  }

  signin(datos: any): Observable<any> {
    return this.http.post(`${this.API_URL}/signin`, datos);
  }

  recuperar(email: string): Observable<any> {
    return this.http.post(`${this.API_URL}/recuperar`, { email });
  }
}