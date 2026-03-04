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

  // Explore: category cards open panel, back button closes
  var categoryGrid = document.querySelector('.category-grid');
  var categoryCards = document.querySelectorAll('.category-card');
  var categoryPanels = document.querySelectorAll('.category-panel');

  function showPanel(categoryId) {
    if (!categoryGrid) return;
    categoryGrid.classList.add('is-hidden');
    categoryGrid.setAttribute('aria-hidden', 'true');
    categoryCards.forEach(function (btn) {
      var selected = btn.getAttribute('data-category') === categoryId;
      btn.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
    categoryPanels.forEach(function (panel) {
      var isTarget = panel.id === 'panel-' + categoryId;
      panel.hidden = !isTarget;
    });
  }

  function showCategories() {
    if (!categoryGrid) return;
    categoryGrid.classList.remove('is-hidden');
    categoryGrid.setAttribute('aria-hidden', 'false');
    categoryCards.forEach(function (btn) {
      btn.setAttribute('aria-selected', 'false');
    });
    categoryPanels.forEach(function (panel) {
      panel.hidden = true;
    });
  }

  categoryCards.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var category = this.getAttribute('data-category');
      if (category) showPanel(category);
    });
  });

  document.querySelectorAll('.category-panel-back').forEach(function (backBtn) {
    backBtn.addEventListener('click', showCategories);
  });

  var exploreSearch = document.querySelector('.explore-search');
  if (exploreSearch && categoryCards.length) {
    exploreSearch.addEventListener('input', function () {
      var q = this.value.trim().toLowerCase();
      categoryCards.forEach(function (btn) {
        var label = (btn.querySelector('.category-card-label') || {}).textContent || '';
        var match = !q || label.trim().toLowerCase().indexOf(q) !== -1;
        btn.style.display = match ? '' : 'none';
      });
    });
  }

  // About cards: click picture to open lightbox; click backdrop to close
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox && lightbox.querySelector('.lightbox-img');
  var lightboxBackdrop = lightbox && lightbox.querySelector('.lightbox-backdrop');

  document.querySelectorAll('.about-box-pic-btn').forEach(function (btn) {
    var img = btn.querySelector('img');
    if (!img || !lightbox) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.setAttribute('aria-hidden', 'false');
      lightbox.classList.add('is-open');
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  // Entry cards: click to expand/collapse
  document.querySelectorAll('.entry-card[data-entry]').forEach(function (card) {
    var head = card.querySelector('.entry-head');
    var body = card.querySelector('.entry-body');
    if (!head || !body) return;
    head.addEventListener('click', function () {
      var open = card.classList.toggle('is-open');
      head.setAttribute('aria-expanded', open);
      body.setAttribute('aria-hidden', !open);
    });
  });
})();
