import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Task, ColumnCategory} from '../../interfaces/task.interface'

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {

  newTask: Task = {
    title: "",
    description: "",
    dueDate: new Date("2001-01-01"),
    priority: "Medium",
    assignedTo: "",
    taskCategory: "User Story",
    subTask: ["Verträge lesen", "Verträge verstehen", "Verträge ignorieren"],
    columnCategory: "To do",
  };

  placeholder() {
    console.log(this.newTask);
    this.newTask = {
      title: "",
      description: "",
      dueDate: new Date("2001-01-01"),
      priority: "Medium",
      assignedTo: "",
      taskCategory: "User Story",
      subTask: ["Verträge lesen", "Verträge verstehen", "Verträge ignorieren"],
      columnCategory: "To do",
    };
  };

  clearForm() {
    this.newTask = {
      title: "",
      description: "",
      dueDate: new Date("2001-01-01"),
      priority: "Medium",
      assignedTo: "",
      taskCategory: "User Story",
      subTask: ["Verträge lesen", "Verträge verstehen", "Verträge ignorieren"],
      columnCategory: "To do",
    };
  }

  setTaskPriority(prio:string) {
    this.newTask.priority = prio
    console.log(this.newTask.priority);
  }
}
