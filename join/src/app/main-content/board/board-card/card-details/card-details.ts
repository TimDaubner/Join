import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../interfaces/task.interface';
import { EditCardDetails } from '../edit-card-details/edit-card-details';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule, EditCardDetails],
  templateUrl: './card-details.html',
  styleUrl: './card-details.scss',
})
export class CardDetails {
  isEditOverlayOpen = false;
  editedTask: any = null;

  @Input() selectedTask: Task | null = null;
  @Input() isTaskDetailsOpen: boolean = false;

  @Output() close = new EventEmitter<void>();

  getPriorityIcon(priority?: string): string {
    if (!priority) return '';
    switch (priority.toLowerCase()) {
      case 'high':
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

  overlayAnimation = 'slide-in';

  closeTaskDetails() {
    this.overlayAnimation = 'slide-out';

    setTimeout(() => {
      this.close.emit();
      this.overlayAnimation = 'slide-in';
    }, 300);
  }
}
