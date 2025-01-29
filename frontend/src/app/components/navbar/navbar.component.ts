import { Component } from '@angular/core';
import { YesNoAlert } from 'src/app/alerts/alerts';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  email: string = "";

  constructor(
    private _authService: AuthService
  ) {
    this.email = _authService.getEmail() ?? "";
  }

  async logout(): Promise<void> {
    const result = await YesNoAlert("question", "¿Estás seguro de cerrar sesión?", "", "Si", "No");
    if (!result) { return; }
    this._authService.logout();
  }
}
