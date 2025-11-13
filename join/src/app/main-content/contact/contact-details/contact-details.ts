import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../../shared/services/firebase.service';



@Component({
  selector: 'app-contact-details',
  imports: [],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
})

export class ContactDetails {
firebase = inject(FirebaseService)



  constructor() {
    this.firebase;
  }

  

  

}
