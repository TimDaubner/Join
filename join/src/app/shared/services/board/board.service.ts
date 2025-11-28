import { inject, Injectable } from '@angular/core';
import { collection, Firestore, onSnapshot, Timestamp, addDoc } from '@angular/fire/firestore';
import { Task } from '../../../interfaces/task.interface';
import { ContactService } from '../contact/contact.service';

@Injectable({
  providedIn: 'root',
})

export class BoardService {

  firestore: Firestore = inject(Firestore);
  contact_service: ContactService = inject(ContactService);
  initials: string[] = [];
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

  // sortTasks

  setTaskObject(obj: Task): Task {
    return {
      id: "",
      title: "",
      description: "",
      dueDate: Timestamp.fromDate(new Date("2025-12-31")),
      priority: "",
      assignedTo: [],
      taskCategory: "",
      subTask: [],
      columnCategory: 'To do',
    }
  }

    async addTaskToDatabase(task: Task) {
      await addDoc(collection(this.firestore, "tasks"), task)
      console.log(" Task ist hochgeladen");
      console.log(task);
      
  }

  getInitials(index: number) {
    let arrayAssignedTo = this.taskList[index].assignedTo;
    let firstInitial = [];
    let secondInitial = [];
    for (let i = 0; i < arrayAssignedTo.length; i++) {
      firstInitial[i] = arrayAssignedTo[i].charAt(0);
      secondInitial[i] = arrayAssignedTo[i].charAt(arrayAssignedTo[i].indexOf(" ") + 1);
      this.initials[i] = firstInitial[i] + secondInitial[i];
    }
  }
}
