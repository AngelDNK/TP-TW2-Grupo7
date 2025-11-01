import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../servicios/auth';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrls: ['./signin.css']
})
export class Signin {
  form: any;
  mensaje = '';
  tipoMensaje = ''; // "success", "danger", "warning"
isLoading: any;
password: any;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
  if (this.form.valid) {
    const { email, password } = this.form.value;

    this.auth.login({ email, password }).subscribe({
      next: (res) => {
        this.mensaje = res.message || 'Inicio de sesión exitoso';
        this.tipoMensaje = 'success';
      },
      error: (err) => {
        console.error(err);
        this.mensaje = err.error?.message || 'Error al iniciar sesión';
        this.tipoMensaje = 'danger';
      }
    });
  } else {
    this.mensaje = 'Complete los campos correctamente';
    this.tipoMensaje = 'warning';
  }

  setTimeout(() => {
    this.mensaje = '';
    this.tipoMensaje = '';
  }, 3000);
}
}