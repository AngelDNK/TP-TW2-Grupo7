import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../../servicios/productos';
import { Producto } from '../../../modelos/producto';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../servicios/auth';
import { CarritoService } from '../../../servicios/carrito';
import { FilterService, Filtros } from '../../../servicios/filter.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listado-productos.html',
  styleUrls: ['./listado-productos.css'],
})
export class ListadoProductos implements OnInit {
  productos: Producto[] = [];
  categorias: string[] = [];
  private router = inject(Router);
  isLoading = true;
  errorMensaje = '';
  search = '';
  categoriaSeleccionada = '';
  precioMax = 0;

  constructor(
    private productosService: ProductosService,
    public authService: AuthService,
    private carritoService: CarritoService,
    private filterService: FilterService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.cargarCategorias();

    this.filterService.filtros$.subscribe((filtros) => {
      this.search = filtros.search;
      this.categoriaSeleccionada = filtros.categoria;
      this.precioMax = filtros.precioMax;

      this.aplicarFiltros();
    });
  }

  limpiarFiltros() {
    this.search = '';
    this.categoriaSeleccionada = '';
    this.precioMax = 0;

    this.filterService.guardarFiltros({
      search: '',
      categoria: '',
      precioMax: 0
    });

    this.aplicarFiltros();
  }


  cargarCategorias() {
    this.productosService.obtenerProductos().subscribe({
      next: (data) => {
        this.categorias = Array.from(new Set(data.map((p) => p.clasificacion)));
      },
      error: () => {
        this.errorMensaje = 'Error al cargar categorías.';
      },
    });
  }

  aplicarFiltros() {
    this.isLoading = true;
    this.errorMensaje = '';

    this.productosService.obtenerProductos(this.search).subscribe({
      next: (data) => {
        let filtrados = data;

        if (this.categoriaSeleccionada) {
          filtrados = filtrados.filter((p) =>
            p.clasificacion === this.categoriaSeleccionada
          );
        }

        if (this.precioMax > 0) {
          filtrados = filtrados.filter((p) => p.precio <= this.precioMax);
        }

        this.productos = filtrados;
        this.isLoading = false;
      },
      error: () => {
        this.errorMensaje = 'Error al cargar productos.';
        this.isLoading = false;
      },
    });
  }

  verDetalle(id: number | undefined) {
    if (id) {
      this.router.navigate(['/producto', id]);
    }
  }

  actualizarFiltros() {
    const filtros: Filtros = {
      search: this.search,
      categoria: this.categoriaSeleccionada,
      precioMax: this.precioMax
    };

    this.filterService.guardarFiltros(filtros);
  }

  agregarAlCarrito(p: Producto) {
    this.carritoService.agregarProducto(p);
    this.toastr.success('Producto agregado al carrito', p.nombre);
  }

  eliminar(id?: number) {
    if (!id) return;

    const confirmado = confirm('¿Estás seguro de que deseas eliminar este producto?');

    if (confirmado) {
      this.productosService.eliminarProducto(id).subscribe({
        next: () => {
          this.toastr.success('Producto eliminado correctamente');
          this.aplicarFiltros();
        },
        error: (err) => {
          this.toastr.error('Error al eliminar el producto', 'Error');
          console.error(err);
        }
      });
    }
  }
}
