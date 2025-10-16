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
  this.mensaje = 'Se envió un mail de recuperación';
  this.tipoMensaje = 'success';
} else {
  this.mensaje = 'Ingrese un correo válido';
  this.tipoMensaje = 'warning';
}
setTimeout(() => { this.mensaje = ''; this.tipoMensaje = ''; }, 3000);
  }
}