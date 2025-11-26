import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BoardCard } from "./board-card/board-card";
import { BoardService } from '../../shared/services/board/board.service';
import { CardDetails } from './board-card/card-details/card-details';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoardCard, CardDetails],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})

export class Board {
  board_service = inject(BoardService);
  isAddTaskOpen: boolean = false;

  constructor(){
    this.renderTasks();
  }

  renderTasks(){
    this.board_service.taskList.forEach(task => {
      console.log(task.titel);
    });
  }

  searchTask(keyWord: string) {
    this.board_service.taskList.forEach(task => {
      if (task.titel.includes(keyWord)) {
        //render Task
      }
      else {
        //hide Task
      }
    });
  }

  showAddTaskComponent() {
    if (!this.isAddTaskOpen) {
      this.isAddTaskOpen = true;
    }
    else{
      this.isAddTaskOpen = false;
    }
  }

  updateTasks(type: string) {

  }

  dragDrop() {
    //?here
  }
}
