'use strict';

document.addEventListener('DOMContentLoaded', function () {
  async function initializeApp() {
    // Import Firebase SDKs
    const {initializeApp} = await import('firebase/app');
    const {getAnalytics} = await import('firebase/analytics');

    // Initialize Firebase
    const firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.PROJECT_ID_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.PROJECT_ID_BUCK,
      messagingSenderId: process.env.SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    };
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    console.log(analytics);

    // Import FullCalendar
    const {Calendar} = await import('@fullcalendar/core');

    // Initialize the calendar
    const calendarEl = document.getElementById('calendar');
    const calendar = new Calendar(calendarEl, {
      initialView: 'dayGridMonth',

      // Event Click
      eventClick: function (info) {
        const eventDate = info.event.start;
        highlightDate(eventDate);
      },

      // Date Click
      dateClick: function (info) {
        highlightDate(info.date);
      },

      events: [
        {title: 'Course 1', start: '2024-11-01T16:30'},
        {title: 'Course 2', start: '2024-11-05T16:30'},
        {title: 'Nage 2', start: '2024-11-01T16:30'},
      ],
    });

    // Render the calendar
    calendar.render();

    // Function to highlight the selected date
    function highlightDate(date) {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const selectedDateCell = document.querySelector(`.fc-day[data-date="${formattedDate}"]`);
      if (selectedDateCell) {
        selectedDateCell.classList.add('selected-date');
      }
    }

    function unselectCell() {
      const dateCells = document.querySelectorAll('.fc-daygrid-day');
      dateCells.forEach(cell => {
        cell.classList.remove('selected-date');
      });
    }

    document.addEventListener('click', unselectCell);
    document.addEventListener('keydown', unselectCell);

    // Calendar controls
    const controls = document.querySelector('.calendar__controls');
    if (controls) {
      document.querySelector('#goToDate').addEventListener('click', () => {
        const dateInput = document.querySelector('#goDate').value;
        const date = new Date(dateInput);
        calendar.gotoDate(date);
        setTimeout(() => highlightDate(date), 1);
      });

      document.querySelector('#createEvent').addEventListener('click', () => {
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;
        const count = document.getElementById('count') ? document.getElementById('count').value : 1;

        if (title && date) {
          const btnEvent = document.getElementById('createEvent');
          const btnRecurringEvent = document.getElementById('createRecurringEvent');

          if (btnEvent && btnEvent === document.activeElement) {
            const regularEvent = {title, date};
            calendar.addEvent(regularEvent);
            setTimeout(() => highlightDate(date), 1);
          } else if (btnRecurringEvent && btnRecurringEvent === document.activeElement) {
            const recurringEvent = {
              title,
              date,
              rrule: {freq: 'weekly', count: parseInt(count, 10)},
            };
            calendar.addEvent(recurringEvent);
            setTimeout(() => highlightDate(date), 1);
          }

          document.getElementById('eventTitle').value = '';
          document.getElementById('eventDate').value = '';
          document.getElementById('count').value = '';
        } else {
          alert('Please fill out all fields!');
        }
      });

      document.getElementById('eventSearch').addEventListener('input', e => {
        const searchTerm = e.target.value.toLowerCase();
        const events = calendar.getEvents();
        unselectCell();

        events.forEach(event => {
          if (event.title.toLowerCase().includes(searchTerm)) {
            highlightDate(event.start);
          }
        });
      });
    }
  }

  // Call the async initialization function
  initializeApp().catch(error => console.error('Initialization error:', error));
});
