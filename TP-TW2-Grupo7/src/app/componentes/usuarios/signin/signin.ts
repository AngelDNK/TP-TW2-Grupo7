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

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.valid) {
      this.auth.signin(this.form.value).subscribe({
        next: () => this.mensaje = 'Inicio de sesión exitoso ✅',
        error: () => this.mensaje = 'Credenciales incorrectas ❌'
      });
    } else {
      this.mensaje = 'Complete los campos 🟡';
    }
  }
}