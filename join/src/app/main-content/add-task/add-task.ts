import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule
  ],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
  providers: [
    provideNativeDateAdapter()
  ]
})
export class AddTask {

  firebase = inject(ContactService)

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

  placeholder() {
    console.log(this.newTask);
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

  setTaskPriority(prio:string) {
    this.newTask.priority = prio
    console.log(this.newTask.priority);
  }
}
