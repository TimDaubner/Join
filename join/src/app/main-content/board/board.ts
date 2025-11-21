import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BoardCard } from "./board-card/board-card";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoardCard],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {}
