import { Timestamp } from "@angular/fire/firestore";

export type ColumnCategory = "To do" | "In progress" | "Await feedback" | "Done";
export type taskCategory = "Technical Task" | "User Story";

export interface Task {
    id?: string;
    title: string,
    description: string,
    dueDate: Timestamp,
    priority: string,
    assignedTo: string,
    taskCategory: taskCategory,
    subTask: string[],
    columnCategory: ColumnCategory,
  }