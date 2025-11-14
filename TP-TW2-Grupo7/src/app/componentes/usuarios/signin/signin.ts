import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../servicios/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signin.html',
  styleUrls: ['./signin.css']
})
export class Signin {
  form: any;
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
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
        ]
      ]
    });
  }

  login() {
    if (this.form.valid) {
      this.isLoading = true;
      const { email, password } = this.form.value;

      this.auth.login({ email, password }).subscribe({
        next: (res) => {
          this.mensaje = res.message || 'Ingreso exitoso';
          this.tipoMensaje = 'success';

          if (res.user && typeof window !== 'undefined') {
            localStorage.setItem('usuario', JSON.stringify(res.user));
          }

          this.form.reset();

          setTimeout(() => {
            this.router.navigate(['/productos']);
            this.isLoading = false;
          }, 1500);
        },
        error: (err) => {
          console.error(err);
          this.mensaje = err.error?.message || 'Error al iniciar sesión';
          this.tipoMensaje = 'danger';
          this.isLoading = false;
        }
      });
    } else {
      if (this.form.controls['password'].errors?.['pattern']) {
        this.mensaje =
          'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
      } else {
        this.mensaje = 'Complete todos los campos correctamente.';
      }
      this.tipoMensaje = 'warning';
    }

    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 4000);
  }
}