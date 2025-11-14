import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, AuthResponse } from '../../../servicios/auth';
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
         
        ]
      ]
    });
  }

  login() {
    if (this.form.valid) {
      this.isLoading = true;
      const { email, password } = this.form.value;

      this.auth.login({ email, password }).subscribe({
        next: (res: AuthResponse) => {
          this.mensaje = res.message || 'Ingreso exitoso';
          this.tipoMensaje = 'success';
         
          this.auth.guardarSesion(res);

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
      this.mensaje = 'Complete todos los campos correctamente.';
      this.tipoMensaje = 'warning';
    }

    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 4000);
  }
}
