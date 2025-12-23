import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-card.html',
  styleUrl: './board-card.scss',
})
export class BoardCard {
  showCardDetails() {} 
}
