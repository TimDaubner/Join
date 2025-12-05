import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../../../interfaces/task.interface';
import { EditCardDetails } from '../edit-card-details/edit-card-details';
import { ContactService } from '../../../../shared/services/contact/contact.service';
import { BoardService } from '../../../../shared/services/board/board.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule, EditCardDetails],
  templateUrl: './card-details.html',
  styleUrl: './card-details.scss',
})
export class CardDetails {
  contact_service = inject(ContactService);
  board_service = inject(BoardService);
  isEditOverlayOpen = false;
  editedTask: any = null;

  @Input() selectedTask: Task | null = null;
  @Input() isTaskDetailsOpen: boolean = false;

  @Output() close = new EventEmitter<void>();

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

  toggleSubtask(sub: { id: string; subDescription: string; status: boolean }, event: Event) {
    event.preventDefault();

    sub.status = !sub.status;
  }

  openEditOverlay(task: any) {
    this.editedTask = { ...task };
    this.isEditOverlayOpen = true;
  }

  closeEditOverlay() {
    this.isEditOverlayOpen = false;
  }

  closeTaskDetails() {
    this.board_service.isClosing = true;
    setTimeout(() => {
      this.close.emit();
    }, 400);
  }

  deleteTask(task: Task) {
    this.board_service.deleteTask(task);
    this.isEditOverlayOpen = false;
    this.closeTaskDetails();
  }

  getDueDate(date: any){
    return date.toDate().toLocaleDateString('en-UK');
  }
}
