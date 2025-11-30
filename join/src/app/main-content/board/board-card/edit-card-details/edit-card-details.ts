import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../../interfaces/task.interface';

@Component({
  selector: 'app-edit-card-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-card-details.html',
  styleUrl: './edit-card-details.scss',
})
export class EditCardDetails {}
