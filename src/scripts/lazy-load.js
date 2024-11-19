'use strict';

// document.addEventListener('DOMContentLoaded', () => {
//   const lazyImages = document.querySelectorAll('img.lazy-img');

//   const preloadImage = img => {
//     const fullSrc = img.dataset.fullsrc;
//     if (!fullSrc) return;

//     const highResImg = new Image();
//     highResImg.src = fullSrc;
//     highResImg.onload = () => {
//       img.src = fullSrc;
//       img.classList.remove('lazy-img'); // Optional: remove lazy class when loaded
//     };
//   };

//   const imgObserver = new IntersectionObserver(
//     (entries, observer) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           preloadImage(entry.target);
//           observer.unobserve(entry.target);
//         }
//       });
//     },
//     {rootMargin: '500px', threshold: 0.1}
//   );

//   lazyImages.forEach(img => imgObserver.observe(img));

//   // Fallback for browsers without IntersectionObserver
//   if (!('IntersectionObserver' in window)) {
//     lazyImages.forEach(img => preloadImage(img));
//   }
// });
