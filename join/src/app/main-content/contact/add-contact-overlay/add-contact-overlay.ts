import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ContactService } from '../../../shared/services/contact/contact.service';

@Component({
  selector: 'app-add-contact-overlay',
  imports: [FormsModule],
  templateUrl: './add-contact-overlay.html',
  styleUrl: './add-contact-overlay.scss',
})
export class AddContactOverlay {

  contact_service = inject(ContactService);

  isNewContactAdded = false;

  @ViewChild('firstName') firstName!: NgModel;
  @ViewChild('lastName') lastName!: NgModel;
  @ViewChild('mail') mail!: NgModel;
  @ViewChild('phone') phone!: NgModel;

  contact = {
    surname: "",
    lastname: "",
    mail: "",
    phone: "",
    color: "",
    uid: "",
  }

  submitContact() {
    if (this.checkCorrectInput()) {
      this.checkInputs();
      this.contact.color = this.contact_service.getRandomColor();
      this.contact_service.addContactToDatabase(this.contact,true);
      this.clearInputs();
      this.isNewContactAdded = true;
      this.callCloseOverlay();
    }
  }

  checkCorrectInput() {
    if (this.firstName.valid && this.lastName.valid && this.mail.valid && this.phone.valid) {
      return true;
    }
    return false;
  }

  checkInputs() {
    this.contact.surname = this.correctInput(this.contact.surname);
    this.contact.lastname = this.correctInput(this.contact.lastname);
  }

  correctInput(data: string) {
    let cache: string = "";
    for (let i = 0; i < data.length; i++) {
      if (i == 0) {
        cache += data.charAt(i).toUpperCase();
      }
      else {
        cache += data.charAt(i).toLowerCase();
      }
    }
    return cache;
  }

  @Output() closeOverlay = new EventEmitter<void>();

  callCloseOverlay() {
    this.closeOverlay.emit();
    this.clearInputs();
    this.resetForm();
  }

  resetForm() {
    this.firstName.control.markAsUntouched();
    this.firstName.control.markAsPristine();
    this.lastName.control.markAsUntouched();
    this.lastName.control.markAsPristine();
    this.mail.control.markAsUntouched();
    this.mail.control.markAsPristine();
    this.phone.control.markAsUntouched();
    this.phone.control.markAsPristine();
  }

  clearInputs() {
    this.contact = {
      surname: "",
      lastname: "",
      mail: "",
      phone: "",
      color: "",
      uid: "",
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
