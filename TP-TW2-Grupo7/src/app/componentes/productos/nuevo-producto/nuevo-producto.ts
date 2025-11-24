import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductosService } from '../../../servicios/productos';
import { Producto } from '../../../modelos/producto';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nuevo-producto.html',
  styleUrls: ['./nuevo-producto.css'],
})

export class NuevoProducto implements OnInit {
  mensaje = '';
  tipoMensaje = '';
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      clasificacion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]],
      imagen: ['', Validators.required],
    });
  }


  onFileSelected(event: any) {
  const file: File = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const base64String = reader.result as string;
    this.form.patchValue({ imagen: base64String });
  };

  reader.readAsDataURL(file);
}


  guardar() {
    this.mensaje = '';
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.mensaje = 'Complete todos los campos correctamente';
      this.tipoMensaje = 'warning';
      return;
    }

    const nuevoProducto: Producto = this.form.value as Producto;

    this.productosService.crearProducto(nuevoProducto).subscribe({
      next: () => {
        this.mensaje = 'Producto agregado con éxito';
        this.tipoMensaje = 'success';

        setTimeout(() => {
          this.router.navigate(['/productos']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error al crear el producto:', err);
        this.mensaje = 'Error al guardar el producto. Verifique los datos o intente más tarde.';
        this.tipoMensaje = 'error';
      }
    });
  }
}
