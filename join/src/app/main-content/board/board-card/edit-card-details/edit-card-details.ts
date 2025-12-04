import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../../interfaces/task.interface';
import { Timestamp } from '@angular/fire/firestore';
import { BoardService } from '../../../../shared/services/board/board.service';

@Component({
  selector: 'app-edit-card-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-card-details.html',
  styleUrl: './edit-card-details.scss',
})
export class EditCardDetails {
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<void>();
  board_service: BoardService = inject(BoardService);

  newTask = {
    title: 'Contact Form & Imprint',
    description: 'Create a contact form and imprint page',
    dueDate: Timestamp.fromDate(new Date('2025-12-31')),
    priority: 'Medium',
    assignedTo: [],
    subtasks: [
      { id: '', status: true, subDescription: 'Implement Recipe Recommendation' },
      { id: '', status: false, subDescription: 'Start Page layout' },
    ],
  };

  // closeWithAnimation() {
  //   this.isClosing = true;
  //   setTimeout(() => {
  //     this.isClosing = false;
  //   }, 200);
  // }

  closeEdit() {
    this.close.emit();
  }

  closeEditOnX() {
    this.close.emit();
  }
}
