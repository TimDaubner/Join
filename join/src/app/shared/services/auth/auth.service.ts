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
import { ContactService } from '../contact/contact.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private authFirestore = inject(Auth);
  private contact_service = inject(ContactService);

  //Auth Angular
  private isAuthenticated = false;

  //Auth Firebase
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

  isDebugging = true;

  isLoginValid = true;

  constructor() {
    this.callUserData();
  }

async createNewAccount(mail: string, password: string) {
    if (this.isDebugging) console.log("Start Registration");

    try {
        // 1. User erstellen (Das loggt den User AUTOMATISCH ein!)
        const userCredentials = await createUserWithEmailAndPassword(this.authFirestore, mail, password);
        const uid = userCredentials.user.uid;

        this.isNew = true;
        console.log("User created:", uid);

        // 2. Kontakt erstellen und WARTEN
        await this.createContactObject(uid);

        // WICHTIG: Kein this.loginUser() hier aufrufen! 
        // Der User ist durch createUserWithEmailAndPassword bereits eingeloggt.
        
        // 3. Kurz warten, damit Auth State sicher gesetzt ist (optional, aber sicher ist sicher)
        this.login(); // Setzt dein lokales isAuthenticated = true
        
        // 4. Weiterleiten
        this.isNew = false;
        this.router.navigate(['/summary']);

    } catch (error) {
        console.error("Registration failed:", error);
    }
}

  async createContactObject(uid: string) {
    // Felder setzen
    this.contact.surname = this.correctInput(this.contact.surname);
    this.contact.lastname = this.correctInput(this.contact.lastname);
    this.contact.color = this.contact_service.getRandomColor();
    
    // Name sofort setzen (nicht erst über getUserName suchen, der User ist ja noch nicht in der Liste)
    this.currentUserName = this.contact.surname + " " + this.contact.lastname;
    this.currentuser = uid;

    // Kontakt Objekt für DB vorbereiten
    let newContact = this.contact_service.setContactObject(uid, this.contact, uid);

    // PROBLEM LÖSUNG: Optimistisches Update
    // Füge den Kontakt sofort zur lokalen Liste hinzu, damit er auf der nächsten Seite da ist!
    this.contact_service.contactList().push(newContact); 

    // Jetzt in die Datenbank schreiben
    await this.contact_service.addContactToDatabase(newContact);
    
    // getUserName ist hier eigentlich überflüssig, da wir die Namen oben schon haben,
    // aber wenn du es brauchst, wird es jetzt funktionieren, da wir gepusht haben.
    // this.getUserName(this.currentuser);
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
    this.contact.surname = '';
    this.contact.lastname = '';
    this.contact.mail = '';
    this.logout();
    //auth firestore unsubscribe
    this.authFirestore.signOut();
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

    this.contact_service.contactList().filter((c) => {
      
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