document.addEventListener('DOMContentLoaded', () => {
  initCountdownTimer();
  initVipSubscription();
  initSculptureParallax();
});
function initCountdownTimer() {
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-mins');
  const secsEl = document.getElementById('timer-secs');
  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;
  let launchTimestamp = localStorage.getItem('oralize_launch_target');
  if (!launchTimestamp) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 28);
    targetDate.setHours(targetDate.getHours() + 14);
    launchTimestamp = targetDate.getTime();
    localStorage.setItem('oralize_launch_target', launchTimestamp);
  } else {
    launchTimestamp = parseInt(launchTimestamp, 10);
  }
  function updateTimer() {
    const now = new Date().getTime();
    let distance = launchTimestamp - now;
    if (distance <= 0) {
      distance = 28 * 24 * 60 * 60 * 1000;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }
  updateTimer();
  setInterval(updateTimer, 1000);
}
function initVipSubscription() {
  const form = document.getElementById('cs-subscribe-form');
  const input = document.getElementById('cs-subscribe-input');
  const successPass = document.getElementById('cs-success-pass');
  const passEmailEl = document.getElementById('cs-pass-email');
  if (!form || !input || !successPass) return;
  const savedVip = localStorage.getItem('oralize_vip_email');
  if (savedVip) {
    form.style.display = 'none';
    if (passEmailEl) passEmailEl.textContent = savedVip;
    successPass.classList.add('is-active');
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email || !email.includes('@')) return;
    localStorage.setItem('oralize_vip_email', email);
    triggerCelebrationConfetti();
    form.style.display = 'none';
    if (passEmailEl) passEmailEl.textContent = email;
    successPass.classList.add('is-active');
  });
}
function triggerCelebrationConfetti() {
  const colors = ['#B51F3D', '#FF4D6D', '#FFB703', '#48CAE4', '#52B788'];
  const lucideSvgs = [
    '<svg class="lucide lucide-sparkles" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
    '<svg class="lucide lucide-star" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    '<svg class="lucide lucide-sparkle" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>',
    '<svg class="lucide lucide-smile" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>'
  ];
  for (let i = 0; i < 28; i++) {
    const el = document.createElement('div');
    el.innerHTML = lucideSvgs[Math.floor(Math.random() * lucideSvgs.length)];
    el.style.position = 'fixed';
    el.style.left = `${50 + (Math.random() * 20 - 10)}%`;
    el.style.top = `${50 + (Math.random() * 20 - 10)}%`;
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    el.style.fontSize = `${14 + Math.random() * 18}px`;
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transform = 'translate(-50%, -50%) scale(0.5)';
    el.style.opacity = '1';
    document.body.appendChild(el);
    const angle = Math.random() * 2 * Math.PI;
    const distance = 80 + Math.random() * 160;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;
    requestAnimationFrame(() => {
      el.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(1.2) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 1050);
  }
}
function initSculptureParallax() {
  const sculpture = document.querySelector('.cs-sculpture-img');
  const portal = document.querySelector('.cs-sculpture-portal');
  if (!sculpture || !portal) return;
  window.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 992) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (clientX - centerX) / centerX;
    const deltaY = (clientY - centerY) / centerY;
    const tiltX = -deltaY * 12;
    const tiltY = deltaX * 14;
    sculpture.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
  });
  sculpture.addEventListener('click', () => {
    sculpture.style.transform = 'scale(1.15) rotate(10deg)';
    setTimeout(() => {
      sculpture.style.transform = 'scale(1.08) rotate(-8deg)';
    }, 180);
    setTimeout(() => {
      sculpture.style.transform = '';
    }, 380);
    triggerCelebrationConfetti();
  });
}
