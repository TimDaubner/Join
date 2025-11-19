import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { Contact } from '../../../interfaces/contact.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  imports: [NgClass],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList implements OnInit{
  firebase = inject(FirebaseService)
  contactList: Contact[] = this.firebase.contactList;
  selectedIndex!: number;

  constructor() {
    this.firebase;
    // this.sortFunc();
    //TODO-Sort in ngOnInit();
  }

  ngOnInit() {
    this.firebase.sortFunc();
  }

  sortFunc() {
    this.firebase.contactList.sort((a, b) => a.lastname?.localeCompare(b.lastname));
  }

  showContact(index: number) {
    this.selectedIndex = index;
    this.firebase.showContactDetails(index);
  }

  @Output() addContact = new EventEmitter<void>();

  openAddNewContact() {
    this.addContact.emit();
  }
}
