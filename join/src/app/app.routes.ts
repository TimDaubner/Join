import { Routes } from '@angular/router';
import { MainContent } from './main-content/main-content';
import { PrivacyPolicy } from './privacy-policy/privacy-policy';

export const routes: Routes = [
  { path: '', component: MainContent },
  // {path: 'imprint', component: Imprint},
  { path: 'privacy-policy', component: PrivacyPolicy },
  // {path: 'help', component: Help},
];
