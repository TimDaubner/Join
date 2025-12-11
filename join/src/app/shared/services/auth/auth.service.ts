import { Injectable, inject } from '@angular/core';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Account } from '../../../interfaces/account.interface';
import { Auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

  //Auth Angular
  private isAuthenticated = true;

  //Auth Firebase
  firestore: Firestore = inject(Firestore);
  private unsubscribe;
  private accountList: Account[] = [];

  authFirestore: Auth;

  input_mail = "";
  input_passwort = "";

  createNewAccount() {
    createUserWithEmailAndPassword(this.authFirestore, "tester@1234.com", "Hunden123").then((userCredentials) => {
      let user = userCredentials.user;
      let id = userCredentials.providerId;
      let operationType = userCredentials.operationType;
    });

  }

  async loginAsGuest() {
    await signInWithEmailAndPassword(this.authFirestore, "guest@web.com", "dackel").then((input) => {
      console.log("login successfull");
      this.router.navigate(['/summary']);
      this.login();
      
    }).catch((error) => {
      console.log(error);
    });
  }
  
  loginUser() {
    signInWithEmailAndPassword(this.authFirestore, this.input_mail, this.input_passwort).then((input) => {
      console.log("login successfull");
      this.router.navigate(['/summary']);
      this.login();
      
    }).catch((error) => {
      console.log(error);
    });
  }
  
  logoutUser(){
    this.authFirestore.signOut();
    this.logout();
  }

  callUserData() {
    onAuthStateChanged(this.authFirestore, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        // code blah
      }
    });
  }


  constructor() {
    this.authFirestore = getAuth();
    this.unsubscribe = onSnapshot(collection(this.firestore, "accounts"), (accountsSnapshot) => {
      this.accountList = [];
      accountsSnapshot.forEach((account) => {
        this.accountList.push(this.setAccountObject(account.id, account.data() as Account));
        console.log(account.data());
      });
    });
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  login(): void {

    // Hier würde normalerweise die tatsächliche Authentifizierungslogik stehen
    this.isAuthenticated = true;
  }

  logout(): void {
    this.isAuthenticated = false;
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
    }
  }

}
