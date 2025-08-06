// Mobile Menu Toggle
const menu = document.querySelector('#menu-icon-js');
const menuicon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navtc = document.querySelector('#nav-tc-js');

menu.onclick = () => {
  menuicon.classList.toggle('bx-x');
  navbar.classList.toggle('open');
  navtc.classList.toggle("nav-touch-close-open");
}

navtc.onclick = () => {
  menuicon.classList.toggle('bx-x');
  navbar.classList.remove('open');
  navtc.classList.remove('nav-touch-close-open');
  navtc.classList.remove("nav-tc-z");
  navtc.classList.remove("nav-LR-TC");
}

// Navbar Scroll Behavior
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  const currentScrollPos = window.pageYOffset;
  const header = document.getElementById("header");

  header.classList.add('scrolled');
  if (currentScrollPos === 0) {
    header.classList.remove('scrolled');
  }
  if (navtc.classList.contains('nav-touch-close-open')) return;
  
  header.style.top = prevScrollpos > currentScrollPos ? "0" : "-100px";
  prevScrollpos = currentScrollPos;
}

// Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');

  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.textContent = '🌙';
  }
  
  themeToggle.addEventListener('click', function() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement[isDark ? 'removeAttribute' : 'setAttribute']('data-theme', 'dark');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
});

// EmailJS Form Handling
function initializeEmailJS() {
  // Only run if on contact page
  if (!document.getElementById('contact-form')) return;

  emailjs.init("LbaGKvZebPgxzJ64v");

  const contactForm = document.getElementById('contact-form');
  const errorDiv = document.querySelector('.error');
  const emailErrorDiv = document.querySelector('.email-error');
  const contactButton = document.querySelector('.contact-button');
  const contactLoad = document.querySelector('.contact-load');
  const submitText = document.querySelector('.submit-text');
  const contactSubmitAfter = document.querySelector('.contact-submit-after');
  const formSection = document.querySelector('.form-section');
  const contactSection = document.querySelector('.contact-section');

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Clear errors
    errorDiv.classList.remove('error-show');
    emailErrorDiv.classList.remove('error-show');
    
    // Validate
    if (!name || !email || !message) {
      errorDiv.classList.add('error-show');
      return;
    }
    
    if (!emailRegex.test(email)) {
      emailErrorDiv.classList.add('error-show');
      return;
    }
    
    // Show loading state
    contactButton.classList.add('loading');
    contactLoad.classList.add('show');
    submitText.classList.add('hide');
    
    // Send email
    emailjs.send("service_6r9e90i", "template_8zk90pl", {
      name: name,
      email: email,
      message: message,
      time: new Date().toLocaleString()
    })
    .then(() => {
      contactSubmitAfter.classList.add('show');
      formSection.classList.add('hide');
      contactSection.classList.add('csa-cs');
      contactForm.classList.add('csa-cf');
      contactForm.reset();
    })
    .catch((error) => {
      console.error('Email send failed:', error);
      alert('Message failed to send. Please try again.');
    })
    .finally(() => {
      contactButton.classList.remove('loading');
      contactLoad.classList.remove('show');
      submitText.classList.remove('hide');
    });
  });

  // OK button handler
  document.querySelector('.csa-ok')?.addEventListener('click', () => {
    contactSubmitAfter.classList.remove('show');
    formSection.classList.remove('hide');
    contactSection.classList.remove('csa-cs');
    contactForm.classList.remove('csa-cf');
  });
}

// Initialize EmailJS when DOM loads
document.addEventListener('DOMContentLoaded', initializeEmailJS);