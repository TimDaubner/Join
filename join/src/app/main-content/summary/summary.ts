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

highestPrioTask = "";

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

getHighestPrioTask() {
  if (this.urgentTasks) {
    this.highestPrioTask = "Urgent"
    return this.getNextDueDate(this.urgentTasks)
  }
  else if (!this.urgentTasks) {
    this.highestPrioTask = "Medium"
    return this.getNextDueDate(this.mediumTasks)
  }
  else if (!this.urgentTasks && !this.mediumTasks) {
    this.highestPrioTask = "Low"
    return (this.getNextDueDate(this.lowTasks))
  }
  else {
    return "There are no open Tasks with deadlines"
  }
}

getNextDueDate(prioList: Task[]) {
  let closestDeadline = prioList[0].dueDate;
  let taskTitle = "";
    for (let i = 1; i < prioList.length; i++) {
      if (closestDeadline > prioList[i].dueDate) {
        closestDeadline = prioList[i].dueDate;
        taskTitle = prioList[i].title
      }
  }
  console.log("nächste Deadline: " + closestDeadline.toDate() + "für " + taskTitle );
  return closestDeadline.toDate().toLocaleDateString('en-UK');
}



}
