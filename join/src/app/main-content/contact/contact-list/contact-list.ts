import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Contact } from '../../../interfaces/contact.interface';
import { NgClass } from '@angular/common';
import { ContactService } from '../../../shared/services/contact/contact.service';

@Component({
  selector: 'app-contact-list',
  imports: [NgClass],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList{
  firebase = inject(ContactService)
  contactList: Contact[] = this.firebase.contactList;
  selectedIndex!: number;

  constructor() {
    this.firebase;
  }

  showContact(index: number) {
    this.selectedIndex = index;
    this.firebase.detailsOpen = true;
    this.firebase.showContactDetails(index);
  }

  @Output() addContact = new EventEmitter<void>();

  openAddNewContact() {
    this.addContact.emit();
  }
}
