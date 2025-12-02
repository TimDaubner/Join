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

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDropList, CardDetails],
  templateUrl: './board.html',
  styleUrls: ['./board.scss'],
})
export class Board {
  board_service = inject(BoardService);
  isAddTaskOpen: boolean = false;
  selectedTask: Task | null = null;
  isTaskDetailsOpen: boolean = false;

  constructor() {
    this.init();
  }
  allTasks: Task[] = [];
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
    this.board_service.taskList.forEach((task) => {
      if (task.title.toLocaleLowerCase().includes(keyWord.toLowerCase())) {
        // this.allTasks.forEach(task => {
        //   task.
        // });
        //render Task
      } else {
        //hide Task
      }
    });
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
  }

  closeTaskDetails() {
    this.isTaskDetailsOpen = false;
    this.selectedTask = null;
  }

  updateTasks(type: string) {}

  getInitials(name:string) {
    let firstInitial = "";
    let secondInitial = "";
      firstInitial = name.charAt(0);
      secondInitial = name.charAt(name.indexOf(" ") + 1);
      let initials = firstInitial + secondInitial;
      return initials;
  }

  // #region dummy data
  // columns: { title: string; tasks: Task[] }[] = [
  //   { title: 'To do', tasks: [] },
  //   { title: 'In progress', tasks: [] },
  //   { title: 'Await feedback', tasks: [] },
  //   { title: 'Done', tasks: [] },
  // ];
  columns: { title: string; tasks: Task[] }[] = [
    {
      title: 'To do',
      tasks: [
        {
          id: '1',
          title: 'Create login page',
          description: 'Design the UI for the login screen',
          taskCategory: 'User Story',
          priority: 'medium',
          columnCategory: 'To do',
          dueDate: Timestamp.now(),
          assignedTo: ['John', 'Maria'],
          subTask: [
            { id: '1.1', subDescription: 'Create layout', status: false },
            { id: '1.2', subDescription: 'Add logo', status: true },
          ],
        },
        {
          id: '2',
          title: 'Setup database',
          description: 'Initialize Firebase project',
          taskCategory: 'Technical Task',
          priority: 'high',
          columnCategory: 'To do',
          dueDate: Timestamp.now(),
          assignedTo: [],
          subTask: [],
        },
      ],
    },

    {
      title: 'In progress',
      tasks: [
        {
          id: '3',
          title: 'Implement Auth',
          description: 'Connect login form with backend',
          taskCategory: 'Technical Task',
          priority: 'high',
          columnCategory: 'To do',
          dueDate: Timestamp.now(),
          assignedTo: ['Anna'],
          subTask: [
            { id: '3.1', subDescription: 'Email login', status: true },
            { id: '3.2', subDescription: 'Password reset', status: false },
          ],
        },
      ],
    },

    {
      title: 'Await feedback',
      tasks: [
        {
          id: '4',
          title: 'Landing page draft',
          description: 'Waiting for feedback from client',
          taskCategory: 'User Story',
          priority: 'low',
          columnCategory: 'To do',
          dueDate: Timestamp.now(),
          assignedTo: ['Client'],
          subTask: [],
        },
      ],
    },

    {
      title: 'Done',
      tasks: [
        {
          id: '5',
          title: 'Create project repo',
          description: 'Initial commit + .gitignore',
          taskCategory: 'Technical Task',
          priority: 'low',
          columnCategory: 'To do',
          dueDate: Timestamp.now(),
          assignedTo: [],
          subTask: [
            { id: '5.1', subDescription: 'Initialize repo', status: true },
            { id: '5.2', subDescription: 'Setup project structure', status: true },
          ],
        },
      ],
    },
  ];

  drop(event: CdkDragDrop<Task[]>, columnTitle: string) {
    const task: Task = event.item.data;
    //checking for switching positions in same column
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.changeColumnType(event.container.id, task);
    }
  }

  changeColumnType(id: string, task: Task) {
    task.columnCategory = id as ColumnCategory;
  }

  getConnectedColumns() {
    return this.columns.map((c) => c.title);
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
