import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../../servicios/productos';
import { Producto } from '../../../modelos/producto';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-producto.html',
  styleUrls: ['./editar-producto.css']
})
export class EditarProducto implements OnInit {
  form: any;
  productoId!: number;
  mensaje = '';
  tipoMensaje = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      clasificacion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]]
    });

    // Cargar datos existentes del producto
    this.productosService.obtenerPorId(this.productoId).subscribe((producto) => {
      if (producto) {
        this.form.patchValue(producto);
      } else {
        this.mensaje = 'Producto no encontrado';
        this.tipoMensaje = 'danger';
      }
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.mensaje = 'Complete todos los campos correctamente';
      this.tipoMensaje = 'warning';
      return;
    }

    const productoEditado: Producto = {
      id: this.productoId,
      ...this.form.value
    };

    // Por ahora simulamos la actualización en memoria
    this.productosService.eliminar(this.productoId).subscribe(() => {
      this.productosService.crear(productoEditado).subscribe(() => {
        this.mensaje = '✅ Producto actualizado con éxito';
        this.tipoMensaje = 'success';

        setTimeout(() => {
          this.router.navigate(['/productos']);
        }, 1500);
      });
    });
  }
}