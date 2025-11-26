<<<<<<< HEAD
import { Timestamp } from "@angular/fire/firestore";

export interface Task {
    assignedTo: string;
    columnCategory:string;
    description:string;
    dueDate:Date | Timestamp;
    priority:string;
    subTask:Subtask;
    taskCategory:string;
    titel:string;
}

export interface Subtask {
    test?:string,
    tester?:boolean
}
=======
import { Timestamp } from '@angular/fire/firestore';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  duedate: Timestamp;
  assignees: string[];
  subtasks: Subtask[];
}

export interface Subtask {
  id: string;
  title: string;
  isdone: boolean;
}
>>>>>>> imra
