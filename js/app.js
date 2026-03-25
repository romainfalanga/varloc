// Main app logic for VarLoc
(function() {
  'use strict';

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
  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
    });
  });

  // ========== Render product cards ==========
  function renderProductCards() {
    const categoryMap = {
      sono: 'products-sono',
      festive: 'products-festive',
      reception: 'products-reception',
      pro: 'products-pro',
      vaisselle: 'products-vaisselle',
      photo: 'products-photo'
    };

    for (const [key, containerId] of Object.entries(categoryMap)) {
      const container = document.getElementById(containerId);
      if (!container || !PRODUCTS[key]) continue;

      let html = '';
      for (const p of PRODUCTS[key]) {
        const isDiscount = p.discountEligible;
        html += `<div class="product-card ${isDiscount ? 'discount-eligible' : ''}">`;
        html += `<div class="product-card-header">`;
        html += `<div class="product-name">${p.name}</div>`;

        if (p.hasOptions) {
          html += `<div class="product-price">à partir de ${formatPrice(p.options[0].price)} €</div>`;
        } else if (p.priceLabel) {
          html += `<div class="product-price">${p.priceLabel}</div>`;
        } else {
          html += `<div class="product-price">${formatPrice(p.price)} € ${p.unit}</div>`;
        }
        html += `</div>`;

        if (p.description) {
          html += `<div class="product-description">${p.description}</div>`;
        }

        // Supplements
        if (p.supplements && p.supplements.length > 0) {
          html += `<div class="product-supplements">`;
          for (const s of p.supplements) {
            html += `<div class="supplement-item">${s.label} : ${s.detail}</div>`;
          }
          html += `</div>`;
        }

        // Options for photobooth
        if (p.hasOptions) {
          html += `<div class="product-options">`;
          for (const opt of p.options) {
            html += `<div class="product-option">${opt.label} : <strong>${opt.price} €</strong></div>`;
          }
          html += `</div>`;
        }

        html += `</div>`;
      }

      container.innerHTML = html;
    }
  }

  function formatPrice(n) {
    return n.toFixed(2).replace('.', ',');
  }

  // ========== Contact form ==========
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Merci pour votre demande ! Nous vous recontacterons dans les plus brefs délais.');
      contactForm.reset();
    });
  }

  // ========== Init ==========
  renderProductCards();
})();
