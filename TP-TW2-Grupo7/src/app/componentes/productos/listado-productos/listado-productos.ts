import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ <-- agregá esto
import { ProductosService } from '../../../servicios/productos';
import { Producto } from '../../../modelos/producto';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../servicios/auth';
import { CarritoService } from '../../../servicios/carrito';
import { SearchService } from '../../../servicios/search';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // ✅ <-- agregalo acá también
  templateUrl: './listado-productos.html',
  styleUrls: ['./listado-productos.css'],
})
export class ListadoProductos implements OnInit {
  productos: Producto[] = [];
  todosLosProductos: Producto[] = [];
  categorias: string[] = [];
  categoriaSeleccionada: string = '';
  precioMax: number = 0;

  constructor(
    private productosService: ProductosService,
    public authService: AuthService,
    private carritoService: CarritoService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.searchService.searchTerm$.subscribe((term) => this.aplicarFiltros(term));
  }

  cargarProductos() {
    this.productosService.listar().subscribe((data) => {
      this.productos = data;
      this.todosLosProductos = data;
      this.categorias = Array.from(new Set(data.map((p) => p.clasificacion)));
    });
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
    alert('¡Producto agregado al carrito!');
  }

  eliminar(id?: number) {
    if (!id) return;
    if (confirm('¿Seguro que querés eliminar este producto?')) {
      this.productosService.eliminar(id).subscribe(() => {
        this.cargarProductos();
      });
    }
  }
}
