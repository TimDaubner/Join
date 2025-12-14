import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  auth_service = inject(AuthService);

  isNewPos = false;
  isSignUp = false;
  
  ngOnInit(){
    setTimeout(()=>{
      this.isNewPos = true;
    },300)
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

  changeOverlayToSignUp(){
    this.isSignUp = true;
  }
  
  goBackToLogin(){
    this.isSignUp = false;
  }
}
