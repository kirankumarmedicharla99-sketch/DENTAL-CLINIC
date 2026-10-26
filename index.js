document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initHeaderScroll();
  initMobileNav();
  initDropdowns();
  initStatsCounter();
  initAppointmentModals();
  initDashboardTabs();
  initAuthForm();
  initSmileSlider();
});
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const savedTheme = localStorage.getItem('oralize_theme') || 'light';
  applyTheme(savedTheme);
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('oralize_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} theme`, 'info');
    });
  });
}
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    const isDark = theme === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
    btn.setAttribute('title', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
    const icon = btn.querySelector('.theme-icon');
    if (icon) {
      icon.innerHTML = isDark
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  });
}
function initDirection() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const savedDir = localStorage.getItem('oralize_dir') || 'ltr';
  applyDirection(savedDir);
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(newDir);
      localStorage.setItem('oralize_dir', newDir);
      showToast(`Switched layout to ${newDir.toUpperCase()}`, 'info');
    });
  });
}
function applyDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  document.querySelectorAll('.rtl-toggle').forEach(btn => {
    btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    btn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    const label = btn.querySelector('.rtl-label');
    if (label) {
      label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    }
  });
}
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = toggle.classList.toggle('is-active');
    menu.classList.toggle('is-active');
    toggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('is-active') && !menu.contains(e.target) && !toggle.contains(e.target)) {
      toggle.classList.remove('is-active');
      menu.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-active')) {
      toggle.classList.remove('is-active');
      menu.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}
function initDropdowns() {
  const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
  dropdownItems.forEach(item => {
    const trigger = item.querySelector('.dropdown-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        item.classList.toggle('dropdown-open');
      }
    });
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.classList.toggle('dropdown-open');
      } else if (e.key === 'Escape') {
        item.classList.remove('dropdown-open');
      }
    });
  });
  document.addEventListener('click', (e) => {
    dropdownItems.forEach(item => {
      if (!item.contains(e.target)) {
        item.classList.remove('dropdown-open');
      }
    });
  });
}
function initStatsCounter() {
  const statsElements = document.querySelectorAll('.stat-number[data-count]');
  if (!statsElements.length) return;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseInt(el.getAttribute('data-count'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        animateValue(el, 0, targetValue, 1800, prefix, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });
  statsElements.forEach(el => observer.observe(el));
}
function animateValue(obj, start, end, duration, prefix = '', suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeOutQuad = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOutQuad * (end - start) + start);
    obj.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.textContent = `${prefix}${end.toLocaleString()}${suffix}`;
    }
  };
  window.requestAnimationFrame(step);
}
function initAppointmentModals() {
  const modal = document.getElementById('appointment-modal');
  const openButtons = document.querySelectorAll('[data-open-modal="appointment-modal"], .btn-book-appointment');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  if (!modal) return;
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      const presetService = btn.getAttribute('data-service');
      const serviceSelect = modal.querySelector('select[name="service"]');
      if (presetService && serviceSelect) {
        serviceSelect.value = presetService;
      }
    });
  });
  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };
  closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
  const bookingForm = modal.querySelector('#appointment-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(bookingForm);
      const patientName = formData.get('name') || 'Guest Patient';
      const service = formData.get('service') || 'General Dental Consultation';
      const date = formData.get('date') || 'Tomorrow';
      const time = formData.get('time') || '10:00 AM';
      const dentist = formData.get('dentist') || 'Dr. Sarah Mitchell, DDS';
      const existingAppointments = JSON.parse(localStorage.getItem('oralize_appointments') || '[]');
      existingAppointments.unshift({
        id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
        patient: patientName,
        service: service,
        date: date,
        time: time,
        dentist: dentist,
        status: 'Confirmed'
      });
      localStorage.setItem('oralize_appointments', JSON.stringify(existingAppointments));
      closeModal();
      bookingForm.reset();
      showToast(`Appointment confirmed for ${patientName} on ${date} at ${time}!`, 'success');
      if (typeof window.refreshDashboardAppointments === 'function') {
        window.refreshDashboardAppointments();
      }
    });
  }
}
function initDashboardTabs() {
  const navBtns = document.querySelectorAll('.dashboard-nav-btn[data-tab]');
  const panels = document.querySelectorAll('.dashboard-tab-panel');
  if (!navBtns.length) return;
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      navBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const activePanel = document.getElementById(`tab-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
  window.refreshDashboardAppointments = function() {
    const tableBody = document.getElementById('dashboard-appointments-tbody');
    if (!tableBody) return;
    const saved = JSON.parse(localStorage.getItem('oralize_appointments') || '[]');
    const defaultData = [
      { id: 'APT-8421', patient: 'Eleanor Vance', service: 'Invisalign Checkup', date: 'Oct 24, 2026', time: '10:30 AM', dentist: 'Dr. Marcus Vance', status: 'Confirmed' },
      { id: 'APT-8390', patient: 'Eleanor Vance', service: 'Professional Hygiene Cleaning', date: 'Nov 12, 2026', time: '02:00 PM', dentist: 'Dr. Sarah Mitchell', status: 'Pending' }
    ];
    const data = saved.length ? [...saved, ...defaultData] : defaultData;
    tableBody.innerHTML = data.map(apt => `
      <tr>
        <td><strong>#${apt.id}</strong></td>
        <td>${apt.service}</td>
        <td>${apt.dentist}</td>
        <td>${apt.date} • ${apt.time}</td>
        <td><span class="badge-status ${apt.status.toLowerCase() === 'confirmed' ? 'badge-confirmed' : 'badge-pending'}">${apt.status}</span></td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="cancelDemoAppointment('${apt.id}')">Cancel</button>
        </td>
      </tr>
    `).join('');
  };
  window.cancelDemoAppointment = function(id) {
    if (confirm(`Are you sure you want to cancel appointment #${id}?`)) {
      let saved = JSON.parse(localStorage.getItem('oralize_appointments') || '[]');
      saved = saved.filter(a => a.id !== id);
      localStorage.setItem('oralize_appointments', JSON.stringify(saved));
      window.refreshDashboardAppointments();
      showToast(`Appointment #${id} cancelled.`, 'info');
    }
  };
  window.refreshDashboardAppointments();
  const inlineBooking = document.getElementById('dashboard-booking-form');
  if (inlineBooking) {
    inlineBooking.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(inlineBooking);
      const apt = {
        id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
        patient: formData.get('name') || 'Eleanor Vance',
        service: formData.get('service'),
        date: formData.get('date'),
        time: formData.get('time'),
        dentist: formData.get('dentist'),
        status: 'Confirmed'
      };
      const saved = JSON.parse(localStorage.getItem('oralize_appointments') || '[]');
      saved.unshift(apt);
      localStorage.setItem('oralize_appointments', JSON.stringify(saved));
      inlineBooking.reset();
      window.refreshDashboardAppointments();
      showToast('New appointment booked successfully!', 'success');
      const overviewBtn = document.querySelector('.dashboard-nav-btn[data-tab="overview"]');
      if (overviewBtn) overviewBtn.click();
    });
  }
  window.viewDemoPrescription = function(rxId) {
    alert(`ORALIZE CLINIC PRESCRIPTION DETAILS [Rx #${rxId}]\n\nPrescribed by: Dr. Sarah Mitchell, DDS\nMedication: Amoxicillin 500mg\nInstructions: Take 1 capsule three times daily with meals for 7 days.\nStatus: Ready for pharmacy pickup`);
  };
  window.viewDemoReceipt = function(receiptId) {
    alert(`ORALIZE CLINIC OFFICIAL RECEIPT [Receipt #${receiptId}]\n\nPatient: Eleanor Vance\nProcedure: Comprehensive Hygiene & Laser Whitening\nDate: October 14, 2026\nPayment Method: Visa Ending in •••• 4219\nTotal Paid: $240.00 USD\nStatus: Paid in Full`);
  };
}
function initAuthForm() {
  const tabs = document.querySelectorAll('.auth-tab-btn');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const pwdToggles = document.querySelectorAll('.auth-password-toggle');
  if (tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-auth-tab');
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (target === 'login') {
          if (loginForm) loginForm.style.display = 'block';
          if (registerForm) registerForm.style.display = 'none';
        } else {
          if (loginForm) loginForm.style.display = 'none';
          if (registerForm) registerForm.style.display = 'block';
        }
      });
    });
  }
  pwdToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.parentElement.querySelector('input');
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      toggle.innerHTML = isPassword
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    });
  });
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Authentication successful! Redirecting to Patient Dashboard...', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    });
  }
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Account registered successfully! Redirecting to Dashboard...', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    });
  }
}
function initSmileSlider() {
  const container = document.querySelector('.comparison-container');
  if (!container) return;
  const slider = container.querySelector('.comparison-range');
  const overlay = container.querySelector('.comparison-overlay');
  const handle = container.querySelector('.comparison-handle');
  if (!slider || !overlay) return;
  const updateSlider = (val) => {
    overlay.style.width = `${val}%`;
    if (handle) handle.style.left = `${val}%`;
  };
  slider.addEventListener('input', (e) => updateSlider(e.target.value));
  updateSlider(50);
}
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B51F3D" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px) scale(0.95)';
    toast.style.transition = 'all 200ms ease';
    setTimeout(() => toast.remove(), 200);
  }, 3500);
}
window.showToast = showToast;
