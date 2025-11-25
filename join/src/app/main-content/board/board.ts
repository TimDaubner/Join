import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Task } from './../../interfaces/task.interface';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  templateUrl: './board.html',
  styleUrls: ['./board.scss', './board-card/board-card.scss'],
})
export class Board {
  columns: { title: string; tasks: Task[] }[] = [
    { title: 'To do', tasks: [] },
    { title: 'In progress', tasks: [] },
    { title: 'Await feedback', tasks: [] },
    { title: 'Done', tasks: [] },
  ];
}
