// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Task } from '../../../../interfaces/task.interface';
// import { Timestamp } from '@angular/fire/firestore';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatIconModule } from '@angular/material/icon';
// import { provideNativeDateAdapter } from '@angular/material/core';

// @Component({
//   selector: 'app-edit-card-details',
//   imports: [CommonModule, FormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatIconModule],
//   templateUrl: './edit-card-details.html',
//   styleUrl: './edit-card-details.scss',
//   providers: [
//     provideNativeDateAdapter()
//   ]
// })
// export class EditCardDetails {
//   // @Input() task: Task | null = null;
//   // @Output() close = new EventEmitter<void>();

//   // workerDropdown = false;
//   // selectedContacts: string[] = [];
//   // subtaskInput = "";

//   // newTask = {
//   //   title: 'Contact Form & Imprint',
//   //   description: 'Create a contact form and imprint page',
//   //   dueDate: Timestamp.fromDate(new Date('2025-12-31')),
//   //   priority: 'Medium',
//   //   assignedTo: [],
//   //   subtasks: [
//   //     { id: '', status: true, subDescription: 'Implement Recipe Recommendation' },
//   //     { id: '', status: false, subDescription: 'Start Page layout' },
//   //   ],
//   // };

//   // closeWithAnimation() {
//   //   this.isClosing = true;
//   //   setTimeout(() => {
//   //     this.isClosing = false;
//   //   }, 200);
//   // }

//   closeEdit() {
//     this.close.emit();
//   }

//   closeEditOnX() {
//     this.close.emit();
//   }

//   setTaskPriority(prio: string) {
//     this.newTask.priority = prio
//   }

//   getIcon(prio: string) {
//     switch (prio) {
//       case 'Urgent': return this.newTask.priority === 'Urgent'
//         ? './assets/icons/prio_urgent_white.svg'
//         : './assets/icons/prio_urgent.svg';
//       case 'Medium': return this.newTask.priority === 'Medium'
//         ? './assets/icons/prio_medium_white.svg'
//         : './assets/icons/prio_medium.svg';
//       case 'Low': return this.newTask.priority === 'Low'
//         ? './assets/icons/prio_low_white.svg'
//         : './assets/icons/prio_low.svg';
//       default:
//         return '';
//     }
//   }

//   toggleDropdown() {
//     this.workerDropdown = !this.workerDropdown
//   }

//   isSelected(contact: any): boolean {
//     return this.selectedContacts.includes(contact.surname + ' ' + contact.lastname);
//   }

//   toggleContact(contact: any) {
//     const name = contact.surname + ' ' + contact.lastname;


//     if (this.selectedContacts.includes(name)) {
//       this.selectedContacts = this.selectedContacts.filter(c => c !== name);
//     } else {
//       this.selectedContacts.push(name);
//     }
//   }

//   getFullName(surname: string, lastname: string) {
//     return surname + " " + lastname;
//   }

//   getInitials(name: string) {
//     let firstInitial = "";
//     let secondInitial = "";
//     firstInitial = name.charAt(0);
//     secondInitial = name.charAt(name.indexOf(" ") + 1);
//     let initials = firstInitial + secondInitial;
//     return initials;
//   }
// }
