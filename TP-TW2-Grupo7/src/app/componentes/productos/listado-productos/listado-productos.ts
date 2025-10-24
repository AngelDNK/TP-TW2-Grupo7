import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../servicios/productos';
import { Producto } from '../../../modelos/producto';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listado-productos.html',
  styleUrls: ['./listado-productos.css']
})
export class ListadoProductos implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.listar().subscribe((data) => {
      this.productos = data;
    });
  }

  eliminar(id?: number) {
    if (!id) return;
    if (confirm('¿Seguro que querés eliminar este producto?')) {
      this.productosService.eliminar(id).subscribe(() => {
        this.cargarProductos(); // recarga la lista
      });
    }
  }
}