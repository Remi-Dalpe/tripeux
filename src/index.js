'use strict';

import './styles/style.css';

// Import the Firebase functions you need
const {initializeApp} = import('firebase/app');
const {getAnalytics} = import('firebase/analytics');

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log('Analytics initialized:', analytics);

// Dynamically import other modules after Firebase initializes
import('./scripts/auth.js');
import('./scripts/cal.js');
import('./scripts/modals.js');
import('./scripts/lazy-load.js');
import('./scripts/slider.js');
import('./scripts/user.js');
