import { Component } from '@angular/core';
import { Contact } from './contact/contact';
import { AddContactOverlay } from './add-contact-overlay/add-contact-overlay';
import { ContactList } from './contact/contact-list/contact-list';

@Component({
  selector: 'app-main-content',
  imports: [Contact, ContactList, AddContactOverlay],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {}
