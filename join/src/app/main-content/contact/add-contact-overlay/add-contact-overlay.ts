import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-add-contact-overlay',
  imports: [FormsModule, NgClass],
  templateUrl: './add-contact-overlay.html',
  styleUrl: './add-contact-overlay.scss',
})
export class AddContactOverlay {

  firebase = inject(FirebaseService);



  contact = {
    surname: "",
    lastname: "",
    mail: "",
    phone: "",
    color: "",
  }



  submitContact() {
    this.contact.color = this.firebase.getRandomColor()
    this.firebase.addContactToDatabase(this.contact);
    this.contact = {
      surname: "",
      lastname: "",
      mail: "",
      phone: "",
      color: "",
    }
    this.callCloseOverlay();
  }

  @Output() closeOverlay = new EventEmitter<void>();

  callCloseOverlay() {
    this.closeOverlay.emit();
  }

  stopPropagation(event : Event) {
    event.stopPropagation();
  }
}
