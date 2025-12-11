import { Component, inject } from '@angular/core';
import { BoardService } from '../../shared/services/board/board.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.html',
  styleUrl: './summary.scss',
})
export class Summary {

boardService = inject(BoardService)

urgentTasks: Task[] = [];
mediumTasks: Task[] = [];
lowTasks: Task[] = [];

constructor() {
  this.fillTaskLists()
}

fillTaskLists() {
  for(let i= 0; i < this.boardService.taskList.length; i++) {
    
    if(this.boardService.taskList[i].priority == 'Low') {
      this.lowTasks.push(this.boardService.taskList[i]);
    } else if (this.boardService.taskList[i].priority == 'Medium') {
      this.mediumTasks.push(this.boardService.taskList[i]);
    } else if (this.boardService.taskList[i].priority == 'Urgent') {
      this.urgentTasks.push(this.boardService.taskList[i]);
    }
  }

  
    
}

}
