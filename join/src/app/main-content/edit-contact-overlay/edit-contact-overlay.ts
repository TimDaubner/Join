import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-edit-contact-overlay',
  imports: [FormsModule, ],
  templateUrl: './edit-contact-overlay.html',
  styleUrl: './edit-contact-overlay.scss',
})
export class EditContactOverlay {

  firebase = inject(FirebaseService)
  contact = {
    surname: "",
    lastname: "",
    mail: "",
    phone: "",
  }


  // eigentliche Idee wäre die currentIndex variable wieder leer zu machen. Da aber eine number erwartet wird...
  saveContact() {
      this.firebase.editContactToDatabase(this.firebase.currentIndex, this.firebase.editedContact)
      this.firebase.editedContact = {
        surname: "",
        lastname: "",
        mail: "",
        phone: "",
      }
    }


  


}
