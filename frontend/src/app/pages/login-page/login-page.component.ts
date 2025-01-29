import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SmallIconAllert, YesNoAlert } from 'src/app/alerts/alerts';
import { AuthService } from 'src/app/services/auth.service';
import { AuthResponse } from 'src/app/types/auth.response.type';
import { ApiResponse } from 'src/app/types/response-api.type';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  loading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.redirectIfAuthenticated();
  }

  redirectIfAuthenticated() {
    if (this._authService.getToken()) {
      this._router.navigate(['/dashboard']);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get emailErrorMessage(): string {
    if (this.email?.hasError('required')) return 'El email es obligatorio.';
    if (this.email?.hasError('email')) return 'Por favor introduce un email válido.';
    return '';
  }

  async onSubmit(): Promise<void> {
    if (!this.loginForm.valid) { return; }
    this.loading = true;

    this._authService
      .login(this.loginForm.value)
      .subscribe(async (res: AuthResponse | ApiResponse) => {
        this.loading = false;
        if ((res as ApiResponse).status === 500) {
          const result = await YesNoAlert(
            "info", "No se ha encontrado el email", "¿Te gustaría registrarte?", "Si", "No"
          )

          if (result) this.onRegister();
          return;
        } else {
          SmallIconAllert('success', 'Inicio de sesión exitoso');
          this._router.navigate(['/dashboard']);
        }
      });
  }

  async onRegister(): Promise<void> {
    this._authService
      .register(this.loginForm.value)
      .subscribe(async (res: AuthResponse | ApiResponse) => {
        this.loading = false;
        if ((res as ApiResponse).status === 500) {
          SmallIconAllert('error', 'Ha ocurrido un error al registrarte');
          return;
        } else {
          SmallIconAllert('success', 'Inicio de sesión exitoso');
          this._router.navigate(['/dashboard']);
        }
      })
  }
}
