import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../modelos/producto'; //

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private itemsSubject = new BehaviorSubject<ItemCarrito[]>([]);
  public items$ = this.itemsSubject.asObservable();

  constructor() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.itemsSubject.next(JSON.parse(carritoGuardado));
    }
  }

  agregarProducto(producto: Producto): void {
    const itemsActuales = this.itemsSubject.getValue();
    const itemExistente = itemsActuales.find(i => i.producto.id === producto.id);

    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      itemsActuales.push({ producto: producto, cantidad: 1 });
    }

    this.itemsSubject.next([...itemsActuales]);
    this.guardarEnLocalStorage();
  }

  eliminarItem(idProducto: number): void {
    const itemsActuales = this.itemsSubject.getValue();
    const itemsFiltrados = itemsActuales.filter(i => i.producto.id !== idProducto);

    this.itemsSubject.next(itemsFiltrados);
    this.guardarEnLocalStorage();
  }

  calcularTotal(): Observable<number> {
    return this.items$.pipe(
      map(items => items.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0))
    );
  }

  limpiarCarrito(): void {
    this.itemsSubject.next([]);
    this.guardarEnLocalStorage();
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem('carrito', JSON.stringify(this.itemsSubject.getValue()));
  }
}
