import { Component, inject, ViewChild } from '@angular/core';
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

  //uid quick access

  userLoggedIn: string = 'Guest';



  @ViewChild('mail') mailModel!: NgModel;
  @ViewChild('passwordModel') passwordModel!: NgModel;


  @ViewChild('firstName') firstName!: NgModel;
  @ViewChild('lastName') lastName!: NgModel;
  @ViewChild('mailSignUp') mailSignUp!: NgModel;
  @ViewChild('passwordSignUp') passwordSignUp!: NgModel;
  @ViewChild('confirm_password') confirm_password!: NgModel;
  @ViewChild('checkbox') checkbox!: NgModel;

  passwordIcon = './assets/icons/lock.svg';
  passwordValue: string = '';
  mailValue: string = '';

  isNewPos = false;
  isSignUp = false;
  isVisible = false;
  isChecked = false;

  firstPassword: string = '';
  confirmPassword: string = '';

  ngOnInit() {
    setTimeout(() => {
      this.isNewPos = true;
    }, 300)
  }

  async SignUp() {
    await this.auth_service.createNewAccount(this.auth_service.contact.mail, this.firstPassword);
  }

  async loginAsGuest() {
    await this.auth_service.loginAsGuest();
  }

  async loginUser() {
    await this.auth_service.loginUser(this.mailValue, this.passwordValue);
  }

  async logoutFromJoin() {
    await this.auth_service.logout();
  }

  changeOverlayToSignUp() {
    this.isSignUp = true;
  }

  goBackToLogin() {
    this.isSignUp = false;
  }

  toggleVisibility() {
    if (this.isVisible) {
      this.isVisible = false
    }
    else {
      this.isVisible = true;
    }
    this.onPasswordInput();
  }

  toggleVisibilityP() {
    if (this.isVisible) {
      this.isVisible = false
    }
    else {
      this.isVisible = true;
    }
    this.onPasswordInputP();
  }

  toggleVisibilityCP() {
    if (this.isVisible) {
      this.isVisible = false
    }
    else {
      this.isVisible = true;
    }
    this.onPasswordInputCP();
  }

  onPasswordInput() {
    let input = this.passwordValue;
    if (input == '') {
      this.passwordIcon = './assets/icons/lock.svg'
    }
    else if (input.length > 0 && !this.isVisible) {
      this.passwordIcon = './assets/icons/visibility_off.svg'
    }
    else if (input.length > 0 && this.isVisible) {
      this.passwordIcon = './assets/icons/visibility.svg'
    }
  }

  onPasswordInputP() {
    let input = this.firstPassword;
    if (input == '') {
      this.passwordIcon = './assets/icons/lock.svg'
    }
    else if (input.length > 0 && !this.isVisible) {
      this.passwordIcon = './assets/icons/visibility_off.svg'
    }
    else if (input.length > 0 && this.isVisible) {
      this.passwordIcon = './assets/icons/visibility.svg'
    }
  }

  onPasswordInputCP() {
    let input = this.confirmPassword;
    if (input == '') {
      this.passwordIcon = './assets/icons/lock.svg'
    }
    else if (input.length > 0 && !this.isVisible) {
      this.passwordIcon = './assets/icons/visibility_off.svg'
    }
    else if (input.length > 0 && this.isVisible) {
      this.passwordIcon = './assets/icons/visibility.svg'
    }
  }

  checkCorrectInput() {
    if (this.mailModel.valid && this.passwordModel.valid) {
      return true;
    }
    return false;
  }

  toggleCheckbox() {
    if (!this.isChecked) {
      this.isChecked = true;
    }
    else {
      this.isChecked = false;
    }
  }

  resetForm() {
    this.mailModel.control.markAsUntouched();
    this.mailModel.control.markAsPristine();
    this.passwordModel.control.markAsUntouched();
    this.passwordModel.control.markAsPristine();
  }

}
