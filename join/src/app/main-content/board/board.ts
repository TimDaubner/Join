import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ColumnCategory, Task } from './../../interfaces/task.interface';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BoardService } from '../../shared/services/board/board.service';
import { CardDetails } from './board-card/card-details/card-details';
import { AddTask } from "../add-task/add-task";
import { Router } from '@angular/router';
import { ContactService } from '../../shared/services/contact/contact.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDropList, CardDetails, AddTask],
  templateUrl: './board.html',
  styleUrls: ['./board.scss'],
})
export class Board {
  board_service = inject(BoardService);
  contact_service = inject(ContactService);
  selectedTask: Task | null = null;
  isTaskDetailsOpen: boolean = false;
  private router = inject(Router);
  @ViewChild('taskRef') task!: AddTask;

  columnsTitel: ColumnCategory[] = ['To do', 'In progress', 'Await feedback', 'Done'];
  filteredTasks: Task[] = [];
  isVisible: boolean = false;
  isDragging: boolean = false;

  searchTask(keyWord: string) {
    if (keyWord.trim() === '') {
      this.filteredTasks = this.board_service.taskList;
    }
    else {
      keyWord = keyWord.toLowerCase();
      this.filteredTasks = this.board_service.taskList.filter(task =>
        task.title.toLowerCase().includes(keyWord) ||
        task.description.toLowerCase().includes(keyWord)
      );
    }
  }

  openAddTaskComponent(){
    this.router.navigate(['/add-task']);
  }

  showAddTaskComponent(title:ColumnCategory) {
    if (!this.board_service.isAddTaskOpen) {
      this.board_service.setTaskColumnType(title);
      this.board_service.isAddTaskOpen = true;
    } else {
      this.board_service.isAddTaskOpen = false;
    }
  }

  closeAddTaskComponent() {
    this.board_service.isAddTaskOpen = false;
    this.task.resetForm();   
    this.task.clearForm();    
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  openTaskDetails(task: Task) {
    if (!this.isDragging) {
      this.selectedTask = task;
      this.isTaskDetailsOpen = true;
      setTimeout(() => {
        this.board_service.isClosing = false;
      }, 100);
    }
  }

  closeTaskDetails() {
    this.isTaskDetailsOpen = false;
    this.selectedTask = null;
  }

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

  onDragStarted() {
    this.isDragging = true;
  }

  onDragEnded(task: any) {
    setTimeout(() => this.isDragging = false, 50);
  }

  changeColumnType(id: string, task: Task) {
    const index = this.board_service.taskList.findIndex((t) => t.id === task.id);
    task.columnCategory = id as ColumnCategory;
    this.board_service.editTaskToDatabase(index, task);
  }

  getTasksForColumn(title: string) {
    if (this.filteredTasks.length > 0) {
      return this.filteredTasks.filter(task => task.columnCategory === title);
    }
    else {
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
