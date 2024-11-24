'use strict';

import '../src/styles/style.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDN18Aw6t5n_doGesWogkX1_mlFwGsQFWg',
  authDomain: 'tripeux-c95f7.firebaseapp.com',
  projectId: 'tripeux-c95f7',
  storageBucket: 'tripeux-c95f7.firebasestorage.app',
  messagingSenderId: '433186978727',
  appId: '1:433186978727:web:c7f519c88006812c611482',
  measurementId: 'G-LEJZ3HFHE1',
};

// Asynchronous Firebase initialization
(async () => {
  const {initializeApp} = await import('firebase/app');
  // const {getAnalytics} = await import('firebase/analytics');

  // const app =
  initializeApp(firebaseConfig);
  // getAnalytics(app);
})();
