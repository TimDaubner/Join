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