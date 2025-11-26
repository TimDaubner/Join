import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Task } from './../../interfaces/task.interface';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDropList],
  templateUrl: './board.html',
  styleUrls: ['./board.scss'],
})
export class Board {
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
          category: 'User Story',
          priority: 'medium',
          status: 'todo',
          duedate: Timestamp.now(),
          assignees: ['John', 'Maria'],
          subtasks: [
            { id: '1.1', title: 'Create layout', isdone: false },
            { id: '1.2', title: 'Add logo', isdone: true },
          ],
        },
        {
          id: '2',
          title: 'Setup database',
          description: 'Initialize Firebase project',
          category: 'Technical Task',
          priority: 'high',
          status: 'todo',
          duedate: Timestamp.now(),
          assignees: [],
          subtasks: [],
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
          category: 'Technical Task',
          priority: 'high',
          status: 'in-progress',
          duedate: Timestamp.now(),
          assignees: ['Anna'],
          subtasks: [
            { id: '3.1', title: 'Email login', isdone: true },
            { id: '3.2', title: 'Password reset', isdone: false },
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
          category: 'User Story',
          priority: 'low',
          status: 'await-feedback',
          duedate: Timestamp.now(),
          assignees: ['Client'],
          subtasks: [],
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
          category: 'Technical Task',
          priority: 'low',
          status: 'done',
          duedate: Timestamp.now(),
          assignees: [],
          subtasks: [
            { id: '5.1', title: 'Initialize repo', isdone: true },
            { id: '5.2', title: 'Setup project structure', isdone: true },
          ],
        },
      ],
    },
  ];

  drop(event: CdkDragDrop<Task[]>, columnTitle: string) {
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
    }
  }

  getConnectedColumns() {
    return this.columns.map((c) => c.title);
  }

  getCompletedSubtasksCount(task: Task): number {
    return task.subtasks.filter((sub) => sub.isdone).length;
  }
}
