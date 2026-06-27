document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navList.classList.toggle('active');
      navToggle.classList.toggle('open');
    });
  }

  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const requiredInputs = bookingForm.querySelectorAll('[aria-required="true"]');
      
      requiredInputs.forEach(input => {
        const errorSpan = document.getElementById(`${input.id}-err`);
        const value = input.value.trim();
        const isEmpty = !value;

        if (isEmpty) {
          isValid = false;
          input.style.borderColor = '#dc2626';
          if (errorSpan) errorSpan.textContent = 'This field is required.';
        } else {
          input.style.borderColor = '#cbd5e1';
          if (errorSpan) errorSpan.textContent = '';
        }
      });

      const emailInput = document.getElementById('email');
      if (emailInput && emailInput.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorSpan = document.getElementById('email-err');
        if (!emailRegex.test(emailInput.value.trim())) {
          isValid = false;
          emailInput.style.borderColor = '#dc2626';
          if (errorSpan) errorSpan.textContent = 'Please enter a valid email address.';
        }
      }

      const guestsInput = document.getElementById('guests');
      if (guestsInput && guestsInput.value.trim()) {
        const guests = Number(guestsInput.value);
        const errorSpan = document.getElementById('guests-err');
        if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
          isValid = false;
          guestsInput.style.borderColor = '#dc2626';
          if (errorSpan) errorSpan.textContent = 'Please enter a guest count from 1 to 20.';
        }
      }

      const dateInput = document.getElementById('date');
      if (dateInput && dateInput.value) {
        const selectedDate = new Date(`${dateInput.value}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const errorSpan = document.getElementById('date-err');
        if (selectedDate < today) {
          isValid = false;
          dateInput.style.borderColor = '#dc2626';
          if (errorSpan) errorSpan.textContent = 'Please choose today or a future date.';
        }
      }

      const consentBox = document.getElementById('consent');
      const consentErr = document.getElementById('consent-err');
      if (consentBox && !consentBox.checked) {
        isValid = false;
        if (consentErr) {
          consentErr.textContent = 'You must agree to be contacted before submitting.';
          consentErr.style.display = 'block';
        }
      } else if (consentErr) {
        consentErr.textContent = '';
        consentErr.style.display = 'none';
      }

      if (isValid) {
        const successMessage = document.getElementById('form-success');
        if (successMessage) {
          successMessage.style.display = 'block';
          bookingForm.reset();
          successMessage.focus();
        }
      }
    });
  }

  document.querySelectorAll('.stat-value[data-count]').forEach(stat => {
    const target = Number(stat.dataset.count);
    const suffix = stat.dataset.suffix || '';
    if (!Number.isFinite(target)) return;
    stat.textContent = `${target}${suffix}`;
  });
});
