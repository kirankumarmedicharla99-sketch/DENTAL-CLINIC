document.addEventListener('DOMContentLoaded', () => {
  initServicesSmoothScroll();
  initServiceCardClickable();
});
function initServicesSmoothScroll() {
  const scrollBtns = document.querySelectorAll('a[href="#services-grid"]');
  scrollBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('services-grid');
      if (target) {
        const offset = 80;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}
function initServiceCardClickable() {
  const cards = document.querySelectorAll('.service-card-item');
  cards.forEach(card => {
    const link = card.querySelector('.service-card-link');
    if (!link) return;
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') === link || !e.target.closest('a')) {
        window.location.href = link.href;
      }
    });
  });
}
