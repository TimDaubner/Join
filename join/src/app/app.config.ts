import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "join-585ee", appId: "1:69329162459:web:f5c875c3c6aab97484fcfe", storageBucket: "join-585ee.firebasestorage.app", apiKey: "AIzaSyCokq98kJ4VnDSvOD0dUaJCzn_bmMAsvFA", authDomain: "join-585ee.firebaseapp.com", messagingSenderId: "69329162459", projectNumber: "69329162459", version: "2" })), provideFirestore(() => getFirestore())
  ]
};
