import { Component } from '@angular/core';
import { Contact } from './contact/contact';
import { AddContactOverlay } from './add-contact-overlay/add-contact-overlay';

@Component({
  selector: 'app-main-content',
  imports: [Contact, AddContactOverlay],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {

}
