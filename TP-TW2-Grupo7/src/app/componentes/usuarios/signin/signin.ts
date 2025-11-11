import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, AuthResponse } from '../../../servicios/auth';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
     
  ],
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

    this.auth.login({ email, password }).subscribe({
      next: (res: AuthResponse) => {
        this.isLoading = false;
        this.mensaje = res.message || 'Inicio de sesión exitoso';
        this.tipoMensaje = 'success';

        if (res?.user) {
          // ✅ Guardar usuario logueado
          localStorage.setItem('usuario', JSON.stringify(res.user));

          // 🔹 Redirigir a productos
          setTimeout(() => this.router.navigate(['/productos']), 1200);
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error(err);
        this.mensaje = err.error?.message || 'Error al iniciar sesión';
        this.tipoMensaje = 'danger';
      }
    });

    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 4000);
  }
}