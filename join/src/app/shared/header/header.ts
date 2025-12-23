import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  menu_open: boolean = false;
  auth_service = inject(AuthService);
  private router = inject(Router);


  toggleMenu() {
    this.menu_open = !this.menu_open;
  }

  closeMenu() {
    this.menu_open = false;
  }

  logoutFromJoin() {
    this.auth_service.logoutUser();
    this.router.navigate(['/']);
  }

  getInitials(name: string) {
    let firstInitial = "";
    let secondInitial = "";
    firstInitial = name.charAt(0);
    secondInitial = name.charAt(name.indexOf(" ") + 1);
    let initials = firstInitial + secondInitial;
    return initials;
  }
}
