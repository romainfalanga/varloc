// Main app logic for VarLoc
(function() {
  'use strict';

  // ========== Utility ==========
  function formatPrice(n) {
    return n.toFixed(2).replace('.', ',');
  }

  // ========== Navbar scroll effect ==========
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ========== Mobile nav toggle ==========
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
    });
  });

  // ========== Smooth scroll for anchor links ==========
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ========== Active nav highlighting ==========
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  function highlightNav() {
    var scrollY = window.scrollY + 120;
    sections.forEach(function(section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNav);

  // ========== Render product cards ==========
  function renderProductCards() {
    var categoryMap = {
      sono: 'products-sono',
      festive: 'products-festive',
      reception: 'products-reception',
      pro: 'products-pro',
      vaisselle: 'products-vaisselle',
      photo: 'products-photo'
    };

    for (var key in categoryMap) {
      var containerId = categoryMap[key];
      var container = document.getElementById(containerId);
      if (!container || !PRODUCTS[key]) continue;

      var html = '';
      for (var i = 0; i < PRODUCTS[key].length; i++) {
        var p = PRODUCTS[key][i];
        var isDiscount = p.discountEligible;
        html += '<div class="product-card ' + (isDiscount ? 'discount-eligible' : '') + '">';
        html += '<div class="product-card-header">';
        html += '<div class="product-name">' + p.name + '</div>';

        if (p.hasOptions) {
          html += '<div class="product-price">\u00e0 partir de ' + formatPrice(p.options[0].price) + ' \u20ac</div>';
        } else if (p.priceLabel) {
          html += '<div class="product-price">' + p.priceLabel + '</div>';
        } else {
          html += '<div class="product-price">' + formatPrice(p.price) + ' \u20ac ' + p.unit + '</div>';
        }
        html += '</div>';

        if (p.description) {
          html += '<div class="product-description">' + p.description + '</div>';
        }

        if (p.supplements && p.supplements.length > 0) {
          html += '<div class="product-supplements">';
          for (var s = 0; s < p.supplements.length; s++) {
            html += '<div class="supplement-item">' + p.supplements[s].label + ' : ' + p.supplements[s].detail + '</div>';
          }
          html += '</div>';
        }

        if (p.hasOptions) {
          html += '<div class="product-options">';
          for (var o = 0; o < p.options.length; o++) {
            html += '<div class="product-option">' + p.options[o].label + ' : <strong>' + p.options[o].price + ' \u20ac</strong></div>';
          }
          html += '</div>';
        }

        html += '</div>';
      }

      container.innerHTML = html;
    }
  }

  // ========== Contact form handler ==========
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Merci pour votre demande ! Nous vous recontacterons dans les plus brefs d\u00e9lais.');
      contactForm.reset();
    });
  }

  // ========== Scroll reveal animation ==========
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-50px' });

  document.querySelectorAll('.reveal').forEach(function(el) {
    revealObserver.observe(el);
  });

  // ========== Animated counters ==========
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    var start = 0;
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic for a smooth deceleration
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-50px' });

  document.querySelectorAll('.hero-stat-number[data-target]').forEach(function(el) {
    counterObserver.observe(el);
  });

  // ========== Init ==========
  renderProductCards();
  highlightNav();
})();
