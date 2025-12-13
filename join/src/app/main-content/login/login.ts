import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  auth_service = inject(AuthService);

  isNewPos = false;

  ngOnInit() {
    setTimeout(() => {
      this.isNewPos = true;
    }, 300);
  }

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
