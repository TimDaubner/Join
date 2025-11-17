import { Component } from '@angular/core';
import { ContactDetails } from './contact-details/contact-details';
import { ContactList } from './contact-list/contact-list';
import { AddContactOverlay } from "./add-contact-overlay/add-contact-overlay";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [ContactDetails, ContactList, AddContactOverlay, NgClass],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  isAddContactOpen = false;
  
  openAddNewContactOverlay() {
    this.isAddContactOpen = true;
    console.log(this.isAddContactOpen);
  }

  closeAddNewContactOverlay() {
    this.isAddContactOpen = false;
    console.log(this.isAddContactOpen);
  }
  
}
