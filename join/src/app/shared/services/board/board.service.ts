import { inject, Injectable } from '@angular/core';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Task } from '../../../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})

export class BoardService {

  firestore: Firestore = inject(Firestore);

  unsubscribe;
  taskList: Task[] = [];

  constructor() {
    this.unsubscribe = onSnapshot(collection(this.firestore, "tasks"), (tasksSnapshot) => {
      this.taskList = []
      tasksSnapshot.forEach((task) => {
        this.taskList.push(this.setTaskObject(task.data() as Task));
      });
    });
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  setTaskObject(obj: Task): Task {
    return {
      assignedTo: "",
      columnCategory: "",
      description: "",
      dueDate: new Date(),
      priority: "",
      subTask: {
        test: "",
        tester: false
      },
      taskCategory: "",
      titel: "",
    }
  }
}
