import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './shared/services/firebase.service';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('join');
  firebase = inject(FirebaseService);
}
