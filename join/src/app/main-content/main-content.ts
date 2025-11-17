import { Component } from '@angular/core';
import { Contact } from './contact/contact';
import { AddContactOverlay } from './contact/add-contact-overlay/add-contact-overlay';
import { ContactList } from './contact/contact-list/contact-list';
import { EditContactOverlay } from './edit-contact-overlay/edit-contact-overlay';
import { AddTask } from './add-task/add-task';

@Component({
  selector: 'app-main-content',
  imports: [Contact, ContactList, AddContactOverlay, EditContactOverlay],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {}
