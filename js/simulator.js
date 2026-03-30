// Simulator logic for VarLoc
(function() {
  'use strict';

  const state = {};

  function initStickySummary() {
    var simulatorSection = document.getElementById('simulator');
    var contactSection = document.getElementById('contact');
    var summaryEl = document.getElementById('simulatorSummary');
    if (!simulatorSection || !contactSection || !summaryEl) return;

    var isPinned = false;
    var isMobile = window.innerWidth <= 968;

    function check() {
      if (!isMobile) {
        if (isPinned) unpin();
        return;
      }

      var simRect = simulatorSection.getBoundingClientRect();
      var contactRect = contactSection.getBoundingClientRect();
      var vh = window.innerHeight;

      // Pin when: simulator is in view AND contact section hasn't entered
      var simInView = simRect.top < vh * 0.5 && simRect.bottom > vh * 0.3;
      var contactNotYet = contactRect.top > vh * 0.75;
      var shouldPin = simInView && contactNotYet;

      if (shouldPin && !isPinned) {
        pin();
      } else if (!shouldPin && isPinned) {
        unpin();
      }
    }

    function pin() {
      isPinned = true;
      summaryEl.classList.remove('summary-unpinning');
      summaryEl.classList.add('summary-pinned');
      simulatorSection.classList.add('has-pinned-summary');
    }

    function unpin() {
      isPinned = false;
      summaryEl.classList.add('summary-unpinning');
      summaryEl.classList.remove('summary-pinned');
      simulatorSection.classList.remove('has-pinned-summary');
      setTimeout(function() {
        summaryEl.classList.remove('summary-unpinning');
      }, 350);
    }

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', function() {
      isMobile = window.innerWidth <= 968;
      check();
    });

    check();
  }

  function initSimulator() {
    const container = document.getElementById('simulatorProducts');
    if (!container) return;

    // Build simulator UI grouped by category
    const categories = [
      { key: 'sono', title: 'Sonorisation et animation' },
      { key: 'festive', title: 'Machines festives' },
      { key: 'reception', title: 'Réception et extérieur' },
      { key: 'pro', title: 'Matériel professionnel' },
      { key: 'vaisselle', title: 'Vaisselle' },
      { key: 'photo', title: 'Photobooth' }
    ];

    let html = '';
    for (const cat of categories) {
      const products = PRODUCTS[cat.key];
      if (!products || products.length === 0) continue;

      html += `<div class="sim-category">`;
      html += `<div class="sim-category-title">${cat.title}</div>`;

      for (const p of products) {
        if (p.quoteOnly) {
          // Quote-only items (barrières) - show but no checkbox
          html += `<div class="sim-item" style="opacity:0.7; cursor:default;">`;
          html += `<div class="sim-item-info">`;
          html += `<div class="sim-item-name">${p.name}</div>`;
          html += `<div class="sim-item-detail">Sur devis - ${p.priceLabel}</div>`;
          html += `</div>`;
          html += `</div>`;
          continue;
        }

        // Initialize state
        state[p.id] = {
          checked: false,
          quantity: p.quantityBased ? 0 : 1,
          selectedOption: p.hasOptions ? 0 : null
        };

        const priceDisplay = p.hasOptions
          ? `${p.options[0].price} €`
          : `${formatPrice(p.price)} € ${p.unit}`;

        html += `<div class="sim-item" id="sim-${p.id}" data-id="${p.id}">`;
        html += `<input type="checkbox" id="check-${p.id}" data-id="${p.id}">`;
        html += `<div class="sim-item-info">`;
        html += `<div class="sim-item-name">${p.name}</div>`;
        if (p.description) {
          html += `<div class="sim-item-detail">${p.description}</div>`;
        }
        html += `</div>`;

        // Controls: quantity for vaisselle, options for photobooth
        if (p.quantityBased) {
          html += `<div class="sim-item-controls">`;
          html += `<input type="number" id="qty-${p.id}" data-id="${p.id}" min="0" value="0" placeholder="Qté">`;
          html += `</div>`;
        }

        if (p.hasOptions) {
          html += `<div class="sim-item-controls">`;
          html += `<select id="opt-${p.id}" data-id="${p.id}">`;
          for (let i = 0; i < p.options.length; i++) {
            html += `<option value="${i}">${p.options[i].label} - ${p.options[i].price} €</option>`;
          }
          html += `</select>`;
          html += `</div>`;
        }

        html += `<div class="sim-item-price">${priceDisplay}</div>`;

        if (p.discountEligible) {
          html += `<span class="sim-item-discount-tag">Remise</span>`;
        }

        html += `</div>`;
      }

      html += `</div>`;
    }

    container.innerHTML = html;

    // Attach event listeners
    container.addEventListener('change', handleChange);
    container.addEventListener('input', handleInput);

    // Init sticky summary behavior
    initStickySummary();

    // Init form recap handlers
    initFormRecapHandlers();

    // Click on row toggles checkbox
    container.querySelectorAll('.sim-item').forEach(item => {
      item.addEventListener('click', function(e) {
        // Don't toggle if clicking on input/select directly
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
        const id = this.dataset.id;
        if (!id) return;
        const checkbox = document.getElementById('check-' + id);
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });
  }

  function handleChange(e) {
    const id = e.target.dataset.id;
    if (!id || !state[id]) return;

    if (e.target.type === 'checkbox') {
      state[id].checked = e.target.checked;
      const row = document.getElementById('sim-' + id);
      if (row) row.classList.toggle('checked', e.target.checked);

      // Auto-set quantity to 1 if checking a quantity-based item with 0
      const product = findProduct(id);
      if (product && product.quantityBased && e.target.checked && state[id].quantity === 0) {
        state[id].quantity = 1;
        const qtyInput = document.getElementById('qty-' + id);
        if (qtyInput) qtyInput.value = 1;
      }
    }

    if (e.target.tagName === 'SELECT') {
      state[id].selectedOption = parseInt(e.target.value, 10);
    }

    updateSummary();
  }

  function handleInput(e) {
    const id = e.target.dataset.id;
    if (!id || !state[id]) return;

    if (e.target.type === 'number') {
      const val = parseInt(e.target.value, 10);
      state[id].quantity = isNaN(val) || val < 0 ? 0 : val;

      // Auto-check if quantity > 0
      if (state[id].quantity > 0 && !state[id].checked) {
        state[id].checked = true;
        const checkbox = document.getElementById('check-' + id);
        if (checkbox) checkbox.checked = true;
        const row = document.getElementById('sim-' + id);
        if (row) row.classList.add('checked');
      }
      // Auto-uncheck if quantity = 0
      if (state[id].quantity === 0 && state[id].checked) {
        state[id].checked = false;
        const checkbox = document.getElementById('check-' + id);
        if (checkbox) checkbox.checked = false;
        const row = document.getElementById('sim-' + id);
        if (row) row.classList.remove('checked');
      }
    }

    updateSummary();
  }

  function updateSummary() {
    const summaryEmpty = document.getElementById('summaryEmpty');
    const summaryDetails = document.getElementById('summaryDetails');
    const summaryItems = document.getElementById('summaryItems');
    const summaryCount = document.getElementById('summaryCount');
    const summaryTotal = document.getElementById('summaryTotal');
    const discountLine = document.getElementById('discountLine');
    const discountPercent = document.getElementById('discountPercent');
    const discountAmount = document.getElementById('discountAmount');
    const summaryFinal = document.getElementById('summaryFinal');
    const discountBadge = document.getElementById('discountBadge');
    const savingsAmount = document.getElementById('savingsAmount');

    let selectedItems = [];
    let total = 0;
    let eligibleTotal = 0;
    let eligibleCount = 0;

    for (const [id, s] of Object.entries(state)) {
      if (!s.checked) continue;
      const product = findProduct(id);
      if (!product) continue;

      let itemPrice;
      if (product.hasOptions && s.selectedOption !== null) {
        itemPrice = product.options[s.selectedOption].price;
      } else if (product.quantityBased) {
        itemPrice = product.price * s.quantity;
      } else {
        itemPrice = product.price;
      }

      selectedItems.push({
        name: product.name,
        price: itemPrice,
        discountEligible: product.discountEligible,
        quantity: product.quantityBased ? s.quantity : null,
        option: product.hasOptions ? product.options[s.selectedOption].label : null
      });

      total += itemPrice;
      if (product.discountEligible) {
        eligibleTotal += itemPrice;
        eligibleCount++;
      }
    }

    if (selectedItems.length === 0) {
      summaryEmpty.style.display = '';
      summaryDetails.style.display = 'none';
      return;
    }

    summaryEmpty.style.display = 'none';
    summaryDetails.style.display = '';

    // Build items list
    let itemsHtml = '';
    for (const item of selectedItems) {
      let label = item.name;
      if (item.quantity !== null) label += ` (x${item.quantity})`;
      if (item.option) label += ` - ${item.option}`;
      itemsHtml += `<div class="summary-item"><span>${label}</span><span>${formatPrice(item.price)} €</span></div>`;
    }
    summaryItems.innerHTML = itemsHtml;

    summaryCount.textContent = selectedItems.length;
    summaryTotal.textContent = formatPrice(total) + ' €';

    // Calculate discount on eligible items only
    const percent = getDiscountPercent(eligibleCount);
    const savings = eligibleTotal * (percent / 100);
    const finalPrice = total - savings;

    if (percent > 0) {
      discountLine.style.display = '';
      discountPercent.textContent = percent;
      discountAmount.textContent = '- ' + formatPrice(savings) + ' €';
      discountBadge.style.display = '';
      savingsAmount.textContent = formatPrice(savings) + ' €';
    } else {
      discountLine.style.display = 'none';
      discountBadge.style.display = 'none';
    }

    summaryFinal.textContent = formatPrice(finalPrice) + ' €';
  }

  function getSelectedItemsData() {
    var selectedItems = [];
    var total = 0;
    var eligibleTotal = 0;
    var eligibleCount = 0;

    for (var id in state) {
      var s = state[id];
      if (!s.checked) continue;
      var product = findProduct(id);
      if (!product) continue;

      var itemPrice;
      if (product.hasOptions && s.selectedOption !== null) {
        itemPrice = product.options[s.selectedOption].price;
      } else if (product.quantityBased) {
        itemPrice = product.price * s.quantity;
      } else {
        itemPrice = product.price;
      }

      var label = product.name;
      if (product.quantityBased && s.quantity) label += ' (x' + s.quantity + ')';
      if (product.hasOptions) label += ' - ' + product.options[s.selectedOption].label;

      selectedItems.push({ name: label, price: itemPrice });
      total += itemPrice;
      if (product.discountEligible) {
        eligibleTotal += itemPrice;
        eligibleCount++;
      }
    }

    var percent = getDiscountPercent(eligibleCount);
    var savings = eligibleTotal * (percent / 100);
    var finalPrice = total - savings;

    return {
      items: selectedItems,
      total: total,
      discountPercent: percent,
      discountAmount: savings,
      finalPrice: finalPrice
    };
  }

  function populateFormRecap() {
    var data = getSelectedItemsData();
    var recapEl = document.getElementById('formSimulatorRecap');
    var itemsEl = document.getElementById('formRecapItems');
    var totalsEl = document.getElementById('formRecapTotals');
    var hiddenInput = document.getElementById('formRecapData');
    if (!recapEl || !itemsEl || !totalsEl) return;

    if (data.items.length === 0) {
      recapEl.style.display = 'none';
      if (hiddenInput) hiddenInput.value = '';
      return;
    }

    // Build items HTML
    var html = '';
    for (var i = 0; i < data.items.length; i++) {
      html += '<div class="form-recap-item">';
      html += '<span class="form-recap-item-name">' + data.items[i].name + '</span>';
      html += '<span class="form-recap-item-price">' + formatPrice(data.items[i].price) + ' \u20ac</span>';
      html += '</div>';
    }
    itemsEl.innerHTML = html;

    // Build totals HTML
    var totalsHtml = '';
    totalsHtml += '<div class="form-recap-line"><span>' + data.items.length + ' article(s)</span><span>' + formatPrice(data.total) + ' \u20ac</span></div>';
    if (data.discountPercent > 0) {
      totalsHtml += '<div class="form-recap-line discount"><span>Remise ' + data.discountPercent + '%</span><span>- ' + formatPrice(data.discountAmount) + ' \u20ac</span></div>';
    }
    totalsHtml += '<div class="form-recap-line total"><span>Prix final estim\u00e9</span><span>' + formatPrice(data.finalPrice) + ' \u20ac</span></div>';
    totalsEl.innerHTML = totalsHtml;

    recapEl.style.display = '';

    // Build hidden field data for form submission
    var textData = 'DEMANDE DE LOCATION\n';
    textData += '---\n';
    for (var j = 0; j < data.items.length; j++) {
      textData += data.items[j].name + ' : ' + formatPrice(data.items[j].price) + ' \u20ac\n';
    }
    textData += '---\n';
    textData += 'Total avant remise : ' + formatPrice(data.total) + ' \u20ac\n';
    if (data.discountPercent > 0) {
      textData += 'Remise : ' + data.discountPercent + '% (-' + formatPrice(data.discountAmount) + ' \u20ac)\n';
    }
    textData += 'Prix final estim\u00e9 : ' + formatPrice(data.finalPrice) + ' \u20ac';
    if (hiddenInput) hiddenInput.value = textData;
  }

  function initFormRecapHandlers() {
    // Intercept "Demander un devis" click
    var devisBtn = document.querySelector('#simulatorSummary .btn-primary');
    if (devisBtn) {
      devisBtn.addEventListener('click', function(e) {
        e.preventDefault();
        populateFormRecap();
        var contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Clear recap button
    var clearBtn = document.getElementById('formRecapClear');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        var recapEl = document.getElementById('formSimulatorRecap');
        var hiddenInput = document.getElementById('formRecapData');
        if (recapEl) recapEl.style.display = 'none';
        if (hiddenInput) hiddenInput.value = '';
      });
    }
  }

  function findProduct(id) {
    for (const category of Object.values(PRODUCTS)) {
      for (const p of category) {
        if (p.id === id) return p;
      }
    }
    return null;
  }

  function formatPrice(n) {
    return n.toFixed(2).replace('.', ',');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimulator);
  } else {
    initSimulator();
  }
})();
