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
  contact_service = inject(ContactService);
  contactList: Contact[] = this.contact_service.contactList;
  selectedIndex!: number;

  constructor() {
    this.contactList = this.contact_service.contactList;
  }

  showContact(index: number) {
    this.selectedIndex = index;
    this.contact_service.detailsOpen = true;
    this.contact_service.showContactDetails(index);
  }

  @Output() addContact = new EventEmitter<void>();

  openAddNewContact() {
    this.addContact.emit();
  }
}
