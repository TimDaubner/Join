import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { EditContactOverlay } from '../../edit-contact-overlay/edit-contact-overlay';



@Component({
  selector: 'app-contact-details',
  imports: [EditContactOverlay],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
})

export class ContactDetails {
firebase = inject(FirebaseService)

  hoverEdit = false;
  hoverDelete = false;

  constructor() {
    this.firebase;
  }
  

  log() {
    console.log('hover drüber');
  }

}
