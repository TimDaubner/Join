import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-help-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './help-section.html',
  styleUrl: './help-section.scss',
})
export class HelpSection {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
