'use strict';

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = process.env.FIREBASE_API_KEY;
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey,
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
console.log(analytics);

import './styles/style.css';
import './scripts/auth.js';
import './scripts/cal.js';
import './scripts/modals.js';
import './scripts/perf.js';
import './scripts/slider.js';
import './scripts/user.js';
