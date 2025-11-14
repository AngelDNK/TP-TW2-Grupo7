import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiUrl = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) { }

  crear(pedido: any): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
