document.addEventListener('DOMContentLoaded', () => {
  initHome2Principles();
  initHome2StepObserver();
  initDoctorBookingButtons();
  initHome2LiveClock();
  initHome2DoctorCarousel();
});
function initHome2LiveClock() {
  const clockEl = document.getElementById('home2-live-clock');
  if (!clockEl) return;
  const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const offsetMin = -now.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetMin) / 60);
    const sign = offsetMin >= 0 ? '+' : '-';
    const gmtStr = `GMT${sign}${offsetHours}`;
    clockEl.textContent = `${hours}:${minutes}:${seconds} ${gmtStr}`;
  };
  updateClock();
  setInterval(updateClock, 1000);
}
function initHome2DoctorCarousel() {
  const nextBtn = document.getElementById('home2-dentist-next-btn');
  const cards = document.querySelectorAll('.home2-dentist-card');
  if (!cards.length) return;
  let currentIndex = 0;
  const showDoctor = (index) => {
    cards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  };
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % cards.length;
      showDoctor(currentIndex);
    });
  }
  let autoTimer = setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    showDoctor(currentIndex);
  }, 4500);
  const stack = document.getElementById('home2-dentist-stack');
  if (stack) {
    stack.addEventListener('mouseenter', () => clearInterval(autoTimer));
    stack.addEventListener('mouseleave', () => {
      autoTimer = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        showDoctor(currentIndex);
      }, 4500);
    });
  }
}
function initHome2Principles() {
  const rows = document.querySelectorAll('.home2-principle-row');
  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      const num = row.querySelector('.home2-principle-num');
      if (num) num.style.color = 'var(--color-primary)';
    });
    row.addEventListener('mouseleave', () => {
      const num = row.querySelector('.home2-principle-num');
      if (num) num.style.color = '';
    });
  });
}
function initHome2StepObserver() {
  const steps = document.querySelectorAll('.home2-step-item');
  if (!steps.length || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  steps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(18px)';
    step.style.transition = 'opacity 500ms ease, transform 500ms ease';
    observer.observe(step);
  });
}
function initDoctorBookingButtons() {
  const doctorButtons = document.querySelectorAll('[data-dentist-preset]');
  const modal = document.getElementById('appointment-modal');
  if (!modal) return;
  doctorButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const docName = btn.getAttribute('data-dentist-preset');
      const select = modal.querySelector('select[name="dentist"]');
      if (select && docName) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].text.includes(docName) || select.options[i].value.includes(docName)) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    });
  });
}
