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

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.valid) {
      // Por ahora simulamos la respuesta del servidor:
      const { email, password } = this.form.value;

      if (email === 'admin@test.com' && password === '1234') {
        this.mensaje = 'Inicio de sesión exitoso';
        this.tipoMensaje = 'success';
      } else {
        this.mensaje = 'Credenciales incorrectas';
        this.tipoMensaje = 'danger';
      }
    } else {
      this.mensaje = 'Complete los campos';
      this.tipoMensaje = 'warning';
    }

    // Ocultar el mensaje automáticamente después de 3 segundos
    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 3000);
  }
}