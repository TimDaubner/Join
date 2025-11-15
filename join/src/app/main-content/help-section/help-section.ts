import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-help-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './help-section.html',
  styleUrl: './help-section.scss',
})
export class HelpSection {}
