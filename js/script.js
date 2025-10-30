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

// CHATBOT SIMPLE DAVCODE SOLUTIONS
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
    });
  });
});
