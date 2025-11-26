import { Component, inject, ElementRef, HostListener } from '@angular/core';
import { EditContactOverlay } from '../../edit-contact-overlay/edit-contact-overlay';
import { ContactService } from '../../../shared/services/contact/contact.service';



@Component({
  selector: 'app-contact-details',
  imports: [EditContactOverlay],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
})

export class ContactDetails {
firebase = inject(ContactService)

  burgerOpen = false;

  hoverEdit = false;
  hoverDelete = false;

  constructor(private eRef: ElementRef) {
    this.firebase;
  }


  toggleBurger() {
    this.burgerOpen = !this.burgerOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (
      this.burgerOpen &&
      !this.eRef.nativeElement.querySelector('.burger_menu_details')?.contains(event.target) &&
      !this.eRef.nativeElement.querySelector('#burger_edit')?.contains(event.target)
    ) {
      this.burgerOpen = false;
    }
  }
}
