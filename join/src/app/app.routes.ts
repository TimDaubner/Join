import { Routes } from '@angular/router';
import { MainContent } from './main-content/main-content';
import { PrivacyPolicy } from './privacy-policy/privacy-policy';
import { LegalNotice } from './legal-notice/legal-notice';
import { HelpSection } from './help-section/help-section';

export const routes: Routes = [
  { path: '', component: MainContent },
  { path: 'legal-notice', component: LegalNotice },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'help', component: HelpSection },
];
