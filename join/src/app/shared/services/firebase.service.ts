import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore, onSnapshot, doc, deleteDoc } from '@angular/fire/firestore';
import { Contact } from '../../interfaces/contact.interface';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  contact: Contact[] = [];
  contactList: Contact[] = [];
  currentIndex:number | undefined;

  firestore: Firestore = inject(Firestore);
  
  initials = "";
  contactSelected = false;
  currentContact = {
    surname: "",
    lastname: "",
    mail: "",
    phone: "",
  };

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

  showContactDetails($index:number){
    this.currentContact = this.contactList[$index]
    this.contactSelected = true;
    this.getInitials($index);
    this.currentIndex = $index;
  }

  getInitials($index:number) {
    let firstInitial = this.contactList[$index].surname.trim().charAt(0).toUpperCase();
    let secondInitial = this.contactList[$index].lastname.trim().charAt(0).toUpperCase();
    this.initials = firstInitial + secondInitial;
    console.log(this.initials);
    console.log(this.contactList[$index]);
  }

  async addContactToDatabase(contact: Contact) {
    await addDoc(collection(this.firestore, "contacts"), contact)
    console.log(this.contactList);
    
  }
  
  async deleteContact($index:number) {
    await deleteDoc(doc(this.firestore, 'contacts', this.contactList[$index].id!));
    this.contactSelected = false;
  }

}
