document.addEventListener('DOMContentLoaded', () => {
  initAuthTheme();
  initAuthDirection();
  initSignupForm();
  initPasswordToggles();
  initSocialSignup();
});
function initAuthTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const savedTheme = localStorage.getItem('oralize_theme') || 'light';
  applyAuthTheme(savedTheme);
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyAuthTheme(newTheme);
      localStorage.setItem('oralize_theme', newTheme);
      showAuthToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    });
  });
}
function applyAuthTheme(theme) {
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
function initAuthDirection() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const savedDir = localStorage.getItem('oralize_dir') || 'ltr';
  applyAuthDirection(savedDir);
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyAuthDirection(newDir);
      localStorage.setItem('oralize_dir', newDir);
      showAuthToast(`Switched layout to ${newDir.toUpperCase()}`);
    });
  });
}
function applyAuthDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.style.direction = dir;
}
function initPasswordToggles() {
  setupToggle('toggle-signup-password-btn', 'signup-password');
  setupToggle('toggle-confirm-password-btn', 'signup-confirm-password');
}
function setupToggle(btnId, inputId) {
  const toggleBtn = document.getElementById(btnId);
  const passwordInput = document.getElementById(inputId);
  if (!toggleBtn || !passwordInput) return;
  toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    const eyeOpen = toggleBtn.querySelector('.eye-open');
    const eyeClosed = toggleBtn.querySelector('.eye-closed');
    if (eyeOpen && eyeClosed) {
      eyeOpen.style.display = isPassword ? 'none' : 'block';
      eyeClosed.style.display = isPassword ? 'block' : 'none';
    }
  });
}
function initSignupForm() {
  const form = document.getElementById('signup-form');
  const nameInput = document.getElementById('signup-name');
  const emailInput = document.getElementById('signup-email');
  const passwordInput = document.getElementById('signup-password');
  const confirmInput = document.getElementById('signup-confirm-password');
  const termsCheckbox = document.getElementById('agree-terms');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const confirmError = document.getElementById('confirm-error');
  const termsError = document.getElementById('terms-error');
  const alertBox = document.getElementById('auth-alert');
  const submitBtn = document.getElementById('signup-submit-btn');
  if (!form) return;
  nameInput.addEventListener('input', () => clearError(nameInput, nameError));
  emailInput.addEventListener('input', () => clearError(emailInput, emailError));
  passwordInput.addEventListener('input', () => clearError(passwordInput, passwordError));
  confirmInput.addEventListener('input', () => clearError(confirmInput, confirmError));
  termsCheckbox.addEventListener('change', () => clearError(termsCheckbox, termsError));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const passVal = passwordInput.value;
    const confirmVal = confirmInput.value;
    const termsAgreed = termsCheckbox.checked;
    if (!nameVal) {
      showError(nameInput, nameError, 'Please enter your full name');
      isValid = false;
    } else if (nameVal.length < 2) {
      showError(nameInput, nameError, 'Name must be at least 2 characters');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }
    if (!emailVal) {
      showError(emailInput, emailError, 'Please enter your email address');
      isValid = false;
    } else if (!isValidEmail(emailVal)) {
      showError(emailInput, emailError, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }
    if (!passVal) {
      showError(passwordInput, passwordError, 'Please create a password');
      isValid = false;
    } else if (passVal.length < 6) {
      showError(passwordInput, passwordError, 'Password must be at least 6 characters');
      isValid = false;
    } else {
      clearError(passwordInput, passwordError);
    }
    if (!confirmVal) {
      showError(confirmInput, confirmError, 'Please confirm your password');
      isValid = false;
    } else if (confirmVal !== passVal) {
      showError(confirmInput, confirmError, 'Passwords do not match');
      isValid = false;
    } else {
      clearError(confirmInput, confirmError);
    }
    if (!termsAgreed) {
      if (termsError) {
        termsError.textContent = 'Please accept the Terms & Privacy Policy to continue';
        termsError.classList.add('visible');
      }
      isValid = false;
    } else {
      if (termsError) {
        termsError.textContent = '';
        termsError.classList.remove('visible');
      }
    }
    if (!isValid) return;
    setButtonLoading(submitBtn, true, 'Creating Account...');
    setTimeout(() => {
      const newUser = {
        name: nameVal,
        email: emailVal,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('oralize_active_user', JSON.stringify(newUser));
      showAlert(alertBox, 'success', 'Account created successfully! Redirecting to your dashboard...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    }, 1000);
  });
}
function showError(input, errorEl, msg) {
  input.classList.add('is-invalid');
  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.classList.add('visible');
  }
}
function clearError(input, errorEl) {
  input.classList.remove('is-invalid');
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }
}
function showAlert(box, type, msg) {
  if (!box) return;
  box.className = `auth-alert ${type}`;
  box.textContent = msg;
  box.style.display = 'flex';
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function setButtonLoading(btn, isLoading, text) {
  if (!btn) return;
  if (isLoading) {
    btn.disabled = true;
    btn.dataset.origText = btn.innerHTML;
    btn.innerHTML = `
      <svg class="spinner-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 0.8s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      <span>${text}</span>
    `;
  } else {
    btn.disabled = false;
    btn.innerHTML = btn.dataset.origText || 'Create Account';
  }
}
function initSocialSignup() {
  const googleBtn = document.getElementById('google-signup-btn');
  const appleBtn = document.getElementById('apple-signup-btn');
  const alertBox = document.getElementById('auth-alert');
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      showAlert(alertBox, 'success', 'Signing up with Google Account...');
      setTimeout(() => {
        localStorage.setItem('oralize_active_user', JSON.stringify({
          name: 'Sarah Jenkins',
          email: 'sarah.jenkins@gmail.com',
          provider: 'google'
        }));
        window.location.href = 'dashboard.html';
      }, 1100);
    });
  }
  if (appleBtn) {
    appleBtn.addEventListener('click', () => {
      showAlert(alertBox, 'success', 'Creating account with Apple ID...');
      setTimeout(() => {
        localStorage.setItem('oralize_active_user', JSON.stringify({
          name: 'Oralize Patient',
          email: 'patient@privaterelay.appleid.com',
          provider: 'apple'
        }));
        window.location.href = 'dashboard.html';
      }, 1100);
    });
  }
}
function showAuthToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast toast-info show';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
