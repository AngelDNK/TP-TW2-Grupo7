import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../servicios/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  form: any;
  mensaje = '';
  tipoMensaje = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  registrar() {
    if (this.form.valid) {
      const { nombre, email, password } = this.form.value;

      this.auth.signup({ nombre, email, password }).subscribe({
        next: (res) => {
          this.mensaje = res.message || 'Usuario registrado correctamente';
          this.tipoMensaje = 'success';
        },
        error: (err) => {
          console.error(err);
          this.mensaje = err.error?.message || 'Error al registrar usuario';
          this.tipoMensaje = 'danger';
        }
      });
    } else {
      this.mensaje = 'Complete todos los campos correctamente';
      this.tipoMensaje = 'warning';
    }

    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 3000);
  }
}