import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { CarritoService, ItemCarrito } from '../../servicios/carrito';
import { RouterLink, Router } from '@angular/router';
import { Producto } from '../../modelos/producto';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito implements OnInit {
  items$: Observable<ItemCarrito[]>;
  total$: Observable<number>;

  constructor(private carritoService: CarritoService, private router: Router) {
    this.items$ = this.carritoService.items$;
    this.total$ = this.carritoService.calcularTotal();
  }

  ngOnInit(): void { }

  imgErrorCarrito(event: Event, nombre: string) {
  const img = event.target as HTMLImageElement;
  img.src = `https://placehold.co/200x200/eeeeee/999999?text=${nombre}`;
}

  incrementar(producto: Producto) {
    this.carritoService.agregarProducto(producto);
  }

  decrementar(idProducto: number) {
    this.carritoService.restarProducto(idProducto);
  }

  eliminar(idProducto: number) {
    this.carritoService.eliminarItem(idProducto);
  }

  continuarCompra() {
    this.router.navigate(['/compra']);
  }
}
