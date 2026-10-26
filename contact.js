document.addEventListener('DOMContentLoaded', () => {
  initHeroInteractions();
  initContactForm();
  initFaqAccordion();
});
function initHeroInteractions() {
  const heroInquiryBtn = document.getElementById('hero-inquiry-btn');
  const inquirySection = document.getElementById('inquiry-form-section');
  const nameInput = document.getElementById('contact-name');
  if (heroInquiryBtn && inquirySection) {
    heroInquiryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      inquirySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        if (nameInput) {
          nameInput.focus();
        }
      }, 600);
    });
  }
  const scrollToMapLink = document.getElementById('scroll-to-map-link');
  const mapSection = document.getElementById('clinic-location-section');
  if (scrollToMapLink && mapSection) {
    scrollToMapLink.addEventListener('click', (e) => {
      e.preventDefault();
      mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
function initContactForm() {
  const form = document.getElementById('contact-inquiry-form');
  if (!form) return;
  const submitBtn = document.getElementById('contact-submit-btn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;
  const btnArrow = submitBtn ? submitBtn.querySelector('.btn-arrow-icon') : null;
  const feedbackAlert = document.getElementById('form-feedback');
  const fields = {
    name: {
      input: document.getElementById('contact-name'),
      error: document.getElementById('name-error'),
      validate: (val) => {
        if (!val.trim()) return 'Please enter your full name.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      }
    },
    email: {
      input: document.getElementById('contact-email'),
      error: document.getElementById('email-error'),
      validate: (val) => {
        if (!val.trim()) return 'Please enter your email address.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) return 'Please provide a valid email address (e.g. name@domain.com).';
        return '';
      }
    },
    phone: {
      input: document.getElementById('contact-phone'),
      error: document.getElementById('phone-error'),
      validate: (val) => {
        if (val.trim() && val.trim().length < 7) {
          return 'Please enter a valid phone number with area code.';
        }
        return '';
      }
    },
    subject: {
      input: document.getElementById('contact-subject'),
      error: document.getElementById('subject-error'),
      validate: (val) => {
        if (!val || val === '') return 'Please select a subject for your enquiry.';
        return '';
      }
    },
    message: {
      input: document.getElementById('contact-message'),
      error: document.getElementById('message-error'),
      validate: (val) => {
        if (!val.trim()) return 'Please share a brief message or question.';
        if (val.trim().length < 10) return 'Please provide a little more detail (at least 10 characters).';
        return '';
      }
    }
  };
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (!field.input) return;
    const clearError = () => {
      field.input.classList.remove('is-invalid');
      if (field.error) {
        field.error.textContent = '';
        field.error.classList.remove('is-visible');
      }
    };
    field.input.addEventListener('input', clearError);
    field.input.addEventListener('change', clearError);
    field.input.addEventListener('blur', () => {
      if (field.input.value.trim()) {
        const errorMsg = field.validate(field.input.value);
        if (errorMsg) {
          showFieldError(field, errorMsg);
        }
      }
    });
  });
  function showFieldError(field, msg) {
    field.input.classList.add('is-invalid');
    if (field.error) {
      field.error.textContent = msg;
      field.error.classList.add('is-visible');
    }
  }
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (feedbackAlert) {
      feedbackAlert.style.display = 'none';
      feedbackAlert.className = 'form-feedback-alert';
      feedbackAlert.innerHTML = '';
    }
    let isValid = true;
    let firstInvalidInput = null;
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (!field.input) return;
      const errorMsg = field.validate(field.input.value);
      if (errorMsg) {
        isValid = false;
        showFieldError(field, errorMsg);
        if (!firstInvalidInput) {
          firstInvalidInput = field.input;
        }
      } else {
        field.input.classList.remove('is-invalid');
        if (field.error) {
          field.error.textContent = '';
          field.error.classList.remove('is-visible');
        }
      }
    });
    if (!isValid) {
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
      return;
    }
    if (submitBtn) {
      submitBtn.disabled = true;
    }
    if (btnText) {
      btnText.textContent = 'Sending Message...';
    }
    if (btnSpinner) {
      btnSpinner.style.display = 'inline-block';
    }
    if (btnArrow) {
      btnArrow.style.display = 'none';
    }
    const formData = {
      name: fields.name.input.value.trim(),
      email: fields.email.input.value.trim(),
      phone: fields.phone.input ? fields.phone.input.value.trim() : '',
      subject: fields.subject.input.value,
      message: fields.message.input.value.trim()
    };
    await new Promise(resolve => setTimeout(resolve, 950));
    if (submitBtn) {
      submitBtn.disabled = false;
    }
    if (btnText) {
      btnText.textContent = 'Send Message';
    }
    if (btnSpinner) {
      btnSpinner.style.display = 'none';
    }
    if (btnArrow) {
      btnArrow.style.display = 'inline-block';
    }
    if (feedbackAlert) {
      feedbackAlert.className = 'form-feedback-alert is-success';
      feedbackAlert.innerHTML = `
        <strong>Thank you, ${escapeHtml(formData.name)}!</strong>
        <p style="margin-top: 6px;">
          Your enquiry regarding <em>${escapeHtml(formData.subject)}</em> has been successfully received by our clinic demo system.
        </p>
        <p style="margin-top: 6px; font-size: 0.85rem; opacity: 0.9;">
          In a live production deployment, an automated confirmation is sent to <strong>${escapeHtml(formData.email)}</strong> and dispatched directly to <code>care@oralize-dental.com</code>. For immediate appointment bookings, please call <strong>+1 (800) 420-SMILE</strong>.
        </p>
      `;
      feedbackAlert.style.display = 'block';
      feedbackAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (typeof window.showToast === 'function') {
      window.showToast(`Thank you ${formData.name}! Your enquiry has been received.`, 'success');
    }
    form.reset();
  });
}
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
function initFaqAccordion() {
  const accordionContainer = document.getElementById('contact-faq-accordion');
  if (!accordionContainer) return;
  const items = accordionContainer.querySelectorAll('.faq-item');
  const triggers = accordionContainer.querySelectorAll('.faq-trigger');
  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      const parentItem = trigger.closest('.faq-item');
      const isOpen = parentItem.classList.contains('is-open');
      const panel = parentItem.querySelector('.faq-panel');
      items.forEach(otherItem => {
        if (otherItem !== parentItem && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherPanel = otherItem.querySelector('.faq-panel');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.setAttribute('hidden', '');
        }
      });
      if (isOpen) {
        parentItem.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        if (panel) panel.setAttribute('hidden', '');
      } else {
        parentItem.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        if (panel) panel.removeAttribute('hidden');
      }
    });
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (index + 1) % triggers.length;
        triggers[nextIndex].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (index - 1 + triggers.length) % triggers.length;
        triggers[prevIndex].focus();
      }
    });
  });
}
