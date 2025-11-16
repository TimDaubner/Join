import { Routes } from '@angular/router';
import { MainContent } from './main-content/main-content';
import { PrivacyPolicy } from './main-content/legal/privacy-policy/privacy-policy';
import { LegalNotice } from './main-content/legal/legal-notice/legal-notice';
import { HelpSection } from './main-content/help-section/help-section';
import { Summary } from './main-content/summary/summary';
import { AddTask } from './main-content/add-task/add-task';
import { Board } from './main-content/board/board';

export const routes: Routes = [
  { path: 'contacts', component: MainContent },
  { path: 'summary', component: Summary },
  { path: 'add-task', component: AddTask },
  { path: 'board', component: Board },
  { path: 'legal-notice', component: LegalNotice },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'help', component: HelpSection },
  // { path: 'logout', component: Logout },
];
