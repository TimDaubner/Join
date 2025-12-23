import { inject, Injectable, signal } from '@angular/core';
import { addDoc, collection, Firestore, onSnapshot, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Contact } from '../../../interfaces/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contact: Contact[] = [];
  contactList = signal<Contact[]>([]);
  currentIndex!: number;
  editing = false;
  detailsOpen = false;
  isAdded = false;

  firestore: Firestore = inject(Firestore);

  initials = "";
  contactSelected = false;
  currentContact: Contact = {
    surname: "",
    lastname: "",
    mail: "",
    phone: "",
    color: "",
    uid: "",
  };

  editedContact: Contact = {
    surname: "",
    lastname: "",
    mail: "",
    phone: "",
    color: "",
    uid: "",
  }

  colors = [
    '#FF7A00',
    '#FF5EB3',
    '#6E52FF',
    '#9327FF',
    '#00BEE8',
    '#1FD7C1',
    '#FF745E',
    '#FFA35E',
    '#FC71FF',
    '#FFC701',
    '#0038FF',
    '#FF4646',
    '#FFBB2B'
  ]

  unsubscribe;

  constructor() {
    this.unsubscribe = onSnapshot(collection(this.firestore, "contacts"), (contactsSnapshot) => {
      console.log("Contact Service läuft jetzt");
      
      const contacts: Contact[] = [];
      contactsSnapshot.forEach((contact) => {
        contacts.push(this.setContactObjectSnapshot(contact.id, contact.data() as Contact));
      });
      this.sortFunc(contacts);
      this.contactList.set(contacts);
    }, (error) => {
      console.error(`connection to firestore permission-denied -> ${error}`);
      // console.log('');

      // if(this.auth_service.isLoggedIn()){ 
      // }
    });
  }

  // fetchDatabase(collectionData : string, collectionArray : [], type: any){
  //   this.unsubscribe = onSnapshot(collection(this.firestore, collectionData), (dataSnapshot) => {
  //     collectionArray = [];
  //     dataSnapshot.forEach((data) => {
  //       collectionArray.push(this.setContactObject(data.id, data.data() as type))
  //     });
  //   });
  // }



  closeDetails() {
    this.detailsOpen = false;
  }

  sortFunc(contacts:Contact[]) {
    contacts.sort((a, b) => a.lastname?.localeCompare(b.lastname));
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  getRandomColor() {
    let index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  }

  setContactObject(idParam: string, obj: Contact, uidParam?: string | undefined): Contact {
    return {
      id: idParam,
      surname: obj.surname,
      lastname: obj.lastname,
      mail: obj.mail,
      phone: obj.phone,
      color: obj.color,
      uid: uidParam,
    }
  }

  setContactObjectSnapshot(idParam: string, obj: Contact,) {
    return {
      id: idParam,
      surname: obj.surname,
      lastname: obj.lastname,
      mail: obj.mail,
      phone: obj.phone,
      color: obj.color,
      uid: obj.uid,
    }
  }

  showContactDetails($index: number) {
    this.contactSelected = false;
    this.currentContact = this.contactList()[$index];
    this.contactSelected = true;
    this.getInitials($index);
    this.currentIndex = $index;
  }

  getInitials($index: number) {
    let firstInitial = this.contactList()[$index].surname.trim().charAt(0).toUpperCase();
    let secondInitial = this.contactList()[$index].lastname.trim().charAt(0).toUpperCase();
    this.initials = firstInitial + secondInitial;
  }

  editContact(index: number) {
    this.editing = true;
    this.editedContact = {
      surname: this.contactList()[index].surname,
      lastname: this.contactList()[index].lastname,
      mail: this.contactList()[index].mail,
      phone: this.contactList()[index].phone,
      color: this.contactList()[index].color,
      uid: this.contactList()[index].uid,
    }
  }

  async addContactToDatabase(contact: Contact,timeOut:boolean = false) {
    if(timeOut){
      this.isAdded = true;
      setTimeout(() => {
        this.isAdded = false;
      }, 3000);
    }
    await addDoc(collection(this.firestore, "contacts"), contact);
    console.log(contact);
    console.log("Hier wurde ein Kontakt erstellt");
    
    
    // this.sortFunc();
  }

  async editContactToDatabase($index: number, contact: Contact) {
    await updateDoc(doc(this.firestore, 'contacts', this.contactList()[$index].id!), {
      surname: contact.surname,
      lastname: contact.lastname,
      mail: contact.mail,
      phone: contact.phone,
      color: contact.color,
    });

    this.showContactDetails(this.currentIndex);
  }

  async deleteContact($index: number) {
    await deleteDoc(doc(this.firestore, 'contacts', this.contactList()[$index].id!));
    this.contactSelected = false;
    this.editing = false;
    this.detailsOpen = false;
  }
}
