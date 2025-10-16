import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Producto } from '../modelos/producto';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  // URL del backend (la usaremos más adelante)
  private API_URL = 'http://localhost:4200/api/productos';

  // Simulamos una lista de productos local por ahora
  private productosMock: Producto[] = [
    { id: 1, nombre: 'Auriculares Gamer', descripcion: 'Con luces RGB', clasificacion: 'Tecnología', precio: 25000 },
    { id: 2, nombre: 'Teclado Mecánico', descripcion: 'Switch Blue', clasificacion: 'Tecnología', precio: 30000 },
    { id: 3, nombre: 'Mouse Inalámbrico', descripcion: 'Sensor óptico', clasificacion: 'Accesorios', precio: 15000 },
  ];

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  listar(): Observable<Producto[]> {
    // Más adelante será: return this.http.get<Producto[]>(this.API_URL);
    return of(this.productosMock);
  }

  // Obtener un producto por ID
  obtenerPorId(id: number): Observable<Producto | undefined> {
    // Más adelante será: return this.http.get<Producto>(`${this.API_URL}/${id}`);
    const producto = this.productosMock.find(p => p.id === id);
    return of(producto);
  }

  // Crear un nuevo producto
  crear(producto: Producto): Observable<Producto> {
    // Más adelante será: return this.http.post<Producto>(this.API_URL, producto);
    producto.id = this.productosMock.length + 1;
    this.productosMock.push(producto);
    return of(producto);
  }

  // Eliminar producto por ID
  eliminar(id: number): Observable<void> {
    // Más adelante será: return this.http.delete<void>(`${this.API_URL}/${id}`);
    this.productosMock = this.productosMock.filter(p => p.id !== id);
    return of();
  }
}