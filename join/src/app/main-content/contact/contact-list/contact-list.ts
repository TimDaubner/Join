import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { Contact } from '../../../interfaces/contact.interface';

@Component({
  selector: 'app-contact-list',
  imports: [],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList {
  firebase = inject(FirebaseService)
  contactList: Contact[] = this.firebase.contactList;



  constructor() {
    this.firebase;
    this.sortFunc();
  }

  sortFunc() {
    this.firebase.contactList.sort((a, b) => a.lastname?.localeCompare(b.lastname));
  }

  showContact(index: number) {
    this.firebase.showContactDetails(index);
  }

  openAddNewContact() {

  }
}
