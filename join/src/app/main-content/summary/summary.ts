import { Component, inject } from '@angular/core';
import { BoardService } from '../../shared/services/board/board.service';
import { Task } from '../../interfaces/task.interface';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { ContactService } from '../../shared/services/contact/contact.service';
import { Auth, onIdTokenChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.html',
  styleUrl: './summary.scss',
})
export class Summary {

  boardService = inject(BoardService);
  authService = inject(AuthService);
  contactService = inject(ContactService);
  auth = inject(Auth);

  private router = inject(Router)

  highestPrioTask = "";

  greeting = "";

  urgentTasks: Task[] = [];
  mediumTasks: Task[] = [];
  lowTasks: Task[] = [];

  shownDueDate = "";

  ngOnInit() {
    this.fillTaskLists();
    this.getHighestPrioTask();
    this.setGreeting();
    if(this.authService.isNewUser){
      this.createContactObject(this.authService.currentuser);
    }
    const intervalId = setInterval(() => {
      if (this.contactService.contactList().length > 0) {
        this.getUserName(this.authService.currentuser);

        clearInterval(intervalId);
      }
    }, 50);
  }

  async createContactObject(uid: string) {
    // Felder setzen
    this.authService.contact.surname = this.authService.correctInput(this.authService.contact.surname);
    this.authService.contact.lastname = this.authService.correctInput(this.authService.contact.lastname);
    this.authService.contact.color = this.contactService.getRandomColor();

    // Name sofort setzen (nicht erst über getUserName suchen, der User ist ja noch nicht in der Liste)
    this.authService.currentUserName = this.authService.contact.surname + " " + this.authService.contact.lastname;
    this.authService.currentuser = uid;
    this.authService.contact.uid = this.authService.currentuser;
    this.authService.isNewUser = false;

    await this.contactService.addContactToDatabase(this.authService.contact);
    console.log(this.authService.contact);
    

    // Kontakt Objekt für DB vorbereiten
    // let newContact = this.contact_service.setContactObject(uid, this.contact, uid);

    // PROBLEM LÖSUNG: Optimistisches Update
    // Füge den Kontakt sofort zur lokalen Liste hinzu, damit er auf der nächsten Seite da ist!
    // this.contact_service.contactList().push(newContact); 

    // Jetzt in die Datenbank schreiben

    // getUserName ist hier eigentlich überflüssig, da wir die Namen oben schon haben,
    // aber wenn du es brauchst, wird es jetzt funktionieren, da wir gepusht haben.
    // this.getUserName(this.currentuser);
  }

  fillTaskLists() {
    for (let i = 0; i < this.boardService.taskList.length; i++) {
      if (this.boardService.taskList()[i].priority == 'Low') {
        this.lowTasks.push(this.boardService.taskList()[i]);
      } else if (this.boardService.taskList()[i].priority == 'Medium') {
        this.mediumTasks.push(this.boardService.taskList()[i]);
      } else if (this.boardService.taskList()[i].priority == 'Urgent') {
        this.urgentTasks.push(this.boardService.taskList()[i]);
      }
    }
  }

  getHighestPrioTask() {
    if (this.urgentTasks.length > 0) {
      this.highestPrioTask = "Urgent"
      this.shownDueDate = this.getNextDueDate(this.urgentTasks)
    }
    else if (this.urgentTasks.length == 0 && this.mediumTasks.length > 0) {
      this.highestPrioTask = "Medium"
      this.shownDueDate = this.getNextDueDate(this.mediumTasks)
    }
    else if (this.urgentTasks.length == 0 && this.mediumTasks.length == 0 && this.lowTasks.length > 0) {
      this.highestPrioTask = "Low"
      this.shownDueDate = (this.getNextDueDate(this.lowTasks))
    }
    else {
      this.shownDueDate = "There are no open Tasks with deadlines"
    }
  }

  getNextDueDate(prioList: Task[]) {
    if (prioList[0]) {

      let closestDeadline = prioList[0].dueDate;
      let taskTitle = "";
      for (let i = 1; i < prioList.length; i++) {
        if (closestDeadline > prioList[i].dueDate) {
          closestDeadline = prioList[i].dueDate;
          taskTitle = prioList[i].title
        }
      }
      return closestDeadline.toDate().toLocaleDateString('en-UK');
    }
    return 'No upcoming deadline';
  }

  getTaskQuantity(type: string) {
    let counter = 0
    this.boardService.taskList().filter((t) => {
      if (t.columnCategory == type) {
        counter++;
      }
    })
    return counter
  }

  linkToBoard() {
    this.router.navigate(['/board']);
  }

  setGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
      this.greeting = "Good morning,";
    } else if (hour < 18) {
      this.greeting = "Good afternoon,";
    } else {
      this.greeting = "Good evening,";
    }
  }

  getUserName(currentuser: string) {
    console.log(currentuser);
    console.log(this.contactService.contactList());

    this.contactService.contactList().filter((c) => {
      if (c.uid === currentuser) {
        this.authService.currentUserName = c.surname + " " + c.lastname;
        return
      }
    });
  }
}
