import { Routes } from '@angular/router';
import { authGuard } from './shared/services/auth/auth-guard';
import { MainContent } from './main-content/main-content';
import { Login } from './main-content/login/login';
import { PrivacyPolicy } from './main-content/legal/privacy-policy/privacy-policy';
import { LegalNotice } from './main-content/legal/legal-notice/legal-notice';
import { HelpSection } from './main-content/help-section/help-section';
import { Summary } from './main-content/summary/summary';
import { AddTask } from './main-content/add-task/add-task';
import { Board } from './main-content/board/board';
import { Contact } from './main-content/contact/contact';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'contacts', component: Contact, canActivate: [authGuard]},
  { path: 'summary', component: Summary, canActivate: [authGuard]},
  { path: 'add-task', component: AddTask, canActivate: [authGuard]},
  { path: 'board', component: Board, canActivate: [authGuard]},
  { path: 'legal-notice', component: LegalNotice},
  { path: 'privacy-policy', component: PrivacyPolicy},
  { path: 'help', component: HelpSection, canActivate: [authGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
  // { path: 'logout', component: Logout },
];
