import { Component, Inject, inject } from '@angular/core';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { Contact } from '../../../interfaces/contact.interface';


@Component({
  selector: 'app-contact-details',
  imports: [],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
})

export class ContactDetails {
firebase = inject(FirebaseService)
contactSnap = {
  name: "",
  mail: "",
  phone: "",
};
singleContact;

  constructor() {
    this.firebase;
   this.singleContact = this.firebase.getSingleContact('dwf1m2bluDxzy0cLlcpV')
   console.log(this.singleContact);
   
  }


}
