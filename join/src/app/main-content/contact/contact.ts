import { Component, inject } from '@angular/core';
import { ContactDetails } from './contact-details/contact-details';
import { ContactList } from './contact-list/contact-list';
import { AddContactOverlay } from "./add-contact-overlay/add-contact-overlay";
import { NgClass } from '@angular/common';
import { ContactService } from '../../shared/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  imports: [ContactDetails, ContactList, AddContactOverlay, NgClass],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  contact_service = inject(ContactService);

  isAddContactOpen = false;
  isContactAdded = false;
  lengthContacts = 0;

  openAddNewContactOverlay() {
    this.isAddContactOpen = true;
  }

  closeAddNewContactOverlay() {
    this.isAddContactOpen = false;
    if (this.contact_service.isAdded) {
      this.isContactAdded = true;
      setTimeout(() => {
        this.isContactAdded = false;
      }, 3000);
    }
  }
}
