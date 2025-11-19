import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { Contact } from '../../../interfaces/contact.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  imports: [NgClass],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList {
  firebase = inject(FirebaseService)
  contactList: Contact[] = this.firebase.contactList;
  selectedIndex!: number;

  constructor() {
    this.firebase;
    this.sortFunc();
    this.addRandomColors();
    //TODO-Sort in ngOnInit();
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

  _bgColor?: string;

  getRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  addRandomColors() {
    this.firebase.contactList = this.firebase.contactList.map(c => ({
      ...c,
      _bgColor: this.getRandomColor()
    }));
  }
}
