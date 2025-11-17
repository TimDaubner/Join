import { Component, inject } from '@angular/core';
import { ContactDetails } from './contact-details/contact-details';
import { ContactList } from './contact-list/contact-list';
import { AddContactOverlay } from '../add-contact-overlay/add-contact-overlay';
import { EditContactOverlay } from '../edit-contact-overlay/edit-contact-overlay';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-contact',
  imports: [ContactDetails, ContactList],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

firebase = inject(FirebaseService)

}
