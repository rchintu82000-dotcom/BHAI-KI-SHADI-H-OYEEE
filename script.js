/**
 * ============================================================================
 * SNEHA & Rajnish — INDIAN WEDDING INVITATION WEBSITE
 * JavaScript Controller
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. EDITABLE CONSTANTS
     ========================================================================== */
  // Wedding Date & Time: 26 November 2026, 00:00:00 IST (+05:30)
  const WEDDING_DATE = new Date('2026-11-26T00:00:00+05:30');

  // Wedding Details String for Clipboard Copy
  const WEDDING_SHARE_TEXT = 
`💍 Sneha Anand & Rajnish — Wedding Invitation 💍
Date: 26 November 2026
Venue: Officer's Colony, Ward No. 7, Katihar, Bihar, India
With the blessings of the Anand Families!`;

  // Family-Friendly Arranged Marriage & Wedding Jokes
  const WEDDING_JOKES = [
    "Shaadi ka asli plot twist: The guest list keeps growing!",
    "The bride and groom are getting married. The photographers are getting their daily cardio.",
    "One wedding, two families, hundreds of photos, and at least one uncle asking for the Wi-Fi password.",
    "Baraat timing rule: If the card says 7:00 PM, the dhol starts tuning at 8:30 PM, and entry happens at 10:00 PM!",
    "No matter how modern the wedding is, someone's buaji is definitely supervising the paneer tikka station.",
    "Arranged marriage superpower: Memorizing 42 new cousins' names in less than 24 hours!"
  ];

  let currentJokeIndex = -1;
  let blessingsCount = 0;

  /* ==========================================================================
     2. WELCOME SCREEN / ENVELOPE CONTROLLER
     ========================================================================== */
  const welcomeScreen = document.getElementById('welcomeScreen');
  const openInvitationBtn = document.getElementById('openInvitationBtn');
  const skipWelcomeBtn = document.getElementById('skipWelcomeBtn');

  function openEnvelope() {
    if (!welcomeScreen) return;
    
    // Add visual unsealing animation class
    welcomeScreen.classList.add('unsealing');
    
    // Launch a celebratory burst of confetti
    fireConfettiBurst();

    setTimeout(() => {
      welcomeScreen.classList.add('opened');
      document.body.style.overflow = 'auto';
    }, 600);
  }

  if (openInvitationBtn) {
    openInvitationBtn.addEventListener('click', openEnvelope);
  }

  if (skipWelcomeBtn) {
    skipWelcomeBtn.addEventListener('click', () => {
      if (!welcomeScreen) return;
      welcomeScreen.classList.add('opened');
      document.body.style.overflow = 'auto';
    });
  }

  /* ==========================================================================
     3. MOBILE NAVIGATION MENU CONTROLLER
     ========================================================================== */
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navList.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     4. WEDDING COUNTDOWN TIMER
     ========================================================================== */
  const daysEl = document.getElementById('countDays');
  const hoursEl = document.getElementById('countHours');
  const minutesEl = document.getElementById('countMinutes');
  const secondsEl = document.getElementById('countSeconds');
  const countdownGrid = document.getElementById('countdownGrid');
  const celebrationMessage = document.getElementById('celebrationMessage');

  function updateCountdown() {
    const now = new Date().getTime();
    const target = WEDDING_DATE.getTime();
    const diff = target - now;

    if (diff <= 0) {
      // Date has arrived or passed
      if (countdownGrid) countdownGrid.classList.add('hidden');
      if (celebrationMessage) celebrationMessage.classList.remove('hidden');
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  /* ==========================================================================
     5. CUTE INTERACTIVE MOMENTS
     ========================================================================== */

  // --- Feature 1: Send Blessings ---
  const sendBlessingsBtn = document.getElementById('sendBlessingsBtn');
  const blessingCountEl = document.getElementById('blessingCount');
  const blessingsMessage = document.getElementById('blessingsMessage');

  if (sendBlessingsBtn) {
    sendBlessingsBtn.addEventListener('click', (e) => {
      blessingsCount += 1;
      if (blessingCountEl) blessingCountEl.textContent = String(blessingsCount);
      if (blessingsMessage) blessingsMessage.classList.remove('hidden');

      // Create floating heart burst animation
      createFloatingHeart(e.clientX, e.clientY);
    });
  }

  function createFloatingHeart(x, y) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart-burst';
    const heartSymbols = ['❤️', '💖', '💐', '✨', '🌸', '🙏'];
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    // Position around click coordinate or viewport center if triggered via keyboard
    const posX = x || (window.innerWidth / 2);
    const posY = y || (window.innerHeight / 2);
    
    heart.style.left = `${posX}px`;
    heart.style.top = `${posY}px`;
    
    // Random horizontal drift
    const randomShift = (Math.random() - 0.5) * 120;
    heart.style.setProperty('--tx', `${randomShift}px`);

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1200);
  }

  // --- Feature 2: Wedding Confetti Animation (Canvas Engine) ---
  const confettiBtn = document.getElementById('confettiBtn');
  if (confettiBtn) {
    confettiBtn.addEventListener('click', () => {
      fireConfettiBurst();
    });
  }

  // --- Feature 3: A Little Wedding Surprise (Jokes Rotator) ---
  const surpriseJokeBtn = document.getElementById('surpriseJokeBtn');
  const jokeDisplayBox = document.getElementById('jokeDisplayBox');
  const jokeTextEl = document.getElementById('jokeText');

  if (surpriseJokeBtn && jokeDisplayBox && jokeTextEl) {
    surpriseJokeBtn.addEventListener('click', () => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * WEDDING_JOKES.length);
      } while (nextIndex === currentJokeIndex && WEDDING_JOKES.length > 1);

      currentJokeIndex = nextIndex;
      jokeTextEl.textContent = `“${WEDDING_JOKES[currentJokeIndex]}”`;
      jokeDisplayBox.classList.remove('hidden');
    });
  }

  // --- Feature 4: Copy Wedding Details to Clipboard ---
  const copyDetailsBtn = document.getElementById('copyDetailsBtn');
  const copyToast = document.getElementById('copyToast');

  if (copyDetailsBtn) {
    copyDetailsBtn.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(WEDDING_SHARE_TEXT)
          .then(showCopyFeedback)
          .catch(() => fallbackCopy(WEDDING_SHARE_TEXT));
      } else {
        fallbackCopy(WEDDING_SHARE_TEXT);
      }
    });
  }

  function fallbackCopy(text) {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (success) {
        showCopyFeedback();
      }
    } catch (err) {
      console.warn('Copying text failed: ', err);
    }
  }

  let toastTimeout;
  function showCopyFeedback() {
    if (!copyToast) return;
    copyToast.classList.remove('hidden');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      copyToast.classList.add('hidden');
    }, 3200);
  }

  /* ==========================================================================
     6. BACK TO TOP BUTTONS
     ========================================================================== */
  const floatingTopBtn = document.getElementById('floatingTopBtn');
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleScroll() {
    if (!floatingTopBtn) return;
    if (window.scrollY > 350) {
      floatingTopBtn.classList.add('visible');
    } else {
      floatingTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (floatingTopBtn) {
    floatingTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     7. PURE VANILLA CANVAS CONFETTI ENGINE
     ========================================================================== */
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let confettiParticles = [];
  let isAnimationRunning = false;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas();

  // Color palette for confetti: Royal Gold, Deep Maroon, Dusty Rose, Marigold, Crisp White
  const CONFETTI_COLORS = [
    '#D4AF37', '#FFD700', '#7A1428', '#C97582', '#FFA500', 
    '#FF7043', '#FFFDF9', '#E0A96D', '#B8860B'
  ];

  class ConfettiPiece {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 8 + 6;
      this.color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      
      // Explosion velocities
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 4;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 5; // upward push
      
      this.gravity = 0.22;
      this.friction = 0.96;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 12;
      this.opacity = 1;
      this.fade = Math.random() * 0.015 + 0.008;
      this.isRosePetal = Math.random() > 0.65;
    }

    update() {
      this.vx *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.opacity -= this.fade;
    }

    draw(context) {
      if (this.opacity <= 0) return;
      context.save();
      context.translate(this.x, this.y);
      context.rotate((this.rotation * Math.PI) / 180);
      context.globalAlpha = Math.max(0, this.opacity);
      context.fillStyle = this.color;

      if (this.isRosePetal) {
        // Draw cute petal shape
        context.beginPath();
        context.ellipse(0, 0, this.size * 0.6, this.size, Math.PI / 4, 0, Math.PI * 2);
        context.fill();
      } else {
        // Draw confetti rectangle
        context.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      }

      context.restore();
    }
  }

  function fireConfettiBurst() {
    if (!canvas || !ctx) return;
    
    // Create bursts from 2 focal points
    const origin1 = { x: window.innerWidth * 0.35, y: window.innerHeight * 0.45 };
    const origin2 = { x: window.innerWidth * 0.65, y: window.innerHeight * 0.45 };

    for (let i = 0; i < 60; i++) {
      confettiParticles.push(new ConfettiPiece(origin1.x, origin1.y));
      confettiParticles.push(new ConfettiPiece(origin2.x, origin2.y));
    }

    if (!isAnimationRunning) {
      isAnimationRunning = true;
      requestAnimationFrame(renderConfetti);
    }
  }

  function renderConfetti() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.update();
      p.draw(ctx);

      if (p.opacity <= 0 || p.y > canvas.height + 20) {
        confettiParticles.splice(i, 1);
      }
    }

    if (confettiParticles.length > 0) {
      requestAnimationFrame(renderConfetti);
    } else {
      isAnimationRunning = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
});
