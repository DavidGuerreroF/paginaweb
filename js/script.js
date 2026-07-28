// Animaciones al hacer scroll para otras secciones
const animatedElements = document.querySelectorAll('.fade-up, .fade-in');

// Eliminamos del hero para que cargue instantáneo
const filteredElements = Array.from(animatedElements).filter(el => !el.closest('.hero'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

filteredElements.forEach(el => observer.observe(el));

// ===== SIDEBAR NAVIGATION =====
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  // Toggle sidebar
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  // Cerrar sidebar al hacer click en un link
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Si no es un link externo, cierra el sidebar
      if (!link.href.includes('http') && !link.href.includes('.html')) {
        sidebar.classList.remove('active');
      }
      // Actualizar active state
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Auto-hide sidebar cuando el mouse se aleja
  let sidebarTimeout;
  document.addEventListener('mousemove', (e) => {
    if (sidebar.classList.contains('active')) {
      clearTimeout(sidebarTimeout);

      // Si el mouse está fuera del sidebar por más de 3 segundos, lo cierra
      if (e.clientX > 280) {
        sidebarTimeout = setTimeout(() => {
          sidebar.classList.remove('active');
        }, 3000);
      }
    }
  });

  // Cerrar sidebar si hace click fuera de él
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('active') && 
        !sidebar.contains(e.target) && 
        !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  });
});

// ===== CHATBOT SIMPLE DAVCODE SOLUTIONS =====
document.addEventListener("DOMContentLoaded", () => {
  const openChat = document.getElementById("openChat");
  const closeChat = document.getElementById("closeChat");
  const chatBox = document.getElementById("chatbot");
  const chatBody = document.getElementById("chatBody");

  openChat.addEventListener("click", () => {
    chatBox.style.display = "block";
    openChat.style.display = "none";
  });

  closeChat.addEventListener("click", () => {
    chatBox.style.display = "none";
    openChat.style.display = "block";
  });

  const respuestas = {
    "¿Por qué comprar con DavCode Solutions?": "Porque ofrecemos soluciones personalizadas, soporte continuo y desarrollos modernos adaptados a tu negocio a bajo costo.",
    "¿Cuánto tarda un desarrollo?": "Depende del tipo de proyecto. Un desarrollo web promedio puede tardar entre 2 y 6 semanas.",
    "¿Qué tipos de software hacen?": "Desarrollamos sistemas de gestión, inventarios, tiendas online, aplicaciones web y más.",
    "¿Puedo solicitar una demo?": "¡Claro! Escríbenos por WhatsApp o en la sección de contacto y te mostraremos una demo en vivo del software que estes interesado. 📱"
  };

  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pregunta = btn.textContent;
      const respuesta = respuestas[pregunta];

      // Mostrar la pregunta
      const userMsg = document.createElement("p");
      userMsg.classList.add("user-text");
      userMsg.textContent = pregunta;
      chatBody.appendChild(userMsg);

      // Mostrar la respuesta del bot
      setTimeout(() => {
        const botMsg = document.createElement("p");
        botMsg.classList.add("bot-text");
        botMsg.textContent = respuesta;
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 500);

      // Deshabilitar el botón después de hacer click
      btn.disabled = true;
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    });
  });
});
