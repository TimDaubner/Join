import { Component } from '@angular/core';
import { ContactDetails } from './contact-details/contact-details';
import { ContactList } from './contact-list/contact-list';

@Component({
  selector: 'app-contact',
  imports: [ContactDetails,ContactList],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

}
