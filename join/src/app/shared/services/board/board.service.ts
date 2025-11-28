import { inject, Injectable } from '@angular/core';
import { collection, Firestore, onSnapshot, Timestamp } from '@angular/fire/firestore';
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
        this.taskList.push(this.setTaskObject(task.id,task.data() as Task));
      });
    });
    setTimeout(()=>{
    console.log(this.taskList);
    },3000);
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  // sortTasks

  setTaskObject(idParam: string,obj: Task): Task {
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
    }
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
