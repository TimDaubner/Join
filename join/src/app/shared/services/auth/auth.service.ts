import { Injectable, inject} from '@angular/core';
import { Firestore} from '@angular/fire/firestore';
import { Account } from '../../../interfaces/account.interface';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onIdTokenChanged,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private authFirestore = inject(Auth);
  private isAuthenticated = false;

  firestore: Firestore = inject(Firestore);
  private accountList: Account[] = [];

  currentuser = '';
  currentUserName = '';

  input_mail = '';
  input_password = '';

  contact = {
    surname: '',
    lastname: '',
    mail: '',
    phone: '',
    color: '',
    uid: '',
  };

  isNew: boolean = false;

  isLoginValid = true;

  isNewUser = false;

  constructor() {
    this.callUserData();
  }

async createNewAccount(mail: string, password: string) {

    try {
      this.isNewUser = true;
      const userCredentials = await createUserWithEmailAndPassword(this.authFirestore, mail, password);
      const uid = userCredentials.user.uid;

      this.isNew = true;
        this.login(); 
        
        this.isNew = false;
        this.router.navigate(['/summary']);        
    } catch (error) {
        console.error("Registration failed:", error);
    }
}

  async createContactObject(uid: string) {
    this.contact.surname = this.correctInput(this.contact.surname);
    this.contact.lastname = this.correctInput(this.contact.lastname);
    this.currentuser = uid;
}

  correctInput(data: string) {
    data = data.trim();
    let cache: string = '';
    for (let i = 0; i < data.length; i++) {
      if (i == 0) {
        cache += data.charAt(i).toUpperCase();
      } else {
        cache += data.charAt(i).toLowerCase();
      }
    }
    return cache;
  }

  async loginAsGuest() {
    await signInWithEmailAndPassword(this.authFirestore, 'guest@web.com', 'dackel')
      .then((input) => {
        this.login();
        this.router.navigate(['/summary']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async loginUser(mail: string, password: string) {
    this.input_mail = mail;
    this.input_password = password;

    await signInWithEmailAndPassword(this.authFirestore, this.input_mail, this.input_password)
      .then((input) => {
        if (input.user) {
          this.login();
          if (!this.isNew) {
            this.isLoginValid = true;
            this.router.navigate(['/summary']);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        this.isLoginValid = false;
      });
  }

  async logoutUser() {
    this.contact.surname = '';
    this.contact.lastname = '';
    this.contact.mail = '';
    this.logout();
    await this.authFirestore.signOut();
  }

  callUserData() {
    onIdTokenChanged(this.authFirestore, (user) => {      
      if (user) {
        this.currentuser = user.uid;
      }
    });
  }

  login(): void {
    this.isAuthenticated = true;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUserName = '';
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  setAccountObject(idPram: string, obj: Account): Account {
    return {
      email: obj.email,
      id: idPram,
      isLoggedIn: obj.isLoggedIn,
      password: obj.password,
    };
  }
}