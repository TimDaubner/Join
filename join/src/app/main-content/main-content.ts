import { Component } from '@angular/core';
import { EditCardDetails } from './board/board-card/edit-card-details/edit-card-details';
import { CommonModule } from '@angular/common';
import { CardDetails } from './board/board-card/card-details/card-details';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {}
