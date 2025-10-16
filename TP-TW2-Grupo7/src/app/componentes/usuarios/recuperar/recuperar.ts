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

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recuperar() {
    if (this.form.valid) {
      this.auth.recuperar(this.form.value.email!).subscribe({
        next: () => this.mensaje = 'Se envió un mail de recuperación 📩',
        error: () => this.mensaje = 'Error al enviar correo ❌'
      });
    } else {
      this.mensaje = 'Ingrese un correo válido 🟡';
    }
  }
}