import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Contact } from '../../interfaces/contact.interface';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../shared/services/contact/contact.service';

@Component({
  selector: 'app-edit-contact-overlay',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-contact-overlay.html',
  styleUrl: './edit-contact-overlay.scss',
})
export class EditContactOverlay {
  firebase = inject(ContactService);
  contact = {
    surname: '',
    lastname: '',
    mail: '',
    phone: '',
    color: '',
  };

  @ViewChild('firstName') firstName!: NgModel;
  @ViewChild('lastName') lastName!: NgModel;
  @ViewChild('mail') mail!: NgModel;
  @ViewChild('phone') phone!: NgModel;

  // eigentliche Idee wäre die currentIndex variable wieder leer zu machen. Da aber eine number erwartet wird...
  saveContact() {
    if (this.checkCorrectInput()) {
      this.checkInputs();
      this.firebase.editContactToDatabase(this.firebase.currentIndex, this.firebase.editedContact);
      this.firebase.editedContact = {
        surname: '',
        lastname: '',
        mail: '',
        phone: '',
        color: '',
      };
      this.firebase.editing = false;
    }
  }

  closeEdit() {
    this.firebase.editedContact = {
      surname: '',
      lastname: '',
      mail: '',
      phone: '',
      color: '',
    };
    this.firebase.editing = false;
    this.resetForm();
  }

  checkCorrectInput() {
    if (this.firstName.valid && this.lastName.valid && this.mail.valid && this.phone.valid) {
      return true;
    }
    return false;
  }

  checkInputs() {
    this.firebase.editedContact.surname = this.correctInput(this.firebase.editedContact.surname);
    this.firebase.editedContact.lastname = this.correctInput(this.firebase.editedContact.lastname);
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
}
