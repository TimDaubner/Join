import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { Contact } from '../../../interfaces/contact.interface';
import { doc, deleteDoc} from "firebase/firestore"


@Component({
  selector: 'app-contact-details',
  imports: [],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
})

export class ContactDetails {
firebase = inject(FirebaseService)

contactSelected = false;
currentContact = {
  surname: "",
  lastname: "",
  mail: "",
  phone: "",
};
initials = "";

  constructor() {
    this.firebase;
  }

  showContactDetails($index:number){
    this.currentContact = this.firebase.contactList[$index]
    this.contactSelected = true;
    this.getInitials($index);
  }

  getInitials($index:number) {
    let firstInitial = this.firebase.contactList[$index].surname.trim().charAt(0).toUpperCase();
    let secondInitial = this.firebase.contactList[$index].lastname.trim().charAt(0).toUpperCase();
    this.initials = firstInitial + secondInitial;
    console.log(this.initials);
    console.log(this.firebase.contactList[$index]);
    
  }

  // async deleteContactDetails($index:number) {
  //   await deleteDoc(doc(this.firebase.firestore, this.firebase.contactList[$index].id))
  // }
}
