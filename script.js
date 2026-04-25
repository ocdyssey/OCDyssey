const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
const navLinks = document.querySelectorAll('#site-nav a');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const amountButtons = Array.from(document.querySelectorAll('.amount-button'));
const customAmount = document.querySelector('#customAmount');
const donateButton = document.querySelector('#donateButton');
const donationSummary = document.querySelector('#donationSummary');

function formatAmount(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return '';
  return `$${numeric.toLocaleString()}`;
}

function updateAmountState(value) {
  const formatted = formatAmount(value);

  amountButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.amount === String(value));
  });

  if (donateButton) {
    donateButton.textContent = formatted ? `Give ${formatted} on Zeffy` : 'Donate on Zeffy';
  }

  if (donationSummary) {
    donationSummary.textContent = formatted
      ? `${formatted} is selected as a suggested amount. You can confirm or change it once Zeffy opens.`
      : 'Choose any gift amount you would like once Zeffy opens.';
  }
}

amountButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const amount = button.dataset.amount || '';
    if (customAmount) customAmount.value = '';
    updateAmountState(amount);
  });
});

if (customAmount) {
  customAmount.addEventListener('input', (event) => {
    const value = event.target.value.trim();
    amountButtons.forEach((button) => button.classList.remove('active'));
    updateAmountState(value);
  });
}

const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#name')?.value.trim() || '';
    const email = document.querySelector('#email')?.value.trim() || '';
    const topic = document.querySelector('#topic')?.value.trim() || 'General inquiry';
    const message = document.querySelector('#message')?.value.trim() || '';

    const subject = `${topic} - Website message from ${name || 'a visitor'}`;
    const bodyLines = [
      `Name: ${name || 'Not provided'}`,
      `Email: ${email || 'Not provided'}`,
      `Topic: ${topic}`,
      '',
      message || 'No message provided.'
    ];

    const mailto = `mailto:ocdyssey@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;

    if (formStatus) {
      formStatus.textContent = 'Your email app should open with a draft to ocdyssey@gmail.com.';
    }
  });
}
