/* ===================================================
   Davora Tecnologies — script.js
   =================================================== */

/* ===== NAVBAR SHRINK ON SCROLL ===== */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });


/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links a');
const sideLinks  = document.querySelectorAll('.sidebar-link');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(a => {
        a.classList.toggle('active-link', a.getAttribute('href') === `#${id}`);
      });
      sideLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink(); // run once on load


/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


/* ===== STAT COUNTER ANIMATION ===== */
const statNumbers = document.querySelectorAll('.stat-number[data-count]');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el    = entry.target;
    const end   = parseInt(el.dataset.count, 10);
    const dur   = 1600; // ms
    const step  = Math.ceil(end / (dur / 16));
    let current = 0;

    const tick = () => {
      current = Math.min(current + step, end);
      el.textContent = current;
      if (current < end) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => countObserver.observe(el));


/* ===== SIDEBAR ===== */
document.addEventListener('DOMContentLoaded', () => {
  const sidebar       = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  let   sidebarTimer;

  if (!sidebar || !sidebarToggle) return;

  // Toggle open/close
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  // Close when clicking a sidebar link
  sideLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (
      sidebar.classList.contains('active') &&
      !sidebar.contains(e.target) &&
      !sidebarToggle.contains(e.target)
    ) {
      sidebar.classList.remove('active');
    }
  });

  // Auto-hide after 3 s when mouse moves away
  document.addEventListener('mousemove', (e) => {
    if (!sidebar.classList.contains('active')) return;
    clearTimeout(sidebarTimer);
    if (e.clientX > 270) {
      sidebarTimer = setTimeout(() => sidebar.classList.remove('active'), 3000);
    }
  }, { passive: true });
});


/* ===== CHATBOT ===== */
document.addEventListener('DOMContentLoaded', () => {
  const openBtn  = document.getElementById('openChat');
  const closeBtn = document.getElementById('closeChat');
  const chatBox  = document.getElementById('chatbot');
  const chatBody = document.getElementById('chatBody');

  if (!openBtn || !closeBtn || !chatBox) return;

  openBtn.addEventListener('click', () => {
    chatBox.style.display = 'block';
    chatBox.setAttribute('aria-hidden', 'false');
    openBtn.style.display = 'none';
    chatBody.scrollTop = chatBody.scrollHeight;
  });

  closeBtn.addEventListener('click', () => {
    chatBox.style.display = 'none';
    chatBox.setAttribute('aria-hidden', 'true');
    openBtn.style.display = 'flex';
  });

  const responses = {
    '¿Por qué comprar con Davora Software?':
      'Porque ofrecemos soluciones personalizadas, soporte continuo y desarrollos modernos adaptados a tu negocio a bajo costo.',
    '¿Cuánto tarda un desarrollo?':
      'Depende del tipo de proyecto. Un desarrollo web promedio puede tardar entre 2 y 6 semanas.',
    '¿Qué tipos de software hacen?':
      'Desarrollamos sistemas de gestión, inventarios, tiendas online, aplicaciones web y más.',
    '¿Puedo solicitar una demo?':
      '¡Claro! Escríbenos por WhatsApp o en la sección de contacto y te mostraremos una demo en vivo del software que te interese. 📱'
  };

  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.textContent.trim();
      const answer   = responses[question];
      if (!answer) return;

      // User bubble
      appendMessage(chatBody, question, 'user-text');

      // Disable button
      btn.disabled = true;

      // Bot reply with slight delay
      setTimeout(() => {
        appendMessage(chatBody, answer, 'bot-text');
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 480);
    });
  });
});

function appendMessage(container, text, className) {
  const p = document.createElement('p');
  p.className = className;
  p.textContent = text;
  container.appendChild(p);
  container.scrollTop = container.scrollHeight;
}
