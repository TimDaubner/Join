import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  auth_service = inject(AuthService);
  
  async loginAsGuest() {
  this.auth_service.loginAsGuest();
  }

  loginUser() {
    this.auth_service.loginUser();
  }

  logoutFromJoin() {
    this.auth_service.logout();
  }
}
