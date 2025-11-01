import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../servicios/auth';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recuperar.html',
  styleUrls: ['./recuperar.css']
})
export class Recuperar {
  form: any;
  mensaje = '';
  tipoMensaje = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recuperar() {
    if (this.form.valid) {
      const { email } = this.form.value;

      this.auth.recuperar({ email }).subscribe({
        next: (res) => {
          this.mensaje = res.message || 'Correo de recuperación enviado';
          this.tipoMensaje = 'success';
        },
        error: (err) => {
          console.error(err);
          this.mensaje = err.error?.message || 'Error al recuperar contraseña';
          this.tipoMensaje = 'danger';
        }
      });
    } else {
      this.mensaje = 'Ingrese un email válido';
      this.tipoMensaje = 'warning';
    }

    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 3000);
  }
}