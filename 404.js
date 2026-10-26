document.addEventListener('DOMContentLoaded', () => {
  initToothInteractions();
  initErrorSearch();
});
function initToothInteractions() {
  const toothSlot = document.querySelector('.error-zero-slot');
  const toothImg = document.querySelector('.zero-tooth-img');
  const speechBubble = document.getElementById('tooth-speech');
  if (!toothSlot || !toothImg || !speechBubble) return;
  const playfulQuotes = [
    "I'm 100% cavity-free! ✨",
    "Don't worry, we don't bite! 😁",
    "Looks like this page needs a filling!",
    "Floss daily for happy smiles! 🦷",
    "Missing tooth found safe and sound!",
    "Root canal complete, let's head home! 🚀"
  ];
  let quoteIndex = 0;
  toothSlot.addEventListener('click', () => {
    toothImg.style.transform = 'scale(1.22) rotate(15deg)';
    setTimeout(() => {
      toothImg.style.transform = 'scale(1.15) rotate(-12deg)';
    }, 150);
    setTimeout(() => {
      toothImg.style.transform = '';
    }, 350);
    quoteIndex = (quoteIndex + 1) % playfulQuotes.length;
    speechBubble.textContent = playfulQuotes[quoteIndex];
    speechBubble.classList.add('is-visible');
    createSparkleBurst(toothSlot);
    clearTimeout(toothSlot._bubbleTimeout);
    toothSlot._bubbleTimeout = setTimeout(() => {
      speechBubble.classList.remove('is-visible');
    }, 3500);
  });
}
function createSparkleBurst(container) {
  const count = 5;
  const symbols = ['✦', '✨', '★', '🦷', '✦'];
  const colors = ['#FFB703', '#FF4D6D', '#B51F3D', '#48CAE4', '#FFD166'];
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'dynamic-sparkle';
    sparkle.textContent = symbols[i % symbols.length];
    sparkle.style.position = 'absolute';
    sparkle.style.left = '50%';
    sparkle.style.top = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = `${14 + Math.random() * 12}px`;
    sparkle.style.color = colors[i % colors.length];
    sparkle.style.zIndex = '20';
    sparkle.style.transform = 'translate(-50%, -50%)';
    sparkle.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    sparkle.style.opacity = '1';
    container.appendChild(sparkle);
    const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
    const distance = 45 + Math.random() * 45;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;
    requestAnimationFrame(() => {
      sparkle.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0.6) rotate(${Math.random() * 180}deg)`;
      sparkle.style.opacity = '0';
    });
    setTimeout(() => {
      sparkle.remove();
    }, 650);
  }
}
function initErrorSearch() {
  const form = document.getElementById('error-search-form');
  const input = document.getElementById('error-search-input');
  if (!form || !input) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim().toLowerCase();
    if (!query) return;
    if (query.includes('price') || query.includes('cost') || query.includes('insur') || query.includes('fee')) {
      window.location.href = 'pricing.html';
    } else if (query.includes('clean') || query.includes('hygiene') || query.includes('scale')) {
      window.location.href = 'services.html#cleaning';
    } else if (query.includes('whiten') || query.includes('bleach') || query.includes('laser')) {
      window.location.href = 'services.html#whitening';
    } else if (query.includes('brace') || query.includes('ortho') || query.includes('align') || query.includes('invisalign')) {
      window.location.href = 'services.html#orthodontics';
    } else if (query.includes('implant') || query.includes('titanium') || query.includes('crown')) {
      window.location.href = 'services.html#implants';
    } else if (query.includes('root') || query.includes('canal') || query.includes('endodontic')) {
      window.location.href = 'services.html#rootcanal';
    } else if (query.includes('doc') || query.includes('sarah') || query.includes('team') || query.includes('about')) {
      window.location.href = 'about.html#team';
    } else if (query.includes('contact') || query.includes('phone') || query.includes('address') || query.includes('book')) {
      window.location.href = 'contact.html';
    } else if (query.includes('dash') || query.includes('portal') || query.includes('patient')) {
      window.location.href = 'dashboard.html';
    } else if (query.includes('login') || query.includes('sign in')) {
      window.location.href = 'login.html';
    } else {
      window.location.href = `services.html?search=${encodeURIComponent(query)}`;
    }
  });
}
