/* ==========================================
   MemorJ - Made to Remember
   Vanilla JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
  // ==========================================
  // Intro Animation
  // ==========================================
  const intro = document.getElementById('intro');
  const mainContent = document.getElementById('main-content');
  
  // Skip intro on click
  intro.addEventListener('click', function() {
    skipIntro();
  });
  
  // Auto-complete intro after animation
  setTimeout(function() {
    skipIntro();
  }, 4500);
  
  function skipIntro() {
    if (!intro.classList.contains('fade-out')) {
      intro.classList.add('fade-out');
      mainContent.classList.remove('hidden');
      
      // Remove intro from DOM after fade
      setTimeout(function() {
        intro.style.display = 'none';
      }, 5000);
    }
  }
  
  // ==========================================
  // Mobile Navigation
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
  const closeIcon = mobileMenuBtn.querySelector('.close-icon');
  
  mobileMenuBtn.addEventListener('click', function() {
    const isOpen = !mobileNav.classList.contains('hidden');
    
    if (isOpen) {
      mobileNav.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    } else {
      mobileNav.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  });
  
  // Close mobile nav when clicking a link
  const mobileNavLinks = mobileNav.querySelectorAll('a');
  mobileNavLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      mobileNav.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
  
  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // ==========================================
  // Scroll Animations (Intersection Observer)
  // ==========================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(function(element) {
    observer.observe(element);
  });
  
  // ==========================================
  // Navbar Background on Scroll
  // ==========================================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add/remove shadow based on scroll position
    if (currentScroll > 50) {
      navbar.style.boxShadow = '0 4px 20px -4px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
  
  // ==========================================
  // Button Hover Effects
  // ==========================================
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(function(button) {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // ==========================================
  // Parallax Effect for Hero Glows
  // ==========================================
  const heroGlows = document.querySelectorAll('.hero-glow');
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    heroGlows.forEach(function(glow, index) {
      const speed = (index + 1) * 0.1;
      glow.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
  
  // ==========================================
  // Active Navigation Link
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(function(link) {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + sectionId) {
            link.style.color = 'hsl(32, 85%, 55%)';
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Initial call
});
