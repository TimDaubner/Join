import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
// import { FirebaseService } from './shared/services/firebase.service';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { CommonModule } from '@angular/common';
import { EditContactOverlay } from './main-content/edit-contact-overlay/edit-contact-overlay';
import { BoardService } from './shared/services/board/board.service';
import { ContactService } from './shared/services/contact/contact.service';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  router:Router = inject(Router);

  get hideFooterHeader(): boolean {
    return this.router.url === '/login';
  }
}
