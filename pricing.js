const PRICING_DATA = [
  {
    id: 'cleaning',
    name: 'Professional Cleaning',
    price: 800,
    range: '₹800 – ₹1,500',
    category: 'preventive',
    categoryLabel: 'Preventive Care',
    desc: 'Oral prophylaxis, gentle ultrasonic scaling, and stain polish.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.5 2 6 4.5 6 8c0 3.5 1.5 7.5 2.5 11 .5 1.8 1.8 3 3.5 3s3-1.2 3.5-3c1-3.5 2.5-7.5 2.5-11 0-3.5-2.5-6-6-6zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>'
  },
  {
    id: 'fillings',
    name: 'Dental Fillings',
    price: 1000,
    range: '₹1,000 – ₹2,500',
    category: 'restorative',
    categoryLabel: 'Restorative Care',
    desc: 'Tooth-colored composite restoration tailored for natural appearance.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>'
  },
  {
    id: 'whitening',
    name: 'Teeth Whitening',
    price: 3000,
    range: '₹3,000 – ₹7,500',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic Care',
    desc: 'In-office advanced shade brightening with enamel-safe formulations.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
  },
  {
    id: 'rootcanal',
    name: 'Root Canal Treatment',
    price: 3000,
    range: '₹3,000 – ₹6,000',
    category: 'restorative',
    categoryLabel: 'Restorative Care',
    desc: 'Micro-endodontic therapy relieving discomfort and saving damaged teeth.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>'
  },
  {
    id: 'orthodontics',
    name: 'Braces & Orthodontics',
    price: 25000,
    range: '₹25,000 – ₹65,000',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic & Ortho',
    desc: 'Digital 3D aligners and ceramic bracket systems for symmetrical alignment.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20M2 6h20M2 18h20"/></svg>'
  },
  {
    id: 'implants',
    name: 'Dental Implants',
    price: 25000,
    range: '₹25,000 – ₹55,000',
    category: 'restorative',
    categoryLabel: 'Restorative Care',
    desc: 'Titanium bio-compatible root fixture with custom zirconia crown.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M7 8l5-6 5 6M8 17h8"/></svg>'
  }
];
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});
let currentFilter = 'all';
let currentViewMode = 'starting';
document.addEventListener('DOMContentLoaded', () => {
  initPricingSmoothScroll();
  initChartControls();
  renderSvgChart();
  initGalleryLightbox();
  initPricingRolloutCard();
  const dirObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
        renderSvgChart();
      }
    });
  });
  dirObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
});
function initPricingSmoothScroll() {
  const scrollBtns = document.querySelectorAll('a[href="#pricing-cards"]');
  scrollBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('pricing-cards');
      if (target) {
        const headerOffset = 90;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}
function initChartControls() {
  const filterSelect = document.getElementById('pricing-filter-select');
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      currentFilter = e.target.value;
      renderSvgChart();
    });
  }
  const toggleBtns = document.querySelectorAll('.pricing-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      currentViewMode = btn.getAttribute('data-view');
      renderSvgChart();
    });
  });
}
function renderSvgChart() {
  const chartContainer = document.getElementById('pricing-chart-rows');
  const tableContainer = document.getElementById('pricing-table-fallback');
  if (!chartContainer) return;
  const filteredData = currentFilter === 'all'
    ? PRICING_DATA
    : PRICING_DATA.filter(item => item.category === currentFilter);
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  const width = 960;
  const rowHeight = 52;
  const topPadding = 24;
  const bottomPadding = 48;
  const height = topPadding + (filteredData.length * rowHeight) + bottomPadding;
  const leftMargin = 220;
  const chartAreaWidth = 470;
  const trackStartX = isRTL ? (width - leftMargin - chartAreaWidth) : leftMargin;
  const trackEndX = trackStartX + chartAreaWidth;
  const maxVal = 25000;
  const gridTicks = [0, 5000, 10000, 15000, 20000, 25000];
  const gridLinesSvg = gridTicks.map(val => {
    const xPos = isRTL
      ? trackEndX - (val / maxVal) * chartAreaWidth
      : trackStartX + (val / maxVal) * chartAreaWidth;
    const formattedTick = val === 0 ? '₹0' : `₹${val / 1000}k`;
    return `
      <line x1="${xPos}" y1="${topPadding}" x2="${xPos}" y2="${height - bottomPadding}" class="chart-grid-line" stroke="currentColor" stroke-dasharray="3,3" stroke-opacity="0.18" />
      <text x="${xPos}" y="${height - bottomPadding + 22}" class="chart-axis-tick" text-anchor="middle">${formattedTick}</text>
    `;
  }).join('');
  const rowsSvg = filteredData.map((item, index) => {
    const yPos = topPadding + (index * rowHeight) + 10;
    const barHeight = 26;
    const barWidth = Math.max((item.price / maxVal) * chartAreaWidth, 14);
    const barX = isRTL
      ? (trackEndX - barWidth)
      : trackStartX;
    const labelX = isRTL
      ? (width - 16)
      : (leftMargin - 16);
    const valueX = isRTL
      ? (trackStartX - 22)
      : (trackEndX + 22);
    const valueAnchor = isRTL ? 'end' : 'start';
    const labelAnchor = 'end';
    const displayVal = currentViewMode === 'starting'
      ? `${inrFormatter.format(item.price)} onwards`
      : `${item.range}`;
    return `
      <g class="chart-bar-group" data-id="${item.id}" tabindex="0" role="img" aria-label="${item.name}: ${displayVal}">
        <!-- Row Hover Backdrop -->
        <rect x="0" y="${yPos - 6}" width="${width}" height="${rowHeight - 6}" class="chart-row-hover-bg" rx="6" />
        <!-- Treatment Name on Vertical Axis -->
        <text x="${labelX}" y="${yPos + 18}" class="chart-label" text-anchor="${labelAnchor}">
          ${item.name}
        </text>
        <!-- Background Track Bar -->
        <rect x="${trackStartX}" y="${yPos}" width="${chartAreaWidth}" height="${barHeight}" rx="${barHeight / 2}" class="chart-track-bg" />
        <!-- Filled Gradient Value Bar -->
        <rect x="${barX}" y="${yPos}" width="${barWidth}" height="${barHeight}" rx="${barHeight / 2}" fill="url(#brandRedGradient)" class="chart-bar-rect" data-target-width="${barWidth}">
          <title>${item.name} — ${item.desc} (${displayVal})</title>
        </rect>
        <!-- Value Label in Dedicated Right Aligned Column -->
        <text x="${valueX}" y="${yPos + 18}" class="chart-value-text" text-anchor="${valueAnchor}">
          ${displayVal}
        </text>
      </g>
    `;
  }).join('');
  const svgContent = `
    <svg viewBox="0 0 ${width} ${height}" class="pricing-svg-canvas" role="region" aria-label="Interactive dental pricing comparison chart">
      <defs>
        <linearGradient id="brandRedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#C52243" />
          <stop offset="50%" stop-color="#E83D62" />
          <stop offset="100%" stop-color="#FF758F" />
        </linearGradient>
      </defs>
      <!-- Grid lines -->
      <g class="chart-grid">${gridLinesSvg}</g>
      <!-- Bars and Labels -->
      <g class="chart-rows">${rowsSvg}</g>
    </svg>
  `;
  chartContainer.innerHTML = svgContent;
  requestAnimationFrame(() => {
    setTimeout(() => {
      const barRects = chartContainer.querySelectorAll('.chart-bar-rect');
      barRects.forEach(bar => {
        const targetWidth = bar.getAttribute('data-target-width');
        bar.style.transition = 'width 650ms cubic-bezier(0.16, 1, 0.3, 1)';
        bar.setAttribute('width', targetWidth);
      });
    }, 50);
  });
  attachChartTooltips(chartContainer, filteredData);
  if (tableContainer) {
    tableContainer.innerHTML = `
      <div class="pricing-table-card">
        <!-- Table Top Header -->
        <div class="pricing-table-header-bar">
          <div class="table-title-group">
            <div class="table-eyebrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <span>CLINICAL PROCEDURE BREAKDOWN</span>
            </div>
            <h3 class="table-main-title">Illustrative Dental Treatment Starting Price Comparison</h3>
            <p class="table-subtitle">Compare baseline starting fees, procedural care categories, and typical clinical ranges across our comprehensive service spectrum.</p>
          </div>
          <div class="table-header-meta">
            <div class="table-transparency-badge">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Transparent Fee Guarantee</span>
            </div>
          </div>
        </div>
        <!-- Responsive Table Scroll Container -->
        <div class="pricing-comparison-table-wrap">
          <table class="pricing-comparison-table">
            <caption class="sr-only">Illustrative Dental Treatment Starting Price Comparison</caption>
            <thead>
              <tr>
                <th scope="col" class="th-treatment">Treatment Procedure</th>
                <th scope="col" class="th-category">Care Category</th>
                <th scope="col" class="th-estimate ${currentViewMode === 'starting' ? 'col-highlighted' : ''}">Starting Estimate</th>
                <th scope="col" class="th-range ${currentViewMode === 'comparison' ? 'col-highlighted' : ''}">Estimated Range</th>
                <th scope="col" class="th-action">Consultation</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData.map(item => `
                <tr class="pricing-table-row" data-id="${item.id}">
                  <td class="td-treatment">
                    <div class="treatment-cell-wrap">
                      <div class="treatment-icon-box" aria-hidden="true">
                        ${item.icon}
                      </div>
                      <div class="treatment-meta">
                        <span class="treatment-name">${item.name}</span>
                        <span class="treatment-subtext">${item.desc}</span>
                      </div>
                    </div>
                  </td>
                  <td class="td-category">
                    <span class="category-pill category-${item.category}">
                      <span class="category-dot" aria-hidden="true"></span>
                      ${item.categoryLabel}
                    </span>
                  </td>
                  <td class="td-estimate ${currentViewMode === 'starting' ? 'cell-highlighted' : ''}">
                    <div class="price-cell-wrap">
                      <span class="price-currency">${inrFormatter.format(item.price)}</span>
                      <span class="price-onwards">onwards</span>
                    </div>
                  </td>
                  <td class="td-range ${currentViewMode === 'comparison' ? 'cell-highlighted' : ''}">
                    <div class="range-badge">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="range-clock-icon" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span>${item.range}</span>
                    </div>
                  </td>
                  <td class="td-action">
                    <button type="button" class="btn-table-book" data-open-modal="appointment-modal" data-service="${item.name}">
                      <span>Book</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    const tableBookBtns = tableContainer.querySelectorAll('.btn-table-book');
    const modal = document.getElementById('appointment-modal');
    tableBookBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal) {
          modal.classList.add('is-active');
          document.body.style.overflow = 'hidden';
          const presetService = btn.getAttribute('data-service');
          const serviceSelect = modal.querySelector('select[name="service"]');
          if (presetService && serviceSelect) {
            serviceSelect.value = presetService;
          }
        }
      });
    });
    const tableRows = tableContainer.querySelectorAll('.pricing-table-row');
    tableRows.forEach(row => {
      const id = row.getAttribute('data-id');
      const chartBar = chartContainer.querySelector(`.chart-bar-group[data-id="${id}"]`);
      if (!chartBar) return;
      row.addEventListener('mouseenter', () => {
        chartBar.classList.add('bar-highlighted');
      });
      row.addEventListener('mouseleave', () => {
        chartBar.classList.remove('bar-highlighted');
      });
    });
  }
}
function attachChartTooltips(container, data) {
  let tooltip = document.getElementById('chart-interactive-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'chart-interactive-tooltip';
    tooltip.className = 'chart-tooltip';
    tooltip.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tooltip);
  }
  const groups = container.querySelectorAll('.chart-bar-group');
  groups.forEach(group => {
    const id = group.getAttribute('data-id');
    const item = data.find(d => d.id === id);
    if (!item) return;
    const showTooltip = (e) => {
      tooltip.innerHTML = `
        <div class="tooltip-header">
          <span class="tooltip-tag">${item.categoryLabel}</span>
          <strong class="tooltip-title">${item.name}</strong>
        </div>
        <p class="tooltip-desc">${item.desc}</p>
        <div class="tooltip-price-row">
          <span>Starting:</span>
          <strong>${inrFormatter.format(item.price)}</strong>
        </div>
        <div class="tooltip-range-row">
          <span>Typical Range:</span>
          <span>${item.range}</span>
        </div>
      `;
      tooltip.classList.add('is-visible');
      positionTooltip(e);
    };
    const positionTooltip = (e) => {
      const offset = 14;
      const x = (e.clientX || (group.getBoundingClientRect().left + 150)) + offset;
      const y = (e.clientY || (group.getBoundingClientRect().top + 10)) + offset;
      tooltip.style.left = `${Math.min(x, window.innerWidth - 280)}px`;
      tooltip.style.top = `${y}px`;
    };
    const hideTooltip = () => {
      tooltip.classList.remove('is-visible');
    };
    group.addEventListener('mouseenter', showTooltip);
    group.addEventListener('mousemove', positionTooltip);
    group.addEventListener('mouseleave', hideTooltip);
    group.addEventListener('focus', (e) => showTooltip(e));
    group.addEventListener('blur', hideTooltip);
  });
}
function initGalleryLightbox() {
  const mosaicItems = document.querySelectorAll('.pricing-mosaic-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxTag = document.getElementById('lightbox-tag');
  const closeBtn = document.getElementById('lightbox-close-btn');
  if (!lightbox || !lightboxImg) return;
  mosaicItems.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View ${item.querySelector('.mosaic-caption-title')?.textContent || 'Gallery Image'}`);
    const openHandler = () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.mosaic-caption-title');
      const tag = item.querySelector('.mosaic-caption-tag');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
      if (title && lightboxTitle) {
        lightboxTitle.textContent = title.textContent;
      }
      if (tag && lightboxTag) {
        lightboxTag.textContent = tag.textContent;
      }
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    };
    item.addEventListener('click', openHandler);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openHandler();
      }
    });
  });
  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
      closeLightbox();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
}

function initPricingRolloutCard() {
  const rolloutCard = document.getElementById('pricing-rollout-card');
  if (!rolloutCard) return;

  const tabs = rolloutCard.querySelectorAll('.rollout-step-tab');
  const slides = rolloutCard.querySelectorAll('.rollout-slide');
  const progressBar = document.getElementById('rollout-progress-bar');
  const prevBtn = document.getElementById('rollout-prev-btn');
  const nextBtn = document.getElementById('rollout-next-btn');
  const rollNextBtns = rolloutCard.querySelectorAll('.rollout-roll-next-btn');

  let activeIndex = 0;
  const totalSlides = slides.length;

  function setRolloutStage(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    activeIndex = index;

    tabs.forEach((tab, idx) => {
      const isSelected = idx === activeIndex;
      tab.classList.toggle('is-active', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    slides.forEach((slide, idx) => {
      if (idx === activeIndex) {
        slide.classList.remove('is-active');
        void slide.offsetWidth;
        slide.classList.add('is-active');
      } else {
        slide.classList.remove('is-active');
      }
    });

    if (progressBar) {
      const pct = ((activeIndex + 1) / totalSlides) * 100;
      progressBar.style.width = `${pct}%`;
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const stage = parseInt(tab.getAttribute('data-rollout-stage') || '0', 10);
      setRolloutStage(stage);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      setRolloutStage(activeIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      setRolloutStage(activeIndex + 1);
    });
  }

  rollNextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      setRolloutStage(activeIndex + 1);
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setRolloutStage(activeIndex + 1);
        tabs[activeIndex]?.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setRolloutStage(activeIndex - 1);
        tabs[activeIndex]?.focus();
      }
    });
  });
}
