import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../../servicios/productos';
import { Producto } from '../../../modelos/producto';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../servicios/auth';
import { CarritoService } from '../../../servicios/carrito';
import { SearchService } from '../../../servicios/search';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listado-productos.html',
  styleUrls: ['./listado-productos.css'],
})
export class ListadoProductos implements OnInit {
  productos: Producto[] = [];
  todosLosProductos: Producto[] = [];
  categorias: string[] = [];
  categoriaSeleccionada: string = '';
  precioMax: number = 0;
  isLoading: boolean = true;
  errorMensaje: string = '';

  private router = inject(Router);

  constructor(
    private productosService: ProductosService,
    public authService: AuthService,
    private carritoService: CarritoService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.searchService.searchTerm$.subscribe((term) => this.aplicarFiltros(term));
  }

  cargarProductos() {
    this.isLoading = true;
    this.errorMensaje = '';
    this.productosService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.todosLosProductos = data;
        this.categorias = Array.from(new Set(data.map((p) => p.clasificacion)));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.errorMensaje = 'Error al cargar productos. Intente más tarde.';
        this.isLoading = false;
      },
    });
  }

  verDetalle(id: number | undefined) {
    if (id) {
      this.router.navigate(['/producto', id]);
    }
  }

  aplicarFiltros(searchTerm: string = '') {
    let filtrados = [...this.todosLosProductos];

    if (searchTerm.trim()) {
      filtrados = filtrados.filter((p) =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (this.categoriaSeleccionada) {
      filtrados = filtrados.filter((p) => p.clasificacion === this.categoriaSeleccionada);
    }

    if (this.precioMax > 0) {
      filtrados = filtrados.filter((p) => p.precio <= this.precioMax);
    }

    this.productos = filtrados;
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto);
    alert('Producto agregado al carrito');
    console.log('Producto agregado al carrito:', producto.nombre);
  }

  eliminar(id?: number) {
    if (!id) return;

    const confirmado = true;

    if (confirmado) {
      this.productosService.eliminarProducto(id).subscribe({
        next: () => {
          console.log('Producto eliminado');
          this.cargarProductos();
        },
        error: (err) => {
          console.error('Error al eliminar el producto:', err);
          this.errorMensaje = 'Error al eliminar el producto.';
        },
      });
    }
  }
}