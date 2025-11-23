import { Component, inject, ElementRef, HostListener } from '@angular/core';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { EditContactOverlay } from '../../edit-contact-overlay/edit-contact-overlay';



@Component({
  selector: 'app-contact-details',
  imports: [EditContactOverlay],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
})

export class ContactDetails {
firebase = inject(FirebaseService)

  burgerOpen = false;

  hoverEdit = false;
  hoverDelete = false;

  constructor(private eRef: ElementRef) {
    this.firebase;
  }


  toggleBurger() {
    this.burgerOpen = !this.burgerOpen;
  }

  //TODO - ask how it works
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
