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
  isContactAdded = false;

  openAddNewContactOverlay() {
    console.log("true");
    
    this.isAddContactOpen = true;
  }
  
  closeAddNewContactOverlay() {
    console.log("false");
     
    this.isAddContactOpen = false;
    this.isContactAdded = true;
    if (!this.isAddContactOpen && this.isContactAdded) {
      setTimeout(() => {
        this.isContactAdded = false;
      }, 3000);
    }
  }

}
