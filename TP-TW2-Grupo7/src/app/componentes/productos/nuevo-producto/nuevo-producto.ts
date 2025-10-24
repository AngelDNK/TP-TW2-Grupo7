import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductosService } from '../../../servicios/productos';
import { Producto } from '../../../modelos/producto';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nuevo-producto.html',
  styleUrls: ['./nuevo-producto.css']
})
export class NuevoProducto implements OnInit {
  mensaje = '';
  tipoMensaje = '';
  form: any;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      clasificacion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]]
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.mensaje = '⚠️ Complete todos los campos correctamente';
      this.tipoMensaje = 'warning';
      return;
    }

    const nuevoProducto: Producto = this.form.value as Producto;

    this.productosService.crear(nuevoProducto).subscribe(() => {
      this.mensaje = '✅ Producto agregado con éxito';
      this.tipoMensaje = 'success';

      setTimeout(() => {
        this.router.navigate(['/productos']);
      }, 1500);
    });
  }
}