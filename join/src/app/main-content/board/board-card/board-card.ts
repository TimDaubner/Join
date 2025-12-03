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
  //(drag)
  //(dragover)
  //https://angular.dev/guide/drag-drop

  showCardDetails() {}
}
