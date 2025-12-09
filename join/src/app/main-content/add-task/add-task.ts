import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, HostListener, ElementRef} from '@angular/core';
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
  

  firebase = inject(ContactService);
  taskService = inject(BoardService);

  categoryDropdown = false;
  workerDropdown = false;
  selectedContacts: string[] = [];
  subtaskInput = "";
  isEditing = "";
  taskAdded = false;
  categoryTouched = false;
  assigneesInitialsCount:number = 5;
  

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
    this.taskService.addTaskToDatabase(this.newTask);
    console.log(this.taskService.taskColumnType);
    
    this.newTask = {
      title: "",
      description: "",
      dueDate: Timestamp.fromDate(new Date()),
      priority: "Medium",
      assignedTo: [],
      taskCategory: "",
      subTask: [],
      columnCategory: this.taskService.taskColumnType,
    };
    this.resetForm()
    this.taskAdded = true;

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
    this.selectedContacts = []
    this.resetForm()
  }

  resetForm() {
    this.taskTitle.control.markAsUntouched();
    this.taskTitle.control.markAsPristine();
    this.taskDate.control.markAsUntouched();
    this.taskDate.control.markAsPristine();
  }

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

  getShortName(name: string) {
    return name.length > 18 ? name.slice(0, 18) + '…' : name;
}

  getIcon(prio: string) {
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

  //note (hier könnte die ID probleme aufwerfen weil sie nicht eindeutig ist)
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

  @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
      const workerDD = this.dropdownRef?.nativeElement;
      const categoryDD = this.categoryDropdownRef?.nativeElement;
      const categoryTrigger = this.categoryTriggerRef?.nativeElement;

      if (workerDD && !workerDD.contains(event.target)) {
        this.workerDropdown = false;
      }

      if (
        categoryDD &&
        !categoryDD.contains(event.target) &&
        !categoryTrigger.contains(event.target)
      ) {
        this.categoryDropdown = false;
      }
    }

  @ViewChild('assigned_dropdown') dropdownRef!: ElementRef;
  @ViewChild('category_dropdown') categoryDropdownRef!: ElementRef;
  @ViewChild('category_trigger') categoryTriggerRef!: ElementRef;

}
