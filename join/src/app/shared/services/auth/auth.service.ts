import { Injectable, inject } from '@angular/core';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Account } from '../../../interfaces/account.interface';
import { Auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, onIdTokenChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ContactService } from '../contact/contact.service';
import { BoardService } from '../board/board.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private authFirestore = inject(Auth);
  private contact_service = inject(ContactService);
  private board_service = inject(BoardService);

  //Auth Angular
  private isAuthenticated = false;

  //Auth Firebase
  firestore: Firestore = inject(Firestore);
  private accountList: Account[] = [];

  currentuser = "";
  currentUserName = "";


  input_mail = "";
  input_password = "";

  contact = {
    surname: "",
    lastname: "",
    mail: "",
    phone: "",
    color: "",
    uid: "",
  }

  isNew: boolean = false;

  constructor() {
    this.callUserData()
  }


  async createNewAccount(mail: string, password: string) {
    await createUserWithEmailAndPassword(this.authFirestore, mail, password).then((userCredentials) => {
      this.isNew = true;
      console.log(userCredentials.user.uid);
      this.loginUser(mail, password);
      this.createContactObject(userCredentials.user.uid);
      this.isNew = false;
      this.router.navigate(['/summary']);
    }).catch((error) => {
      console.error(error);
    });
  }

  async createContactObject(uid: string) {
    this.contact.color = this.contact_service.getRandomColor();
    this.contact.surname = this.correctInput(this.contact.surname)
    this.contact.lastname = this.correctInput(this.contact.lastname)
    let newContact = this.contact_service.setContactObject(uid, this.contact, uid);

    await this.contact_service.addContactToDatabase(newContact);
  }

  correctInput(data: string) {
    let cache: string = "";
    for (let i = 0; i < data.length; i++) {
      if (i == 0) {
        cache += data.charAt(i).toUpperCase();
      }
      else {
        cache += data.charAt(i).toLowerCase();
      }
    }
    return cache;
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

  async loginUser(mail: string, password: string) {
    this.input_mail = mail;
    this.input_password = password;

    await signInWithEmailAndPassword(this.authFirestore, this.input_mail, this.input_password).then((input) => {
      console.log("login successfull");
      if (!this.isNew) {
        this.router.navigate(['/summary']);
      }
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
    onIdTokenChanged(this.authFirestore, (user) => {
      if (user) {
        this.currentuser = user.uid;
        this.getUserName(this.currentuser)
      }
    });
  }

  login(): void {
    this.isAuthenticated = true;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.contact_service.unsubscribe();
    this.board_service.unsubscribe();
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

  getUserName(currentuser: string) {
    this.contact_service.contactList.filter((c) => {

      if (c.uid === currentuser) {
        this.currentUserName = c.surname + " " + c.lastname;
        return
      }
    })
  }

}
