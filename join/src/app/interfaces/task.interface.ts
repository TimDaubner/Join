import { Timestamp } from "@angular/fire/firestore";

export type ColumnCategory = "To do" | "In progress" | "Await feedback" | "Done";


export interface Task {
    id?: string;
    title: string,
    description: string,
    dueDate: Timestamp,
    priority: string,
    assignedTo: string[],
    taskCategory: string,
    subTask: Subtask[],
    columnCategory: ColumnCategory,
  }

export interface Subtask {
  status: boolean,
  subDescription: string,
}