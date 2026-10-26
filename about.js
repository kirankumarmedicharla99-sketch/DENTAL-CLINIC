document.addEventListener('DOMContentLoaded', () => {
  initAboutSmoothScroll();
  initAboutTimelineObserver();
  initAboutDoctorBooking();
});
function initAboutSmoothScroll() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#' && document.querySelector(targetId)) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
function initAboutTimelineObserver() {
  const animatedElements = document.querySelectorAll('.about-timeline-item, .about-mv-card');
  if (!animatedElements.length || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}
function initAboutDoctorBooking() {
  const docBtns = document.querySelectorAll('[data-dentist-preset]');
  const modal = document.getElementById('appointment-modal');
  if (!modal) return;
  docBtns.forEach(btn => {
    btn.addEventListener('click', () => {
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
