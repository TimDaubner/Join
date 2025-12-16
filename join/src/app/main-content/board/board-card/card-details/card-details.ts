import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../../interfaces/task.interface';
import { ContactService } from '../../../../shared/services/contact/contact.service';
import { BoardService } from '../../../../shared/services/board/board.service';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatIconModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './card-details.html',
  styleUrl: './card-details.scss',
})
export class CardDetails {
  contact_service = inject(ContactService);
  board_service = inject(BoardService);
  
  @Input() selectedTask: Task | null = null;
  @Input() isTaskDetailsOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  // State
  isEditing = false;
  editedTask: any = {}; // Kopie für das Formular
  
  // Edit UI States
  workerDropdown = false;
  subtaskInput = "";

  // ##########################################
  // # LOGIC: VIEW MODE
  // ##########################################

  getPriorityIcon(priority?: string): string {
    if (!priority) return '';
    const p = priority.toLowerCase();
    return `./assets/icons/prio_${p}.svg`;    
  }

  // Für die Edit-Buttons (Unterscheidung active/inactive Icons)
  getEditPriorityIcon(prio: string): string {
    const isActive = this.editedTask.priority === prio;
    const path = isActive ? `prio_${prio.toLowerCase()}_white.svg` : `prio_${prio.toLowerCase()}.svg`;

    return `./assets/icons/${path}`;
    
  }

  getInitials(name: string) {
    if(!name) return '';
    const parts = name.split(' ');
    let initials = parts[0].charAt(0);
    if(parts.length > 1) initials += parts[1].charAt(0);
    return initials.toUpperCase();
  }

  getFullName(surname: string, lastname: string) {
    return surname + ' ' + lastname;
  }

  getDueDate(date: any) {
    if (!date) return '';
    // Konvertierung falls Timestamp
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-UK');
  }

  toggleSubtaskStatus(sub: any, event: Event) {
    event.preventDefault();
    sub.status = !sub.status;
    // Hier optional direkt speichern, falls gewünscht:
    // this.board_service.updateTask(this.selectedTask);
  }

  // ##########################################
  // # LOGIC: EDIT MODE
  // ##########################################

  startEditing() {
    // 1. Deep Copy erstellen
    this.editedTask = JSON.parse(JSON.stringify(this.selectedTask));
    
    // 2. Datum für Datepicker vorbereiten (muss JS Date Object sein)
    if (this.editedTask.dueDate && this.editedTask.dueDate.seconds) {
        // Fall: Firebase Timestamp
        this.editedTask.dueDate = new Date(this.editedTask.dueDate.seconds * 1000);
    } else if (typeof this.editedTask.dueDate === 'string') {
        this.editedTask.dueDate = new Date(this.editedTask.dueDate);
    }
    
    this.isEditing = true;
    this.workerDropdown = false; // Reset dropdown
  }

  cancelEdit() {
    this.isEditing = false;
    this.editedTask = {};
  }

  saveTask() {
    // Daten zurückschreiben
    // Hinweis: Hier müsstest du ggf. das Date-Objekt wieder in einen Timestamp wandeln, 
    // falls dein Service das erwartet.
    
    Object.assign(this.selectedTask!, this.editedTask);
    this.board_service.editedTaskToDB(this.selectedTask!)
    
    // this.board_service.editTaskToDatabase()
    // Service Update Call hier:
    // this.board_service.updateTask(this.selectedTask).subscribe(...)
    
    this.isEditing = false;
  }

  // --- Priority Logic ---
  setPriority(prio: string) {
    this.editedTask.priority = prio;
  }

  // --- Assignee Dropdown Logic ---
  toggleDropdown() {
    this.workerDropdown = !this.workerDropdown;
  }

  isAssigned(contact: any): boolean {
    const fullname = this.getFullName(contact.surname, contact.lastname);
    return this.editedTask.assignedTo?.includes(fullname);
  }

  toggleContact(contact: any) {
    const fullname = this.getFullName(contact.surname, contact.lastname);
    if (!this.editedTask.assignedTo) this.editedTask.assignedTo = [];

    const index = this.editedTask.assignedTo.indexOf(fullname);
    if (index > -1) {
      this.editedTask.assignedTo.splice(index, 1); // Entfernen
    } else {
      this.editedTask.assignedTo.push(fullname); // Hinzufügen
    }
  }

  // --- Subtask Edit Logic ---
  addSubtask() {
    if(this.subtaskInput.trim()) {
        if(!this.editedTask.subTask) this.editedTask.subTask = [];
        this.editedTask.subTask.push({
            id: Date.now().toString(), // Simple ID gen
            subDescription: this.subtaskInput,
            status: false
        });
        this.subtaskInput = '';
    }
  }

  clearSubtaskInput() {
    this.subtaskInput = "";
  }

  deleteSubtask(id: string) {
    this.editedTask.subTask = this.editedTask.subTask.filter((s: { id: string; }) => s.id !== id);
  }

  editingState: Record<string, boolean> = {};
  
  startEdit(id: string) {
    this.editingState[id] = true;
  }

  stopEdit(id: string) {
    this.editingState[id] = false;
  }

  // ##########################################
  // # GENERAL ACTIONS
  // ##########################################

  closeTaskDetails() {
    this.isEditing = false;
    this.board_service.isClosing = true;
    setTimeout(() => {
      this.close.emit();
    }, 400);
  }

  deleteTask(task: Task) {
    this.board_service.deleteTask(task);
    this.closeTaskDetails();
  }
}