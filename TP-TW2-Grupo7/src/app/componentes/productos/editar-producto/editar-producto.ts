import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductosService } from '../../../servicios/productos';
import { Producto } from '../../../modelos/producto';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './editar-producto.html',
  styleUrls: ['./editar-producto.css']
})

export class EditarProducto implements OnInit {
  form!: FormGroup;
  productoId!: number;
  isLoading = true;
  mensaje = '';
  tipoMensaje = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      clasificacion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productoId = Number(id);
        this.isLoading = true;
        this.mensaje = '';

        this.productosService.obtenerProductoPorId(this.productoId).subscribe({
          next: (producto) => {
            if (producto) {
              this.form.patchValue(producto);
            } else {
              this.mensaje = 'Producto no encontrado';
              this.tipoMensaje = 'error';
            }
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error al cargar el producto:', err);
            this.mensaje = 'Error al cargar el producto.';
            this.tipoMensaje = 'error';
            this.isLoading = false;
          }
        });
      } else {
        // Caso: No hay ID en la URL
        this.mensaje = 'ID de producto no válido.';
        this.tipoMensaje = 'error';
        this.isLoading = false;
      }
    });
  }

  guardar() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.mensaje = '⚠️ Complete todos los campos correctamente';
      this.tipoMensaje = 'warning';
      return;
    }

    const productoEditado: Producto = this.form.value;

    this.productosService.actualizarProducto(this.productoId, productoEditado).subscribe({
      next: () => {
        this.mensaje = '✅ Producto actualizado con éxito';
        this.tipoMensaje = 'success';

        setTimeout(() => {
          this.router.navigate(['/producto', this.productoId]);
        }, 1500);
      },
      error: (err) => {
        console.error('Error al actualizar el producto:', err);
        this.mensaje = '❌ Error al actualizar el producto.';
        this.tipoMensaje = 'error';
      }
    });
  }
}