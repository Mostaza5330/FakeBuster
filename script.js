// script.js

// Espera a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los enlaces que apuntan a anclas (href que comienza con "#")
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
    // Agrega un evento de clic a cada enlace para el desplazamiento suave
    smoothScrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        const targetID = this.getAttribute('href').substring(1); // Obtiene el ID destino sin el "#"
        const targetElement = document.getElementById(targetID);
  
        // Si el elemento destino existe, realiza el desplazamiento suave
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  });
  