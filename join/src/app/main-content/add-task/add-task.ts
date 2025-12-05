import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { Component, inject, ViewChild} from '@angular/core';
=======
import { Component, inject, } from '@angular/core';
>>>>>>> tim
import { FormsModule, NgModel, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Task, Subtask } from '../../interfaces/task.interface'
import { Timestamp } from '@angular/fire/firestore';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ContactService } from '../../shared/services/contact/contact.service';
import { BoardService } from '../../shared/services/board/board.service';
import { Contact } from '../contact/contact';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
  providers: [
    provideNativeDateAdapter()
  ]
})
export class AddTask {

  private router = inject(Router);


  @ViewChild('taskTitle') taskTitle!: NgModel;
  @ViewChild('taskDate') taskDate!: NgModel;
  // @ViewChild('taskCategory') taskCategory!: NgModel;
  

  firebase = inject(ContactService);
  taskService = inject(BoardService);

  categoryDropdown = false;
  workerDropdown = false;
  selectedContacts: string[] = [];
  subtaskInput = "";
  isEditing = "";
<<<<<<< HEAD
  taskAdded = false;
  
=======

>>>>>>> tim

  newTask: Task = {
    title: "",
    description: "",
    dueDate: Timestamp.fromDate(new Date()),
    priority: "Medium",
    assignedTo: [],
    taskCategory: "",
    subTask: [],
    columnCategory: "To do",
  };

  submitTask() {
    console.log(this.newTask);
    this.taskService.addTaskToDatabase(this.newTask)
    this.newTask = {
      title: "",
      description: "",
      dueDate: Timestamp.fromDate(new Date()),
      priority: "Medium",
      assignedTo: [],
      taskCategory: "",
      subTask: [],
      columnCategory: "To do",
    };
    this.resetForm()
    this.taskAdded = true;

    // Nach 1.5 Sekunden ausblenden
    setTimeout(() => {
        this.taskAdded = false;
    }, 2900);
    setTimeout(() => {
      this.router.navigate(['/board']);
    }, 3000);

  };

  isSelected(contact: any): boolean {
    return this.selectedContacts.includes(contact.surname + ' ' + contact.lastname);
  }

  clearForm() {
    this.newTask = {
      title: "",
      description: "",
      dueDate: Timestamp.fromDate(new Date()),
      priority: "Medium",
      assignedTo: [],
      taskCategory: "",
      subTask: [],
      columnCategory: "To do",
    };
  }

<<<<<<< HEAD
  resetForm() {
    this.taskTitle.control.markAsUntouched();
    this.taskTitle.control.markAsPristine();
    this.taskDate.control.markAsUntouched();
    this.taskDate.control.markAsPristine();
  //   this.mail.control.markAsUntouched();
  //   this.mail.control.markAsPristine();
  }
=======

>>>>>>> tim

  selectCategory(value: string) {
    this.newTask.taskCategory = value;
    this.categoryDropdown = false;
    console.log(this.newTask.taskCategory);

  }

  toggleDropdown() {
    this.workerDropdown = !this.workerDropdown
  }

  getFullName(surname: string, lastname: string) {
    return surname + " " + lastname;
  }

  setTaskPriority(prio: string) {
    this.newTask.priority = prio
    console.log(this.newTask.priority);
  }

  logID(id: string | undefined) {
    console.log(id);

  }

  getInitials(name: string) {
    let firstInitial = "";
    let secondInitial = "";
    firstInitial = name.charAt(0);
    secondInitial = name.charAt(name.indexOf(" ") + 1);
    let initials = firstInitial + secondInitial;
    return initials;
  }

  getIcon(prio: string) {
<<<<<<< HEAD
  switch (prio) {
    case 'Urgent': return this.newTask.priority === 'Urgent'
      ? './assets/icons/prio_urgent_white.svg'
      : './assets/icons/prio_urgent.svg';
    case 'Medium': return this.newTask.priority === 'Medium'
      ? './assets/icons/prio_medium_white.svg'
      : './assets/icons/prio_medium.svg';
    case 'Low': return this.newTask.priority === 'Low'
      ? './assets/icons/prio_low_white.svg'
      : './assets/icons/prio_low.svg';
    default:
      return '';
=======
    switch (prio) {
      case 'Urgent': return this.newTask.priority === 'Urgent'
        ? './assets/icons/prio_urgent_white.svg'
        : './assets/icons/prio_urgent.svg';
      case 'Medium': return this.newTask.priority === 'Medium'
        ? './assets/icons/prio_medium_white.svg'
        : './assets/icons/prio_medium.svg';
      case 'Low': return this.newTask.priority === 'Low'
        ? './assets/icons/prio_low_white.svg'
        : './assets/icons/prio_low.svg';
      default:
        return '';
>>>>>>> tim
    }
  }

  toggleContact(contact: any) {
    const name = contact.surname + ' ' + contact.lastname;


    if (this.selectedContacts.includes(name)) {
      this.selectedContacts = this.selectedContacts.filter(c => c !== name);
    } else {
      this.selectedContacts.push(name);
    }
    this.newTask.assignedTo = [...this.selectedContacts];
    console.log(this.newTask.assignedTo);
  }

  clearSubtaskInput() {
    this.subtaskInput = "";
  }

  addSubtask() {
    let newId = this.newTask.subTask.length;
    this.newTask.subTask.push(
      {
        id: newId.toString(),
        status: false,
        subDescription: this.subtaskInput,
      })
    this.subtaskInput = "";
    console.log(this.newTask.subTask);
  }

  deleteSubtask(id: string) {
    this.newTask.subTask = this.newTask.subTask.filter(s => s.id !== id);
  }


  editingState: Record<string, boolean> = {};
  startEdit(id: string) {
    this.editingState[id] = true;
  }

  stopEdit(id: string) {
    this.editingState[id] = false;
  }
}
