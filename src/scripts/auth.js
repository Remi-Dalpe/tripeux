'use strict';

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

const auth = getAuth();

document.addEventListener('DOMContentLoaded', () => {
  ///////////////////////////////////////
  // Persistence
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      const email = document.querySelector('#email-login').value;
      const password = document.querySelector('#password-login').value;

      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch(error => {
      console.error('Persistence error:', error.message);
    });

  ///////////////////////////////////////
  // subscribing to auth changes
  const unsubAuth = onAuthStateChanged(auth, user => {
    // Check if the user is logged in
    if (user) {
      ///////////////////////////////////////
      // Update UI

      // Add profile nav element in home when logged in
      const navLinks = document.querySelector('#nav-profile');
      if (navLinks && window.location.pathname.endsWith('/index.html')) navLinks.classList.remove('hidden');

      // Replace login btn
      const btnNav = document.querySelector('.nav__link--btn');
      btnNav.textContent = 'Se déconnecter';
      btnNav.setAttribute('data-modal', 'logout');

      // Update the section header with the username
      const userameDisplayElement = document.querySelector('#userDisplayName');
      if (userameDisplayElement) {
        userameDisplayElement.textContent = user.displayName;
      }
    } else {
      console.log('User is signed out');
      if (window.location.pathname !== '/JekyllTRIpeux/index.html') {
        window.location.href = '/JekyllTRIpeux/index.html'; // Redirect to login page
      }
    }
  });

  ///////////////////////////////////////
  // unsubscribing from changes (auth & db)
  const unsubButton = document.querySelector('.unsub');
  unsubButton.addEventListener('click', () => {
    console.log('unsubscribing');
    unsubAuth();
  });

  ///////////////////////////////////////
  // signing up
  const signupForm = document.querySelector('#signup');
  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();

      const username = document.querySelector('#username').value;
      const email = document.querySelector('#email-signup').value;
      const password = document.querySelector('#password-signup').value;

      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Update the user profile w/ username
          const user = userCredential.user;
          return updateProfile(user, {
            displayName: username,
          });
        })
        .then(() => {
          window.location.href = '/JekyllTRIpeux/src/pages/user.html';
        })
        .then(() => {
          console.log('user created');
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  }

  ///////////////////////////////////////
  // logging in
  const loginForm = document.querySelector('#login');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();

      const email = document.querySelector('#email-login').value;
      const password = document.querySelector('#password-login').value;

      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('user logged in');
          window.location.href = '/JekyllTRIpeux/index.html';
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  }

  ///////////////////////////////////////
  // logging out
  const logoutButton = document.querySelector('.btn-logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      signOut(auth)
        .then(() => {
          console.log('user logged out');
          window.location.href = '/JekyllTRIpeux/index.html';
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  }
});
