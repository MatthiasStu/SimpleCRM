import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simplecrm-a7336","appId":"1:305789315081:web:b481cb77c4ddfe7e00f0d8","storageBucket":"simplecrm-a7336.appspot.com","apiKey":"AIzaSyBiHkYs5b8sNXuQGHhd1xZh8Li6-ITgW5Y","authDomain":"simplecrm-a7336.firebaseapp.com","messagingSenderId":"305789315081"})), provideFirestore(() => getFirestore())]
};
