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
        if (!input.value.trim()) {
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
});