import { Component, inject } from '@angular/core';
import { BoardService } from '../../shared/services/board/board.service';
import { Task } from '../../interfaces/task.interface';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.html',
  styleUrl: './summary.scss',
})
export class Summary {

boardService = inject(BoardService)
authService = inject(AuthService)

private router = inject(Router)

highestPrioTask = "";

greeting = "";

urgentTasks: Task[] = [];
mediumTasks: Task[] = [];
lowTasks: Task[] = [];

shownDueDate = "";

constructor() {
  this.fillTaskLists()
  this.getHighestPrioTask()
  this.setGreeting()
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
  if (this.urgentTasks.length > 0) {
    this.highestPrioTask = "Urgent"
    this.shownDueDate = this.getNextDueDate(this.urgentTasks)
  }
  else if (this.urgentTasks.length == 0 && this.mediumTasks.length > 0) {
    this.highestPrioTask = "Medium"
    this.shownDueDate = this.getNextDueDate(this.mediumTasks)
  }
  else if (this.urgentTasks.length == 0 && this.mediumTasks.length == 0) {
    this.highestPrioTask = "Low"
    this.shownDueDate = (this.getNextDueDate(this.lowTasks))
  }
  else {
    this.shownDueDate = "There are no open Tasks with deadlines"
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
  return closestDeadline.toDate().toLocaleDateString('en-UK');
}

getTaskQuantity(type:string) {
  let counter = 0
  this.boardService.taskList.filter((t) => {
    if(t.columnCategory == type) {
      counter ++;
    }
  })
  return counter
}

linkToBoard() {
  this.router.navigate(['/board']);
}

setGreeting() {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      this.greeting = "Good morning";
    } else if (hour < 18) {
      this.greeting = "Good afternoon";
    } else {
      this.greeting = "Good evening";
    }
  }

}

