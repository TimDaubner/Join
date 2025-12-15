import { Injectable, inject } from '@angular/core';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Account } from '../../../interfaces/account.interface';
import { Auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ContactService } from '../contact/contact.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private authFirestore = inject(Auth);

  //Auth Angular
  private isAuthenticated = false;

  //Auth Firebase
  firestore: Firestore = inject(Firestore);
  private unsubscribe;
  private accountList: Account[] = [];

  input_mail = "";
  input_password = "";

  async createNewAccount(mail:string,password:string) {
    this.input_mail = mail;
    this.input_password = password;
    await createUserWithEmailAndPassword(this.authFirestore, mail, password).then((userCredentials) => {
      console.log(userCredentials.user.uid);
    }).catch((error) => {
      console.error(error);
    });

  }

  async loginAsGuest() {
    await signInWithEmailAndPassword(this.authFirestore, "guest@web.com", "dackel").then((input) => {
      console.log("login successfull");
      console.log(this.authFirestore);
      
      this.router.navigate(['/summary']);
      this.login();
      this.startFirestoreConnection();

    }).catch((error) => {
      console.log(error);
    });
  }

  async loginUser(mail:string,password:string) {
    this.input_mail = mail;
    this.input_password = password;

    await signInWithEmailAndPassword(this.authFirestore, this.input_mail, this.input_password).then((input) => {
      console.log("login successfull");
      this.router.navigate(['/summary']);
      this.login();

    }).catch((error) => {
      console.log(error);
    });
  }

  logoutUser() {
    this.authFirestore.signOut();
    this.logout();
  }

  callUserData() {
    onAuthStateChanged(this.authFirestore, (user) => {
      if (user) {
        console.log(`logged in! ${user.uid}`);
        
      } else {
        console.error("NOT logged in!");
      }
    });
  }

  startFirestoreConnection(){

    if (this.isLoggedIn()) {
      this.unsubscribe = onSnapshot(collection(this.firestore, "accounts"), (accountsSnapshot) => {
        this.accountList = [];
        accountsSnapshot.forEach((account) => {
          this.accountList.push(this.setAccountObject(account.id, account.data() as Account));
          console.log(account.data());
        });
      },(error) =>{
        if(this.isLoggedIn()){
          console.error(`connection to firestore permission-denied -> ${error}`)
        }
      });
    }
  }

  constructor() {
    if (this.isLoggedIn()) {
      this.unsubscribe = onSnapshot(collection(this.firestore, "accounts"), (accountsSnapshot) => {
        this.accountList = [];
        accountsSnapshot.forEach((account) => {
          this.accountList.push(this.setAccountObject(account.id, account.data() as Account));
          console.log(account.data());
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  login(): void {
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
