import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../../servicios/productos';
import { Producto } from '../../../modelos/producto';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../servicios/auth';
import { CarritoService } from '../../../servicios/carrito';
import { FilterService, Filtros } from '../../../servicios/filter.service';

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
  isLoading = true;
  errorMensaje = '';

  // 🔹 Variables del filtro
  search = '';
  categoriaSeleccionada = '';
  precioMax = 0;

  constructor(
    private productosService: ProductosService,
    public authService: AuthService,
    private carritoService: CarritoService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();

    this.filterService.filtros$.subscribe((filtros) => {
      this.search = filtros.search;
      this.categoriaSeleccionada = filtros.categoria;
      this.precioMax = filtros.precioMax;

      this.aplicarFiltros();
    });
  }

  cargarProductos() {
    this.isLoading = true;
    this.errorMensaje = '';

    this.productosService.obtenerProductos().subscribe({
      next: (data) => {
        this.todosLosProductos = data;
        this.categorias = Array.from(new Set(data.map((p) => p.clasificacion)));
        this.isLoading = false;

        this.aplicarFiltros();
      },
      error: () => {
        this.errorMensaje = 'Error al cargar productos.';
        this.isLoading = false;
      },
    });
  }

  // 🔹 Guarda filtros y los aplica
  actualizarFiltros() {
    const filtros: Filtros = {
      search: this.search,
      categoria: this.categoriaSeleccionada,
      precioMax: this.precioMax
    };

    this.filterService.guardarFiltros(filtros);
  }

  aplicarFiltros() {
    let filtrados = [...this.todosLosProductos];

    if (this.search.trim()) {
      filtrados = filtrados.filter((p) =>
        p.nombre.toLowerCase().includes(this.search.toLowerCase())
      );
    }

    if (this.categoriaSeleccionada) {
      filtrados = filtrados.filter((p) =>
        p.clasificacion === this.categoriaSeleccionada
      );
    }

    if (this.precioMax > 0) {
      filtrados = filtrados.filter((p) => p.precio <= this.precioMax);
    }

    this.productos = filtrados;
  }

  agregarAlCarrito(p: Producto) {
    this.carritoService.agregarProducto(p);
    alert('Producto agregado al carrito');
  }

  eliminar(id?: number) {
    if (!id) return;

    const confirmado = true;
    if (confirmado) {
      this.productosService.eliminarProducto(id).subscribe(() => {
        this.cargarProductos();
      });
    }
  }
}