import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductosService } from '../../../servicios/productos';
import { Producto } from '../../../modelos/producto';
import { CarritoService } from '../../../servicios/carrito';
import { AuthService } from '../../../servicios/auth';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-producto.html',
  styleUrls: ['./detalle-producto.css']
})
export class DetalleProducto implements OnInit {
  producto?: Producto;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    public authService: AuthService,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.obtenerPorId(id).subscribe((data) => {
      this.producto = data;
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto);
    alert('¡Producto agregado al carrito!');
  }
}
