import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  imports: [],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList {
  contactList = [
    {
      name: "Tim Daubner",
      email: "tim.daubner@outlook.com"
    },
    {
      name: "Harald Grün",
      email: "h.gruen@yahoo.com"
    },
    {
      name: "Jannick Bauer",
      email: "j-bauer@gmx.com"
    },
    {
      name: "Davina Lang",
      email: "lang@service.com"
    },
  ]
}
