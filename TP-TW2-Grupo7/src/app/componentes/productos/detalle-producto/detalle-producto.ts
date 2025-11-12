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
  styleUrls: ['./detalle-producto.css'],
})
export class DetalleProducto implements OnInit {
  producto?: Producto;
  isLoading: boolean = true; 
  errorMensaje: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    public authService: AuthService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.isLoading = true;
        this.errorMensaje = '';
        this.producto = undefined; 

        this.productosService.obtenerProductoPorId(id).subscribe({
          next: (data) => {
            this.producto = data;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error al cargar el producto:', err);
            this.errorMensaje = `No se pudo cargar el producto (ID: ${id}).`;
            if (err.status === 404) {
              this.errorMensaje = 'Producto no encontrado.';
            }
            this.isLoading = false;
          },
        });
      }
    });
  }

  agregarAlCarrito(producto: Producto): void {
    if (!producto) return; 
    this.carritoService.agregarProducto(producto);
    alert('Producto agregado al carrito');
    console.log('Producto agregado al carrito:', producto.nombre);
  }
}