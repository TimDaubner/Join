import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../interfaces/task.interface';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-details.html',
  styleUrl: './card-details.scss',
})
export class CardDetails {
  @Input() selectedTask: Task | null = null;
  @Input() isTaskDetailsOpen: boolean = false;

  @Output() close = new EventEmitter<void>();

  closeTaskDetails() {
    this.close.emit();
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

  isEditOverlayOpen = false;

  editedTask: any = null; // task clicked to edit

  // Open Task Details overlay
  openTaskDetails(task: any) {
    this.selectedTask = task;
    this.isTaskDetailsOpen = true;
  }

  // Open Edit overlay
  openEditOverlay(task: any) {
    this.editedTask = { ...task }; // clone to avoid direct mutation
    this.isEditOverlayOpen = true;
  }
}
