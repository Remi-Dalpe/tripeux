'use strict';

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.PROJECT_ID_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.PROJECT_ID_BUCK,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
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
