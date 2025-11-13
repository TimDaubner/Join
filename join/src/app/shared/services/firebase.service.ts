import { inject, Injectable } from '@angular/core';
import { collection, Firestore, onSnapshot, doc, getDoc } from '@angular/fire/firestore';
import { Contact } from '../../interfaces/contact.interface';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  contact: Contact[] = [];
  contactList: Contact[] = [];

  firestore: Firestore = inject(Firestore);
  unsubscribe;

  constructor() {
    this.unsubscribe = onSnapshot(collection(this.firestore, "contacts"), (contactsSnapshot) => {
      this.contactList = []
      contactsSnapshot.forEach((contact) => {
        this.contactList.push(this.setContactObject(contact.id, contact.data() as Contact))
      });
    });
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  setContactObject(idParam:string, obj: Contact): Contact{
    return {
      id: idParam,
      surname: obj.surname,
      lastname: obj.lastname,
      mail: obj.mail,
      phone: obj.phone,
    }
  }
}
