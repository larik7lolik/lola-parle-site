/* ============================================
   Lola Parle - Main JavaScript
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // Mobile Menu Toggle
  // ============================================

  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
      navbarCollapse.classList.toggle('show');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarCollapse.classList.remove('show');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = navbarToggler.contains(event.target) ||
                           navbarCollapse.contains(event.target);
      if (!isClickInside && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    });
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip empty anchors
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // Scroll Animations (Intersection Observer)
  // ============================================

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll animation classes
  document.querySelectorAll('[data-scroll-animate]').forEach(el => {
    observer.observe(el);
  });

  // ============================================
  // Form Handling
  // ============================================

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!data.name || !data.email || !data.message) {
        showFormError('Пожалуйста, заполните все обязательные поля');
        return;
      }

      // Email validation
      if (!isValidEmail(data.email)) {
        showFormError('Пожалуйста, введите корректный email');
        return;
      }

      // Simulate form submission (replace with actual API endpoint)
      submitForm(data);
    });
  }

  function showFormError(message) {
    const errorBox = document.querySelector('.js-errorbox-all');
    if (errorBox) {
      errorBox.textContent = message;
      errorBox.style.display = 'block';
      errorBox.classList.add('shake');
      setTimeout(() => {
        errorBox.classList.remove('shake');
      }, 500);
    }
  }

  function showFormSuccess(message) {
    const successBox = document.querySelector('.js-successbox');
    if (successBox) {
      successBox.textContent = message;
      successBox.style.display = 'block';
      successBox.classList.add('fade-in');
    }
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function submitForm(data) {
    // Replace with your actual API endpoint or service
    console.log('Form submitted:', data);

    // Example: Send to Formspree
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // .then(response => {
    //   if (response.ok) {
    //     showFormSuccess('Спасибо! Ваша заявка отправлена.');
    //     contactForm.reset();
    //   } else {
    //     showFormError('Ошибка при отправке. Попробуйте позже.');
    //   }
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    //   showFormError('Ошибка при отправке. Попробуйте позже.');
    // });

    // For now, just show success
    showFormSuccess('Спасибо! Ваша заявка отправлена. Менеджер перезвонит в ближайшее время.');
    contactForm.reset();
  }

  // ============================================
  // Lazy Loading Images
  // ============================================

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('fade-in');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ============================================
  // Scroll to Top Button
  // ============================================

  const scrollTopBtn = document.getElementById('scrollTopBtn');

  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });

    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============================================
  // Active Navigation Link
  // ============================================

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);

  // ============================================
  // Accordion / Collapse
  // ============================================

  document.querySelectorAll('[data-toggle="collapse"]').forEach(button => {
    button.addEventListener('click', function() {
      const target = document.querySelector(this.getAttribute('data-target'));
      if (target) {
        target.classList.toggle('show');
        this.classList.toggle('active');
      }
    });
  });

  // ============================================
  // Modal/Lightbox
  // ============================================

  document.querySelectorAll('[data-toggle="modal"]').forEach(trigger => {
    trigger.addEventListener('click', function() {
      const modalId = this.getAttribute('data-target');
      const modal = document.querySelector(modalId);
      if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Close modal on outside click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // ============================================
  // Utility Functions
  // ============================================

  window.utilities = {
    // Copy text to clipboard
    copyToClipboard: function(text) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard: ' + text);
      });
    },

    // Format phone number
    formatPhone: function(phone) {
      return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
    },

    // Debounce function
    debounce: function(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    // Get URL parameter
    getUrlParam: function(name) {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    }
  };

  // ============================================
  // Page Load Complete
  // ============================================

  console.log('Lola Parle - JavaScript loaded successfully');

})();
