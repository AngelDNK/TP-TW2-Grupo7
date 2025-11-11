import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { CarritoService, ItemCarrito } from '../../servicios/carrito';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class CarritoComponent implements OnInit {
  items$: Observable<ItemCarrito[]>;
  total$: Observable<number>;

  constructor(private carritoService: CarritoService) {
    this.items$ = this.carritoService.items$;
    this.total$ = this.carritoService.calcularTotal();
  }

  ngOnInit(): void {}

  eliminar(idProducto: number) {
    this.carritoService.eliminarItem(idProducto);
  }

  simularCompra() {
    // falta logica de la compra
    alert('¡Compra simulada con éxito! (WIP)');
    this.carritoService.limpiarCarrito();
  }
}
