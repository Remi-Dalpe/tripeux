'use strict';

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: secrets.API_KEY,
  authDomain: secrets.PROJECT_ID_URL,
  projectId: secrets.PROJECT_ID,
  storageBucket: secrets.PROJECT_ID_BUCK,
  messagingSenderId: secrets.SENDER_ID,
  appId: secrets.APP_ID,
  measurementId: secrets.MEASUREMENT_ID,
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
