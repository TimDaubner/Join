import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../shared/services/contact/contact.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  auth_service = inject(AuthService);
  contact_service = inject(ContactService);

  contact = {
    surname: "",
    lastname: "",
    mail: "",
    phone: "",
    color: "",
  }

  @ViewChild('mail') mail!: NgModel;
  @ViewChild('password') password!: NgModel;


  @ViewChild('firstName') firstName!: NgModel;
  @ViewChild('lastName') lastName!: NgModel;
  @ViewChild('mailSignUp') mailSignUp!: NgModel;
  @ViewChild('passwordSignUp') passwordSignUp!: NgModel;
  @ViewChild('confirm_password') confirm_password!: NgModel;
  @ViewChild('checkbox') checkbox!: NgModel;

  passwordIcon = './assets/icons/lock.svg';

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

  SignUp() {
    this.auth_service.createNewAccount(this.mail.value,this.password.value);
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

  onPasswordInput() {
    let input = this.auth_service.input_password;
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
    if (this.mail.valid && this.password.valid) {
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
    this.mail.control.markAsUntouched();
    this.mail.control.markAsPristine();
    this.password.control.markAsUntouched();
    this.password.control.markAsPristine();
  }
}
