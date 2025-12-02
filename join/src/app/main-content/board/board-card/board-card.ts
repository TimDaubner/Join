import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDetails } from "./card-details/card-details";
import { EditCardDetails } from "./edit-card-details/edit-card-details";

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [CommonModule, CardDetails, EditCardDetails],
  templateUrl: './board-card.html',
  styleUrl: './board-card.scss',
})
export class BoardCard {
  //(drag)
  //(dragover)
  //https://angular.dev/guide/drag-drop

  showCardDetails() {}
}
