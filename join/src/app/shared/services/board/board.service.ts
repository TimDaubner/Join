import { inject, Injectable, signal } from '@angular/core';
import {
  collection,
  Firestore,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { ColumnCategory, Task } from '../../../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  firestore: Firestore = inject(Firestore);
  initials: string[] = [];
  unsubscribe;
  // taskList: Task[] = [];
  taskList = signal<Task[]>([]);
  taskColumnType: ColumnCategory = 'To do'
  isAddTaskOpen: boolean = false;

  // Overlay
  isClosing: boolean = true;

  constructor() {
    this.unsubscribe = onSnapshot(collection(this.firestore, 'tasks'), (tasksSnapshot) => {
      
      const tasks:Task[] = [];
      tasksSnapshot.forEach((task) => {
        tasks.push(this.setTaskObject(task.id, task.data() as Task));
      });
      this.taskList.set(tasks);
    }, (error) => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  // sortTasks

  setTaskObject(idParam: string, obj: Task): Task {
    return {
      id: idParam,
      assignedTo: obj.assignedTo,
      columnCategory: obj.columnCategory,
      description: obj.description,
      dueDate: obj.dueDate,
      priority: obj.priority,
      subTask: obj.subTask,
      taskCategory: obj.taskCategory,
      title: obj.title,
    };
  }

  setTaskColumnType(type: ColumnCategory) {
    this.taskColumnType = type;
  }

  async addTaskToDatabase(task: Task) {
    task.columnCategory = this.taskColumnType;
    this.isAddTaskOpen = false;
    await addDoc(collection(this.firestore, 'tasks'), task);
  }

  getInitials(names: string[]) {
    let arrayAssignedTo = names;
    let firstInitial = [];
    let secondInitial = [];
    this.initials = [];
    for (let i = 0; i < arrayAssignedTo.length; i++) {
      firstInitial[i] = arrayAssignedTo[i].charAt(0);
      secondInitial[i] = arrayAssignedTo[i].charAt(arrayAssignedTo[i].indexOf(' ') + 1);
      return (this.initials[i] = firstInitial[i] + secondInitial[i]);
    }
    return;
  }

  async editTaskToDatabase($index: number, task: Task) {
    await updateDoc(doc(this.firestore, 'tasks', this.taskList()[$index].id!), {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      assignedTo: task.assignedTo,
      taskCategory: task.taskCategory,
      subTask: task.subTask,
      columnCategory: task.columnCategory,
    });
  }

  async editedTaskToDB(task: Task) {
    await updateDoc(doc(this.firestore, 'tasks', task.id!), {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      assignedTo: task.assignedTo,
      taskCategory: task.taskCategory,
      subTask: task.subTask,
      columnCategory: task.columnCategory,
    });
  }

  async deleteTask(task: Task) {
    await deleteDoc(doc(this.firestore, 'tasks', task.id!));
  }
}
