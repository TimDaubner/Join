import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-card-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-card-details.html',
  styleUrl: './edit-card-details.scss',
})
export class EditCardDetails {}
