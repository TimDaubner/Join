import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgModel, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Task} from '../../interfaces/task.interface'
import { Timestamp } from '@angular/fire/firestore';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FirebaseService } from '../../shared/services/firebase.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';

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

  firebase = inject(FirebaseService)

  newTask: Task = {
    title: "",
    description: "",
    dueDate: Timestamp.fromDate(new Date("2025-12-31")),
    priority: "Medium",
    assignedTo: [],
    taskCategory: "",
    subTask: [
      { status: true,  subDescription: "Verträge lesen" },
      { status: false, subDescription: "Verträge verstehen" },
      { status: false, subDescription: "Verträge ignorieren" }
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
        { status: true,  subDescription: "Verträge lesen" },
        { status: false, subDescription: "Verträge verstehen" },
        { status: false, subDescription: "Verträge ignorieren" }
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
        { status: true,  subDescription: "Verträge lesen" },
        { status: false, subDescription: "Verträge verstehen" },
        { status: false, subDescription: "Verträge ignorieren" }
      ],
      columnCategory: "To do",
    };
  }

  setTaskPriority(prio:string) {
    this.newTask.priority = prio
    console.log(this.newTask.priority);
  }
}
