import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../servicios/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink // 👈 agregado para que funcione el enlace a /signin
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  form: FormGroup;
  mensaje = '';
  tipoMensaje = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
        ]
      ]
    });
  }

  registrar(): void {
    if (this.form.invalid) {
      if (this.form.controls['password'].errors?.['pattern']) {
        this.mensaje =
          'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
      } else {
        this.mensaje = 'Complete todos los campos correctamente.';
      }
      this.tipoMensaje = 'warning';
      return;
    }

    this.isLoading = true;
    const { nombre, apellido, direccion, email, password } = this.form.value;

    this.auth.signup({ nombre, apellido, direccion, email, password }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.mensaje = res.message || 'Usuario registrado correctamente';
        this.tipoMensaje = 'success';

        // ✅ Limpiar formulario
        this.form.reset();

        // ✅ Redirigir al login después de un breve mensaje
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.mensaje = err.error?.message || 'Error al registrar usuario';
        this.tipoMensaje = 'danger';
      }
    });

    // 🔹 Limpiar mensajes después de unos segundos
    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 4000);
  }
}