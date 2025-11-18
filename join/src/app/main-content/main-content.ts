import { Component } from '@angular/core';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-main-content',
  imports: [Contact],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {}
