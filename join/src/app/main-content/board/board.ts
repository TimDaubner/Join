import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ColumnCategory, Task } from './../../interfaces/task.interface';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Timestamp } from '@angular/fire/firestore';
import { BoardService } from '../../shared/services/board/board.service';
import { CardDetails } from './board-card/card-details/card-details';
import { ContactService } from '../../shared/services/contact/contact.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDropList, CardDetails],
  templateUrl: './board.html',
  styleUrls: ['./board.scss'],
})
export class Board {
  //TODO - change due Date to date Month/Day/Year
  board_service = inject(BoardService);
  contact_service = inject(ContactService);
  isAddTaskOpen: boolean = false;
  selectedTask: Task | null = null;
  isTaskDetailsOpen: boolean = false;

  constructor() {
    this.init();
  }

  columnsTitel: string[] = ['To do', 'In progress', 'Await feedback', 'Done'];
  allTasks: Task[] = [];
  filteredTasks: Task[] = [];
  tasksToDo: Task[] = [];
  tasksInProgress: Task[] = [];
  tasksAwaitFeedback: Task[] = [];
  tasksDone: Task[] = [];
  isVisible: boolean = false;

  async init() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.renderTasks();
  }

  renderTasks() {
    console.log(this.board_service.taskList[0].id);
  }

  searchTask(keyWord: string) {
    if(keyWord === ''){
      this.filteredTasks = this.board_service.taskList;
    }
    else{
      this.filteredTasks = this.board_service.taskList.filter(task =>
        task.title.toLowerCase().includes(keyWord) ||
        task.description.toLowerCase().includes(keyWord)
      );
    }
  }

  showAddTaskComponent() {
    if (!this.isAddTaskOpen) {
      this.isAddTaskOpen = true;
    } else {
      this.isAddTaskOpen = false;
    }
  }

  openTaskDetails(task: Task) {
    this.selectedTask = task;
    this.isTaskDetailsOpen = true;
    setTimeout(()=>{
      this.board_service.isClosing = false;
    },100);
  }

  closeTaskDetails() {
    this.isTaskDetailsOpen = false;
    this.selectedTask = null;
  }

  updateTasks(type: string) {}

  getInitials(name: string) {
    let firstInitial = '';
    let secondInitial = '';
    firstInitial = name.charAt(0);
    secondInitial = name.charAt(name.indexOf(' ') + 1);
    let initials = firstInitial + secondInitial;
    return initials;
  }

  getFullName(surname: string, lastname: string) {
    return surname + ' ' + lastname;
  }

  drop(event: CdkDragDrop<Task[]>, columnTitle: string) {
    const task: Task = event.item.data;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.changeColumnType(columnTitle, task);
    }
  }

  changeColumnType(id: string, task: Task) {
    const index = this.board_service.taskList.findIndex((t) => t.id === task.id);
    task.columnCategory = id as ColumnCategory;
    this.board_service.editTaskToDatabase(index, task);
  }

  getTasksForColumn(title: string) {
    if(this.filteredTasks.length > 0){
      return this.filteredTasks.filter(task => task.columnCategory === title);
    }
    else{
      return this.board_service.taskList.filter(t => t.columnCategory === title);
    }
  }

  getCompletedSubtasksCount(task: Task): number {
    return task.subTask.filter((sub) => sub.status).length;
  }

  getPriorityIcon(priority?: string): string {
    if (!priority) return '';
    switch (priority.toLowerCase()) {
      case 'urgent':
        return './assets/icons/prio_urgent.svg';
      case 'medium':
        return './assets/icons/prio_medium.svg';
      case 'low':
        return './assets/icons/prio_low.svg';
      default:
        return '';
    }
  }

  toggleSubtask(sub: { id: string; subDescription: string; status: boolean }, event: Event) {
    event.preventDefault();

    sub.status = !sub.status;
  }
}

//SORT in HTML with class or boolean
// check in which columnCategory
// this.board_service.taskList.forEach((task) => {
//   this.columns.forEach(column => {
//     switch (column.title) {
//       case 'To Do':
//         this.tasksToDo.push(task);
//         this.tasksToDo.forEach(element => {
//         });
//         break;
//         case 'In progress':
//         this.tasksInProgress.push(task);
//         this.tasksInProgress.forEach(element => {
//         });
//         break;
//         case 'Await feedback':
//           this.tasksAwaitFeedback.push(task);
//           this.tasksAwaitFeedback.forEach(element => {
//           });
//           break;
//           case 'Done':
//             this.tasksDone.push(task);
//             this.tasksDone.forEach(element => {
//             });
//         break;
//       default:
//         break;
//     }
//   });
// });
