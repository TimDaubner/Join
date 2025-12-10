import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  auth_service = inject(AuthService);
  private router = inject(Router);
  loginAsGuest(){
    this.auth_service.login();
      this.router.navigate(['/summary']);
  }

  logoutFromJoin(){
    this.auth_service.logout();
  }
}
