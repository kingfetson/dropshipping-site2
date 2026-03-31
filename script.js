/* ============================================================
   script.js — TrendKe Fashion Landing Page
   All features: Carousel · Modals · Orders · WhatsApp
                 M-Pesa · Countdown · Abandoned Cart · Analytics
   ============================================================ */

// ── Wait for DOM ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     0. SETUP & UTILITIES
  ============================================================ */
  const brand = (typeof CONFIG !== 'undefined') ? CONFIG.BUSINESS_NAME : 'TrendKe Fashion';
  document.title = `${brand} – Kenya's Best Deals`;
  const el = (id) => document.getElementById(id);
  
  // Update dynamic content
  el('headerBrand').textContent = brand;
  el('footerBrand').textContent = brand;
  el('year').textContent = new Date().getFullYear();

  const WHATSAPP = (typeof CONFIG !== 'undefined') ? CONFIG.WHATSAPP_NUMBER : '254700000000';
  const TILL     = (typeof CONFIG !== 'undefined') ? CONFIG.MPESA_TILL : 'XXXXXX';
  const SCRIPT   = (typeof CONFIG !== 'undefined') ? CONFIG.GOOGLE_SCRIPT_URL : '';
  const DEL_NBI  = (typeof CONFIG !== 'undefined') ? CONFIG.DELIVERY_NAIROBI : 150;
  const DEL_OUT  = (typeof CONFIG !== 'undefined') ? CONFIG.DELIVERY_OUTSIDE : 350;

  el('mpesaTill').textContent = TILL;
  el('footerPhone').textContent = `+${WHATSAPP}`;

  // Analytics helper
  function trackEvent(eventName, params = {}) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, { ...params });
    }
    if (typeof fbq === 'function') {
      fbq('track', eventName, params);
    }
    console.log(`📊 Event: ${eventName}`, params);
  }

  // Debounce utility
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /* ============================================================
     1. PRODUCT DATA
  ============================================================ */
  const PRODUCTS = [
    {
      id: 1,
      name: "Elegant Ankara Wrap Dress",
      price: 1850,
      oldPrice: 2800,
      image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=600&q=80",
      badge: "🔥 HOT DEAL",
      badgeClass: "",
      stock: 7,
      desc: "Stunning Ankara-print wrap dress. Vibrant colours, perfect for events, church, and casual outings. Machine washable. Available in sizes S–XL.",
    },
    {
      id: 2,
      name: "Men's Slim-Fit Chinos – Beige",
      price: 1200,
      oldPrice: 1800,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
      badge: "SALE",
      badgeClass: "amber",
      stock: 12,
      desc: "Premium slim-fit chinos crafted from breathable cotton blend. Smart-casual look for office or weekends. Sizes 28–38.",
    },
    {
      id: 3,
      name: "Ladies Peplum Blouse – Black",
      price: 950,
      oldPrice: 1500,
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
      badge: "✅ NEW",
      badgeClass: "green",
      stock: 5,
      desc: "Chic peplum blouse in elegant matte black. Pairs perfectly with jeans, trousers, or skirts. Sizes S–2XL.",
    },
    {
      id: 4,
      name: "African Print Bucket Hat",
      price: 650,
      oldPrice: 1000,
      image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80",
      badge: "🔥 HOT DEAL",
      badgeClass: "",
      stock: 18,
      desc: "Bold Kente-inspired print bucket hat. Protects from Nairobi sun with ultimate style. One size fits all (adjustable).",
    },
    {
      id: 5,
      name: "Denim Jacket – Washed Blue",
      price: 2200,
      oldPrice: 3500,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
      badge: "BEST VALUE",
      badgeClass: "amber",
      stock: 9,
      desc: "Classic washed denim jacket with distressed detailing. Unisex cut, versatile layering piece. Sizes S–XXL.",
    },
    {
      id: 6,
      name: "Women's Bodycon Mini Dress",
      price: 1100,
      oldPrice: 1700,
      image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80",
      badge: "🔥 HOT DEAL",
      badgeClass: "",
      stock: 6,
      desc: "Figure-hugging bodycon mini in stretchy ribbed fabric. Perfect for nights out. Available in black, red, and olive. Sizes S–XL.",
    },
  ];

  /* ============================================================
     2. TESTIMONIALS DATA
  ============================================================ */
  const TESTIMONIALS = [
    {
      name: "Amina W.",
      location: "Westlands, Nairobi",
      text: "My dress arrived the same day I ordered! Quality is amazing and the price is unbeatable. Definitely ordering again!",
      stars: 5,
      initials: "AW",
    },
    {
      name: "Brian Ochieng",
      location: "Kisumu",
      text: "Paid via M-Pesa and got my chinos in 2 days. Very impressed with the fitting. Will recommend to my boys!",
      stars: 5,
      initials: "BO",
    },
    {
      name: "Cynthia Njoki",
      location: "Thika Road",
      text: "The Ankara dress is FIRE 🔥 Got so many compliments at the wedding. Packaging was neat, no issues at all.",
      stars: 5,
      initials: "CN",
    },
    {
      name: "David Kamau",
      location: "Mombasa",
      text: "Fast delivery outside Nairobi — didn't expect it this quick. Good quality and pay on delivery option is a plus.",
      stars: 4,
      initials: "DK",
    },
    {
      name: "Grace Auma",
      location: "Kibera, Nairobi",
      text: "Ordered the blouse and it fits perfectly. Customer service on WhatsApp is very responsive. 10/10!",
      stars: 5,
      initials: "GA",
    },
    {
      name: "James Mwangi",
      location: "Nakuru",
      text: "Delivery was fast and the jacket looks exactly like in the photo. No surprises. Happy customer!",
      stars: 5,
      initials: "JM",
    },
  ];

  /* ============================================================
     3. CAROUSEL SLIDES
  ============================================================ */
  const SLIDES = [
    {
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=75",
      alt: "Fashion collection",
    },
    {
      img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=75",
      alt: "Trendy outfits Kenya",
    },
    {
      img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=75",
      alt: "Fashion deals Nairobi",
    },
  ];

  /* ============================================================
     4. RENDER CAROUSEL
  ============================================================ */
  const track  = el('carouselTrack');
  const dotsEl = el('carouselDots');
  let currentSlide = 0;
  let carouselTimer;
  let touchStartX = 0;
  let touchEndX = 0;

  SLIDES.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = `carousel-slide${i === 0 ? ' active' : ''}`;
    div.innerHTML = `<img src="${s.img}" alt="${s.alt}" loading="${i === 0 ? 'eager' : 'lazy'}" width="1200" height="800" decoding="async" />`;
    track.appendChild(div);

    const dot = document.createElement('button');
    dot.className = `dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to slide ${i + 1} of ${SLIDES.length}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
    dot.setAttribute('type', 'button');
    dot.addEventListener('click', () => goToSlide(i));
    dotsEl.appendChild(dot);
  });

  function updateDots() {
    const dots = dotsEl.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      const isActive = i === currentSlide;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function goToSlide(n) {
    const slides = track.querySelectorAll('.carousel-slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + SLIDES.length) % SLIDES.length;
    slides[currentSlide].classList.add('active');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  function nextSlide() { goToSlide(currentSlide + 1); }

  function startCarousel() {
    carouselTimer = setInterval(nextSlide, 4000);
  }

  el('carouselNext').addEventListener('click', () => { clearInterval(carouselTimer); nextSlide(); startCarousel(); });
  el('carouselPrev').addEventListener('click', () => { clearInterval(carouselTimer); goToSlide(currentSlide - 1); startCarousel(); });

  // Touch swipe support
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      clearInterval(carouselTimer);
      if (diff > 0) nextSlide();
      else goToSlide(currentSlide - 1);
      startCarousel();
    }
  }

  startCarousel();

  /* ============================================================
     5. RENDER PRODUCTS (with event delegation)
  ============================================================ */
  const grid = el('productsGrid');

  PRODUCTS.forEach((p, i) => {
    const discount = Math.round((1 - p.price / p.oldPrice) * 100);
    const stockBadge = p.stock <= 3 
      ? `<span class="product-stock-badge urgent">🔥 Only ${p.stock} left!</span>`
      : `<span class="product-stock-badge">Only ${p.stock} left!</span>`;
    
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.style.animationDelay = `${i * 0.08}s`;
    card.dataset.id = p.id;
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" width="600" height="800" decoding="async" />
        <span class="product-badge ${p.badgeClass}">${p.badge}</span>
        ${stockBadge}
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-price-row">
          <span class="product-price">KES ${p.price.toLocaleString()}</span>
          <span class="product-old-price">KES ${p.oldPrice.toLocaleString()}</span>
          <span class="product-badge amber" style="position:static;margin-left:auto;font-size:.6rem;">${discount}% OFF</span>
        </div>
        <button class="btn btn-order" data-id="${p.id}" type="button">🛒 Order Now</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Event delegation for product cards
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    const orderBtn = e.target.closest('.btn-order');
    
    if (!card) return;
    const id = parseInt(card.dataset.id || orderBtn?.dataset.id);
    
    if (orderBtn) {
      e.stopPropagation();
      openOrderModal(id);
      trackEvent('begin_checkout', { 
        currency: 'KES', 
        value: PRODUCTS.find(p => p.id === id)?.price,
        items: [{ item_name: PRODUCTS.find(p => p.id === id)?.name }]
      });
    } else if (!e.target.closest('button')) {
      openProductModal(id);
    }
  });

  /* ============================================================
     6. RENDER TESTIMONIALS
  ============================================================ */
  const testGrid = el('testimonialsGrid');
  TESTIMONIALS.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'testi-card reveal';
    card.style.animationDelay = `${i * 0.1}s`;
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <div class="testi-stars" aria-label="${t.stars} out of 5 stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
      <p class="testi-text">"${t.text}"</p>
      <div class="testi-author">
        <div class="testi-avatar" aria-hidden="true">${t.initials}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-loc">📍 ${t.location}</div>
        </div>
      </div>
    `;
    testGrid.appendChild(card);
  });

  /* ============================================================
     7. SCROLL REVEAL
  ============================================================ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { 
        entry.target.classList.add('visible'); 
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((elem) => observer.observe(elem));

  /* ============================================================
     8. COUNTDOWN TIMER
  ============================================================ */
  const HOURS = (typeof CONFIG !== 'undefined') ? CONFIG.COUNTDOWN_HOURS : 2;

  let endTime = localStorage.getItem('trendke_countdown');
  if (!endTime) {
    endTime = Date.now() + HOURS * 60 * 60 * 1000;
    localStorage.setItem('trendke_countdown', endTime);
  }
  endTime = Number(endTime);

  function updateCountdown() {
    const diff = endTime - Date.now();
    if (diff <= 0) {
      localStorage.removeItem('trendke_countdown');
      el('countdown').textContent = '00:00:00';
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el('countdown').textContent =
      `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ============================================================
     9. PRODUCT MODAL
  ============================================================ */
  function openProductModal(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    el('modalImg').src   = p.image;
    el('modalImg').alt   = p.name;
    el('modalTitle').textContent  = p.name;
    el('modalPrice').textContent = `KES ${p.price.toLocaleString()}`;
    el('modalStock').textContent = `⚠️ Only ${p.stock} left!`;
    el('modalDesc').textContent  = p.desc;
    el('deliveryNbi').textContent = `KES ${DEL_NBI}`;
    el('deliveryOut').textContent = `KES ${DEL_OUT}`;
    el('modalOrderBtn').onclick = () => { closeModal('productModal'); openOrderModal(id); };
    openModal('productModal');
  }

  /* ============================================================
     10. ORDER MODAL & FORM
  ============================================================ */
  let activeProduct = null;

  function openOrderModal(id) {
    activeProduct = PRODUCTS.find((x) => x.id === id);
    if (!activeProduct) return;
    el('fieldProduct').value = activeProduct.name;
    el('fieldQty').value     = 1;
    updateSummary();
    
    const saved = getSavedOrder();
    if (saved) {
      if (saved.name) el('fieldName').value = saved.name;
      if (saved.phone) el('fieldPhone').value = saved.phone;
      if (saved.location) el('fieldLocation').value = saved.location;
    }
    openModal('orderModal');
  }

  // Quantity controls
  el('qtyPlus').addEventListener('click', () => {
    const q = parseInt(el('fieldQty').value) || 1;
    if (q < 10) { el('fieldQty').value = q + 1; updateSummary(); }
  });
  el('qtyMinus').addEventListener('click', () => {
    const q = parseInt(el('fieldQty').value) || 1;
    if (q > 1) { el('fieldQty').value = q - 1; updateSummary(); }
  });
  el('fieldQty').addEventListener('input', updateSummary);
  el('fieldLocation').addEventListener('change', updateSummary);

  function updateSummary() {
    if (!activeProduct) return;
    const qty      = Math.max(1, parseInt(el('fieldQty').value) || 1);
    const loc      = el('fieldLocation').value;
    const subtotal = activeProduct.price * qty;
    const delivery = loc === 'Nairobi' ? DEL_NBI : loc === 'Outside Nairobi' ? DEL_OUT : null;

    let discount = 0;
    if (qty >= 3) discount = Math.round(subtotal * 0.10);

    el('summSubtotal').textContent = `KES ${subtotal.toLocaleString()}`;
    el('summDelivery').textContent = delivery !== null
      ? (delivery === 0 ? 'FREE' : `KES ${delivery}`)
      : '—';

    const actualDelivery = qty >= 2 ? 0 : (delivery || 0);
    const total = subtotal - discount + (loc ? actualDelivery : 0);
    el('summTotal').textContent = loc ? `KES ${total.toLocaleString()}` : 'KES —';

    if (discount > 0) {
      el('summSubtotal').textContent += ` (−KES ${discount.toLocaleString()} discount!)`;
    }
    if (qty >= 2 && loc) {
      el('summDelivery').textContent = 'FREE 🎉';
    }
  }

  /* ============================================================
     11. FORM VALIDATION & SUBMIT
  ============================================================ */
  el('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const name     = el('fieldName').value.trim();
    const phone    = el('fieldPhone').value.trim();
    const location = el('fieldLocation').value;
    const product  = el('fieldProduct').value;
    const qty      = el('fieldQty').value;

    localStorage.removeItem('trendke_abandoned');

    el('submitLabel').hidden = true;
    el('spinner').hidden     = false;
    el('submitBtn').disabled = true;

    if (SCRIPT && SCRIPT.includes('script.google.com')) {
      try {
        await fetch(SCRIPT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name, phone, product, quantity: qty, location,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn('Google Sheets error:', err);
      }
    }

    el('submitLabel').hidden = false;
    el('spinner').hidden     = true;
    el('submitBtn').disabled = false;

    closeModal('orderModal');
    showToast('✅ Order received! Redirecting to WhatsApp…', 'success');

    const price    = activeProduct ? activeProduct.price : 0;
    const del      = location === 'Nairobi' ? DEL_NBI : DEL_OUT;
    const actualDel = Number(qty) >= 2 ? 0 : del;
    const total    = price * Number(qty) + actualDel;

    const msg = encodeURIComponent(
`Hello, I want to order:

🛍 Product: ${product}
📦 Quantity: ${qty}
👤 Name: ${name}
📱 Phone: ${phone}
📍 Location: ${location}
💰 Total: KES ${total.toLocaleString()} (incl. delivery)

Is it available?`
    );

    trackEvent('purchase', {
      currency: 'KES',
      value: total,
      transaction_id: `WA-${Date.now()}`
    });

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
    }, 800);
  });

  function validateForm() {
    let valid = true;

    const name  = el('fieldName').value.trim();
    const phone = el('fieldPhone').value.trim();
    const loc   = el('fieldLocation').value;

    if (name.length < 2) {
      el('errName').textContent = 'Please enter your full name.';
      valid = false;
    } else { el('errName').textContent = ''; }

    const phoneReg = /^0[17]\d{8}$/;
    if (!phoneReg.test(phone)) {
      el('errPhone').textContent = 'Enter a valid Kenyan number e.g. 0712345678';
      valid = false;
    } else { el('errPhone').textContent = ''; }

    if (!loc) {
      el('errLocation').textContent = 'Please select your location.';
      valid = false;
    } else { el('errLocation').textContent = ''; }

    return valid;
  }

  /* ============================================================
     12. ABANDONED CART
  ============================================================ */
  ['fieldName', 'fieldPhone', 'fieldLocation'].forEach((id) => {
    el(id).addEventListener('input', debounce(saveAbandonedOrder, 500));
    el(id).addEventListener('change', saveAbandonedOrder);
  });

  function saveAbandonedOrder() {
    const data = {
      name:     el('fieldName').value.trim(),
      phone:    el('fieldPhone').value.trim(),
      location: el('fieldLocation').value,
      product:  el('fieldProduct').value,
      savedAt:  Date.now(),
    };
    if (data.name || data.phone) {
      localStorage.setItem('trendke_abandoned', JSON.stringify(data));
    }
  }

  function getSavedOrder() {
    try {
      const raw = localStorage.getItem('trendke_abandoned');
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (Date.now() - data.savedAt > 86400000) {
        localStorage.removeItem('trendke_abandoned');
        return null;
      }
      return data;
    } catch { return null; }
  }

  /* ============================================================
     13. M-PESA MODAL
  ============================================================ */
  function openMpesaModal(price) {
    el('mpesaAmount').textContent = price ? `KES ${Number(price).toLocaleString()}` : 'KES —';
    el('mpesaTill').textContent   = TILL;
    el('mpesaWhatsapp').onclick = () => {
      const msg = encodeURIComponent('Hello! I have just paid via M-Pesa for my order. Please confirm.');
      window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
    };
    openModal('mpesaModal');
  }

  /* ============================================================
     14. WHATSAPP QUICK ORDER
  ============================================================ */
  function whatsappQuick() {
    const msg = encodeURIComponent('Hello! I want to place an order. Please assist me.');
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
    trackEvent('whatsapp_click', { source: 'hero_or_sticky' });
  }

  /* ============================================================
     15. BUTTON WIRING
  ============================================================ */
  el('heroWhatsapp').addEventListener('click', whatsappQuick);
  el('heroMpesa').addEventListener('click', () => openMpesaModal(null));
  el('stickyWa').addEventListener('click', whatsappQuick);
  el('stickyMp').addEventListener('click', () => openMpesaModal(null));
  el('modalClose').addEventListener('click', () => closeModal('productModal'));
  el('orderModalClose').addEventListener('click', () => closeModal('orderModal'));
  el('mpesaClose').addEventListener('click', () => closeModal('mpesaModal'));

  ['productModal','orderModal','mpesaModal'].forEach((id) => {
    el(id).addEventListener('click', (e) => {
      if (e.target === el(id)) closeModal(id);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ['productModal','orderModal','mpesaModal'].forEach(closeModal);
    }
  });

  /* ============================================================
     16. MODAL HELPERS (with focus trap)
  ============================================================ */
  function openModal(id) {
    const modal = el(id);
    modal.classList.add('open');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    
    // Focus trap
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) {
      focusable[0].focus();
      modal.addEventListener('keydown', function trapFocus(e) {
        if (e.key === 'Tab') {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
          }
        }
      });
    }
  }
  
  function closeModal(id) {
    const modal = el(id);
    modal.classList.remove('open');
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  /* ============================================================
     17. TOAST
  ============================================================ */
  let toastTimer;
  function showToast(msg, type = '') {
    const t = el('toast');
    t.textContent = msg;
    t.className   = `toast show ${type}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
  }

  /* ============================================================
     18. STICKY CTA VISIBILITY
  ============================================================ */
  const stickyHeroObs = new IntersectionObserver(
    ([entry]) => {
      el('stickyCta').classList.toggle('hidden', entry.isIntersecting);
    },
    { threshold: 0.1 }
  );
  stickyHeroObs.observe(el('hero'));

  /* ============================================================
     19. HEADER SHADOW ON SCROLL
  ============================================================ */
  window.addEventListener('scroll', () => {
    el('siteHeader').style.boxShadow = window.scrollY > 10
      ? '0 3px 12px rgba(0,0,0,.25)'
      : '0 2px 8px rgba(0,0,0,.2)';
  }, { passive: true });

  /* ============================================================
     20. EXIT-INTENT POPUP (Abandoned Cart Recovery)
  ============================================================ */
  let exitIntentShown = false;

  function showExitIntent() {
    if (exitIntentShown) return;
    const saved = getSavedOrder();
    if (!saved && !activeProduct) return;
    
    exitIntentShown = true;
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay open';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <div class="modal-box" style="max-width:400px;text-align:center">
        <button class="modal-close" id="exitClose" aria-label="Close" type="button">&times;</button>
        <h3 style="margin:10px 0">Wait! 🎁</h3>
        <p style="color:var(--muted);margin-bottom:20px">
          Complete your order now and get <strong>FREE delivery</strong> + 
          <strong>10% OFF</strong> your next purchase!
        </p>
        <button class="btn btn-whatsapp" id="exitWa" type="button" style="width:100%;justify-content:center">
          💬 Finish Order on WhatsApp
        </button>
        <button class="btn" id="exitContinue" type="button" style="width:100%;margin-top:10px;background:#f0f0f0">
          Continue Shopping
        </button>
      </div>
    `;
    document.body.appendChild(overlay);
    
    const close = () => { overlay.remove(); document.body.style.overflow = ''; };
    overlay.querySelector('#exitClose').onclick = close;
    overlay.querySelector('#exitContinue').onclick = close;
    overlay.querySelector('#exitWa').onclick = () => {
      const msg = encodeURIComponent('Hi! I was about to order but got distracted. Can you help me complete my purchase?');
      window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
      trackEvent('exit_intent_conversion', { source: 'popup' });
      close();
    };
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  }

  // Desktop exit intent
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && window.innerWidth >= 900) {
      showExitIntent();
    }
  });

  // Mobile inactivity trigger
  let inactivityTimer;
  function resetInactivity() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      if (window.innerWidth < 900) showExitIntent();
    }, 30000);
  }
  ['mousemove', 'touchstart', 'scroll', 'click'].forEach(evt => 
    document.addEventListener(evt, resetInactivity, { passive: true })
  );
  resetInactivity();

  /* ============================================================
     21. SERVICE WORKER REGISTRATION (PWA)
  ============================================================ */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('✅ SW registered:', reg.scope))
        .catch(err => console.log('❌ SW failed:', err));
    });
  }

  /* ============================================================
     22. GOOGLE APPS SCRIPT REFERENCE (commented)
  ============================================================
  function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data  = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(), data.name, data.phone, data.product, data.quantity, data.location
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  ============================================================ */

  console.log(`%c${brand} 🚀`, 'color:#e8231a;font-size:1.2rem;font-weight:bold;');
  console.log('%cSite loaded. WhatsApp:', 'color:#25d366', WHATSAPP);

}); // end DOMContentLoaded
