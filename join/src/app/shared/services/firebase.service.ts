import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore, onSnapshot, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Contact } from '../../interfaces/contact.interface';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  contact: Contact[] = [];
  contactList: Contact[] = [];
  currentIndex!:number;
  editing = false;

  firestore: Firestore = inject(Firestore);
  
  initials = "";
  contactSelected = false;
  currentContact = {
    surname: "",
    lastname: "",
    mail: "",
    phone: "",
  };

  editedContact:Contact = {
    surname: "",
    lastname: "",
    mail: "",
    phone: "",
  }

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
    this.contactSelected = false;
    this.currentContact = this.contactList[$index]
    this.contactSelected = true;
    this.getInitials($index);
    this.currentIndex = $index;
  }

  getInitials($index:number) {
    let firstInitial = this.contactList[$index].surname.trim().charAt(0).toUpperCase();
    let secondInitial = this.contactList[$index].lastname.trim().charAt(0).toUpperCase();
    this.initials = firstInitial + secondInitial;
  }

  editContact(index:number) {
    this.editing = true;
    this.editedContact = {
      surname: this.contactList[index].surname,
      lastname: this.contactList[index].lastname,
      mail: this.contactList[index].mail,
      phone: this.contactList[index].phone,
    }
  }

  async addContactToDatabase(contact: Contact) {
    await addDoc(collection(this.firestore, "contacts"), contact)    
  }

  async editContactToDatabase($index:number, contact: Contact) {
    await updateDoc(doc(this.firestore, 'contacts', this.contactList[$index].id!), {
      surname: contact.surname,
      lastname: contact.lastname,
      mail: contact.mail,
      phone: contact.phone,
    });
    
    this.showContactDetails(this.currentIndex);
  }
  
  async deleteContact($index:number) {
    await deleteDoc(doc(this.firestore, 'contacts', this.contactList[$index].id!));
    this.contactSelected = false;
    this.editing = false;
  }

}
