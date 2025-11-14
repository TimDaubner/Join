import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  imports: [],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList {
  contactList: {
    surname: string,
    lastname: string,
    email: string
  }[] = [
      {
        surname: "Tim",
        lastname: "Daubner",
        email: "tim.daubner@outlook.com"
      },
      {
        surname: "Harald",
        lastname: "Grün",
        email: "h.gruen@yahoo.com"
      },
      {
        surname: "Jannick",
        lastname: "Bauer",
        email: "j-bauer@gmx.com"
      },
      {
        surname: "Davina",
        lastname: "Lang",
        email: "lang@service.com"
      },
      {
        surname: "Davina",
        lastname: "Langenau",
        email: "lang@service.com"
      },
      {
        surname: "Davina",
        lastname: "Langs",
        email: "lang@service.com"
      },
      {
        surname: "Davina",
        lastname: "Mangs",
        email: "lang@service.com"
      },
      {
        surname: "Davina",
        lastname: "Danks",
        email: "lang@service.com"
      },
    ]

  constructor() {
    this.contactList.sort((a, b) => a.lastname?.localeCompare(b.lastname));
    console.log(this.contactList);
    let letter = this.contactList[0].lastname.charAt(0);
    console.log(letter);
  }

  openAddNewContact() {

  }
}
