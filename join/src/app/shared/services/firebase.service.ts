import { inject, Injectable } from '@angular/core';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Contact } from '../../interfaces/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  contact: Contact[] = []

  firestore: Firestore = inject(Firestore);
  unsubscribe;

  constructor() {
    this.unsubscribe = onSnapshot(collection(this.firestore, "contacts"), (contactsSnapshot) => {
      contactsSnapshot.forEach((contact) => {
        console.log("data :", contact.data());
      });
    });
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }



}
