import { Component } from '@angular/core';
import { Contact } from './contact/contact';
import { Board } from './board/board';
import { AddTask } from './add-task/add-task';

@Component({
  selector: 'app-main-content',
  imports: [Contact,Board,AddTask],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {}
