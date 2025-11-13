import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto'; // 👈 Tu interfaz de frontend

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  // Inyectamos HttpClient para hacer las llamadas a la API
  private http = inject(HttpClient);
  
  // Esta es la URL base de tu API de productos en el backend
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor() { }

  /**
   * (GET) Obtiene todos los productos del backend.
   * Llamado por: listado-productos.component.ts
   */
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  /**
   * (GET) Obtiene un producto específico por su ID.
   * Llamado por: detalle-producto.component.ts y editar-producto.component.ts
   */
  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  /**
   * (POST) Crea un nuevo producto en el backend.
   * Llamado por: nuevo-producto.component.ts
   */
  crearProducto(producto: Producto): Observable<Producto> {
    // El ID es opcional y no se envía al crear
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  /**
   * (PUT) Actualiza un producto existente en el backend.
   * Llamado por: editar-producto.component.ts
   */
  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  /**
   * (DELETE) Elimina un producto del backend.
   * Llamado por: editar-producto.component.ts (o listado-productos)
   */
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}