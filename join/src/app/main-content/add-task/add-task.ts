import { CommonModule } from '@angular/common';
import { Component, inject,} from '@angular/core';
import { FormsModule, NgModel, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Task} from '../../interfaces/task.interface'
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

  firebase = inject(ContactService);
  taskService = inject(BoardService);

  workerDropdown = false;

  newTask: Task = {
    title: "",
    description: "",
    dueDate: Timestamp.fromDate(new Date("2025-12-31")),
    priority: "Medium",
    assignedTo: [],
    taskCategory: "",
    subTask: [
      {id: "", status: true,  subDescription: "Verträge lesen" },
      {id: "", status: false, subDescription: "Verträge verstehen" },
      {id: "", status: false, subDescription: "Verträge ignorieren" }
    ],
    columnCategory: "To do",
  };

  submitTask() {
    console.log(this.newTask);
    this.taskService.addTaskToDatabase(this.newTask)
    this.newTask = {
      title: "",
      description: "",
      dueDate: Timestamp.fromDate(new Date("2025-12-31")),
      priority: "Medium",
      assignedTo: [],
      taskCategory: "",
      subTask: [
        {id: "", status: true,  subDescription: "Verträge lesen" },
        {id: "", status: false, subDescription: "Verträge verstehen" },
        {id: "", status: false, subDescription: "Verträge ignorieren" }
      ],
      columnCategory: "To do",
    };
  };

  clearForm() {
    this.newTask = {
      title: "",
      description: "",
      dueDate: Timestamp.fromDate(new Date("2025-12-31")),
      priority: "Medium",
      assignedTo: [],
      taskCategory: "User Story",
      subTask: [
        {id: "" , status: true,  subDescription: "Verträge lesen" },
        {id: "" , status: false, subDescription: "Verträge verstehen" },
        {id: "" , status: false, subDescription: "Verträge ignorieren" }
      ],
      columnCategory: "To do",
    };
  }

  toggleDropdown() {
    this.workerDropdown = !this.workerDropdown
  }

  setTaskPriority(prio:string) {
    this.newTask.priority = prio
    console.log(this.newTask.priority);
  }

  logID(id:string | undefined) {
    console.log(id);
    
  }


  // funzt soweit, nur klappt es nicht wenn man direkt auf die checkbox klickt. 
  toggleContact(contact: string, checkbox: HTMLInputElement, event: MouseEvent) {
    checkbox.checked = !checkbox.checked

    if (checkbox.checked) {
    if (!this.newTask.assignedTo.includes(contact)) {
      this.newTask.assignedTo.push(contact);
    }
    console.log( this.newTask.assignedTo);
    
  } else {
    this.newTask.assignedTo = this.newTask.assignedTo.filter(
      c => c !== contact
    );
    console.log( this.newTask.assignedTo);
  }
}

}
