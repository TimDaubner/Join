import { Injectable, inject, signal } from '@angular/core';
import { collection, Firestore, onSnapshot, Timestamp } from '@angular/fire/firestore';
import { Account } from '../../../interfaces/account.interface';
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  onIdTokenChanged,
} from '@angular/fire/auth';
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

  currentuser = '';
  currentUserName = '';

  userInitials = signal('');

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

  isDebugging = false;

  isLoginValid = true;

  constructor() {
    this.callUserData();
  }

  async createNewAccount(mail: string, password: string) {

    //call create account
    if (this.isDebugging) {
      let now = new Date();
      let timeWithMs = now.toLocaleTimeString("de-DE") + "." + now.getMilliseconds();
      console.warn(timeWithMs + "call create account");
    }
    await createUserWithEmailAndPassword(this.authFirestore, mail, password)
      .then(async (userCredentials) => {

        //after creating account
        if (this.isDebugging) {

          let now = new Date();
          let timeWithMs = now.toLocaleTimeString("de-DE") + "." + now.getMilliseconds();
          console.warn(timeWithMs + " after creating account");
        }

        this.isNew = true;
        console.log(userCredentials.user.uid);
        await this.createContactObject(userCredentials.user.uid);
        await this.loginUser(mail, password);
        
        this.isNew = false;
        this.router.navigate(['/summary']);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async createContactObject(uid: string) {
    //set conatct object fields
    if (this.isDebugging) {
      let now = new Date();
      let timeWithMs = now.toLocaleTimeString("de-DE") + "." + now.getMilliseconds();
      console.warn(timeWithMs + " set conatct object fields");
    } 
    this.contact.surname = this.correctInput(this.contact.surname);
    this.contact.lastname = this.correctInput(this.contact.lastname);
    this.currentUserName = this.contact.surname + " " + this. contact.lastname; 
    this.contact.color = this.contact_service.getRandomColor();
    let newContact = this.contact_service.setContactObject(uid, this.contact, uid);
    if (uid) {
      this.currentuser = uid;
      this.getUserName(this.currentuser);
    }
    await this.contact_service.addContactToDatabase(newContact);
  }

  correctInput(data: string) {
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
        console.log('login successfull');

        this.login();
        this.router.navigate(['/summary']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async loginUser(mail: string, password: string) {
    //call loginUser function
    if (this.isDebugging) {
      let now = new Date();
      let timeWithMs = now.toLocaleTimeString("de-DE") + "." + now.getMilliseconds();
      console.warn(timeWithMs + " call loginUser function");
    }
    this.input_mail = mail;
    this.input_password = password;

    await signInWithEmailAndPassword(this.authFirestore, this.input_mail, this.input_password)
      .then((input) => {
        //
        if (input.user) {
          // login with new account
          if (this.isDebugging) {

            let now = new Date();
            let timeWithMs = now.toLocaleTimeString("de-DE") + "." + now.getMilliseconds();
            console.warn(timeWithMs + " login with new account");
          }
          console.log('login successfull');
          this.login();
          if (!this.isNew) {
            // just login
            if (this.isDebugging) {

              let now = new Date();
              let timeWithMs = now.toLocaleTimeString("de-DE") + "." + now.getMilliseconds();
              console.warn(timeWithMs + " just login");
            }
            console.log('login successfull');
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

  logoutUser() {
    //call logout user
    if (this.isDebugging) {
      let now = new Date();
      let timeWithMs = now.toLocaleTimeString("de-DE") + "." + now.getMilliseconds();
      console.warn(timeWithMs + " call logout user + auth firestore unsubscribe");
    }
    this.logout();
    //auth firestore unsubscribe
    this.authFirestore.signOut();
    this.router.navigate(['/']);
  }

  callUserData() {
    // call user data
    if(this.isDebugging){
      let now = new Date();
      let timeWithMs = now.toLocaleTimeString("de-DE") + "." + now.getMilliseconds();
      console.warn(timeWithMs + " call user data");
    }

    onIdTokenChanged(this.authFirestore, (user) => {
      if (user) {
        //cache uid in currentuser
        if (this.isDebugging) {
          let now = new Date();
          let timeWithMs = now.toLocaleTimeString("de-DE") + "." + now.getMilliseconds();
          console.warn(timeWithMs + " cache uid in currentuser");
          console.log(user.uid);
        }
        this.currentuser = user.uid;
        this.getUserName(this.currentuser);
      }
    });
  }

  login(): void {
    this.isAuthenticated = true;
  }

  logout(): void {
    // logout user

    if (this.isDebugging) {
      let now = new Date();
      let timeWithMs = now.toLocaleTimeString("de-DE") + "." + now.getMilliseconds();
      console.warn(timeWithMs + " logout user");
    }
    this.isAuthenticated = false;
    this.currentUserName = '';
  }

  isLoggedIn(): boolean {
    //return loggedIn state
    if (this.isDebugging) {
      let now = new Date();
      let timeWithMs = now.toLocaleTimeString("de-DE") + "." + now.getMilliseconds();
      console.warn(timeWithMs + " return loggedIn state");
    }
    return this.isAuthenticated;
  }

  setAccountObject(idPram: string, obj: Account): Account {
    //create acc object
    if (this.isDebugging) {
      let now = new Date();
      let timeWithMs = now.toLocaleTimeString("de-DE") + "." + now.getMilliseconds();
      console.warn(timeWithMs + " create acc object");
    }
    return {
      email: obj.email,
      id: idPram,
      isLoggedIn: obj.isLoggedIn,
      password: obj.password,
    };
  }

  getUserName(currentuser: string) {
    //get User Initials + Name
    if (this.isDebugging) {
      let now = new Date();
      let timeWithMs = now.toLocaleTimeString("de-DE") + "." + now.getMilliseconds();
      console.warn(timeWithMs + " get User Initials + Name");
      console.warn(this.contact_service.contactList);
      console.warn(this.currentuser);
      console.warn(this.currentUserName);
    }

    this.contact_service.contactList.filter((c) => {
      
      if (c.uid === currentuser) {
        this.currentUserName = c.surname + " " + c.lastname;
        return
      }
    })
  }

}

// const now = new Date();
// const timeWithMs = now.toLocaleTimeString("de-DE") + "." + now.getMilliseconds();
// console.log(timeWithMs);