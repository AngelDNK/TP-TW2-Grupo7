import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, AuthResponse } from '../../../servicios/auth';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrls: ['./signin.css']
})
export class Signin {
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.form.invalid) {
      this.mensaje = 'Complete los campos correctamente';
      this.tipoMensaje = 'warning';
      return;
    }

    this.isLoading = true;
    const { email, password } = this.form.value;

    // 🔹 Llamada al servicio
    this.auth.login({ email, password }).subscribe({
      next: (res: AuthResponse) => {
        this.isLoading = false;
        this.mensaje = res.message || 'Inicio de sesión exitoso';
        this.tipoMensaje = 'success';

        // ✅ Validación segura con encadenamiento opcional
        if (res?.user) {
          // Guardar usuario logueado en localStorage
          localStorage.setItem('usuario', JSON.stringify(res.user));

          // 🔹 Mostrar mensaje breve y redirigir según el rol
          setTimeout(() => {
            if (res.user?.rol === 'admin') {
              this.router.navigate(['/productos']);
            } else {
              this.router.navigate(['/carrito']); // se agregará luego
            }
          }, 1500);
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error(err);
        this.mensaje = err.error?.message || 'Error al iniciar sesión';
        this.tipoMensaje = 'danger';
      }
    });

    // 🔹 Limpieza del mensaje luego de unos segundos
    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 4000);
  }
}