import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Producto } from '../../../modelos/producto';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listado-productos.html',
  styleUrls: ['./listado-productos.css']
})
export class ListadoProductos {
  productos: Producto[] = [
    { id: 1, nombre: 'Auriculares Gamer', descripcion: 'Con luces RGB', clasificacion: 'Tecnología', precio: 25000 },
    { id: 2, nombre: 'Teclado Mecánico', descripcion: 'Switch Blue', clasificacion: 'Tecnología', precio: 30000 },
    { id: 3, nombre: 'Mouse Inalámbrico', descripcion: 'Sensor óptico', clasificacion: 'Accesorios', precio: 15000 },
  ];
}