import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../servicios/auth';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword implements OnInit {
  form!: FormGroup;
  mensaje = '';
  tipoMensaje = '';
  token = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    this.form = this.fb.group({
      nuevaPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  resetPassword(): void {
    if (this.form.invalid) {
      this.mensaje = 'La contraseña debe tener al menos 8 caracteres.';
      this.tipoMensaje = 'warning';
      return;
    }

    const nuevaPassword = this.form.value.nuevaPassword;

    this.auth.resetPassword({ token: this.token, nuevaPassword }).subscribe({
      next: (res: { message: string }) => {
        this.mensaje = res.message;
        this.tipoMensaje = 'success';
        setTimeout(() => this.router.navigate(['/signin']), 2500);
      },
      error: (err: any) => {
        console.error(err);
        this.mensaje = err.error?.message || 'Error al restablecer la contraseña';
        this.tipoMensaje = 'danger';
      }
    });
  }
}
