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

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      direccion: ['', Validators.required]
    });
  }

  registrar() {
    if (this.form.valid) {
      this.auth.signup(this.form.value).subscribe({
        next: () => this.mensaje = 'Usuario registrado correctamente ✅',
        error: () => this.mensaje = 'Error al registrar ❌'
      });
    } else {
      this.mensaje = 'Complete todos los campos 🟡';
    }
  }
}