import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../servicios/auth';
import { Router } from '@angular/router';

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

  registrar() {
    if (this.form.valid) {
      const { nombre, apellido, direccion, email, password } = this.form.value;

      this.auth.signup({ nombre, apellido, direccion, email, password }).subscribe({
        next: (res) => {
          this.mensaje = res.message || 'Usuario registrado correctamente';
          this.tipoMensaje = 'success';

          // ✅ Limpiar formulario
          this.form.reset();

          // ✅ Redirigir al login después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/signin']);
          }, 2000);
        },
        error: (err) => {
          console.error(err);
          this.mensaje = err.error?.message || 'Error al registrar usuario';
          this.tipoMensaje = 'danger';
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
