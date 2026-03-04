(function () {
  'use strict';

  // Smooth scroll for nav links (enhance native scroll-behavior)
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        var id = href.slice(1);
        var target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Optional: tooltip for map pins (data-location)
  document.querySelectorAll('.map-pin[data-location]').forEach(function (pin) {
    var location = pin.getAttribute('data-location');
    if (!location) return;
    pin.setAttribute('title', location);
  });

  // Optional: click sticky to expand (add .sticky-note--expandable and data-more for content)
  document.querySelectorAll('.sticky-note[data-more]').forEach(function (sticky) {
    sticky.style.cursor = 'pointer';
    sticky.addEventListener('click', function () {
      this.classList.toggle('is-expanded');
    });
  });
})();
