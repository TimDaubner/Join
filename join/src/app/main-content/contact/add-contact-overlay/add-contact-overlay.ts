import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../../shared/services/firebase.service';

@Component({
  selector: 'app-add-contact-overlay',
  imports: [FormsModule],
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
  }

  submitContact() {
    this.firebase.addContactToDatabase(this.contact);
  }

  @Output() closeOverlay = new EventEmitter<void>();

  callCloseOverlay() {
    this.closeOverlay.emit();
  }

  stopPropagation(event : Event) {
    event.stopPropagation();
  }
}
