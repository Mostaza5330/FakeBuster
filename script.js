// Espera a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function() {
  // Mejorar el contraste y la legibilidad
  const improveLegibility = function() {
    // Agregar un overlay gradiente al hero para mejorar el contraste del texto
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.classList.add('hero-enhanced');
    }
    
    // Mejorar tarjetas y planes para mejor contraste
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.classList.add('card-enhanced');
    });
    
    // Asegurar que los planes tienen buen contraste
    const plans = document.querySelectorAll('.plan');
    plans.forEach(plan => {
      plan.classList.add('plan-enhanced');
    });
  };

  // Configuración para animaciones de aparición
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.card, .plan, section h2');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animate-in');
      }
    });
  };

  // Agregar clase para animaciones de entrada
  const setupAnimations = function() {
    const elementsToAnimate = document.querySelectorAll('.card, .plan, section h2');
    elementsToAnimate.forEach(element => {
      element.classList.add('animate-element');
    });
  };
  
  // Configurar efecto sutil para la sección hero (menos distractivo)
  const enhanceHeroSection = function() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Efecto sutil de iluminación en lugar de parallax
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const opacity = Math.max(0.7, 1 - (scrollPosition / 500));
      heroSection.style.boxShadow = `inset 0 0 ${scrollPosition/10}px rgba(255,255,255,${opacity})`;
    });
  };

  // Agregar efecto hover a los planes con mejor contraste
  const setupPlanHoverEffects = function() {
    const plans = document.querySelectorAll('.plan');
    plans.forEach(plan => {
      plan.addEventListener('mouseenter', function() {
        this.classList.add('plan-hover');
      });
      
      plan.addEventListener('mouseleave', function() {
        this.classList.remove('plan-hover');
      });
    });
  };

  // Agregar contador de estadísticas
  const setupCounters = function() {
    const infoItems = document.querySelectorAll('.info-list li strong');
    
    infoItems.forEach(item => {
      const text = item.textContent;
      const percentageMatch = text.match(/(\d+)%/);
      
      if (percentageMatch) {
        const targetValue = parseInt(percentageMatch[1]);
        const originalText = text.replace(/\d+%/, '');
        
        let currentValue = 0;
        const duration = 2000;
        const interval = 20;
        const increment = targetValue / (duration / interval);
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                  currentValue = targetValue;
                  clearInterval(counter);
                }
                item.textContent = `${originalText}${Math.round(currentValue)}%`;
                // Resaltar el número para mejor visibilidad
                item.classList.add('highlighted-stat');
              }, interval);
              observer.unobserve(item);
            }
          });
        });
        
        observer.observe(item);
      }
    });
  };

  // Smooth scroll para enlaces internos con mejor marcado visual
  const setupSmoothScroll = function() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetID);

        if (targetElement) {
          // Agregar mejor señalización visual
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Resaltar claramente la sección de destino
          setTimeout(() => {
            targetElement.classList.add('highlight-section');
            // Agregar un indicador visual temporal
            const indicator = document.createElement('div');
            indicator.className = 'section-indicator';
            targetElement.prepend(indicator);
            
            setTimeout(() => {
              targetElement.classList.remove('highlight-section');
              indicator.remove();
            }, 1500);
          }, 500);
        }
      });
    });
  };

  // Agregar botón "Volver arriba" con mejor contraste
  const setupScrollToTopButton = function() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.title = 'Volver arriba';
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  // Animación del logo al cargar la página
  const animateLogo = function() {
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.classList.add('logo-animation');
      // Añadir borde para mejorar visibilidad
      logo.classList.add('logo-enhanced');
    }
  };

  // Mejorar los testimonios con un carrusel simple y mejor legibilidad
  const setupTestimonialCarousel = function() {
    const testimonialSection = document.getElementById('testimonios');
    if (!testimonialSection) return;
    
    const testimonials = testimonialSection.querySelectorAll('.card');
    if (testimonials.length <= 1) return;
    
    // Mejorar visibilidad de testimonios
    testimonials.forEach(t => {
      t.classList.add('testimonial-enhanced');
    });
    
    // Añadir controles de navegación con mejor contraste
    const navControls = document.createElement('div');
    navControls.className = 'testimonial-nav';
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'testimonial-btn prev';
    prevBtn.innerHTML = '&lt;';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'testimonial-btn next';
    nextBtn.innerHTML = '&gt;';
    
    navControls.appendChild(prevBtn);
    navControls.appendChild(nextBtn);
    testimonialSection.appendChild(navControls);
    
    // Ocultar todos los testimonios excepto el primero
    let currentIndex = 0;
    testimonials.forEach((t, index) => {
      if (index !== 0) {
        t.style.display = 'none';
      }
    });
    
    // Función para cambiar testimonios con transición mejorada
    const changeTestimonial = (direction) => {
      testimonials[currentIndex].style.display = 'none';
      testimonials[currentIndex].classList.remove('active-testimonial');
      
      if (direction === 'next') {
        currentIndex = (currentIndex + 1) % testimonials.length;
      } else {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      }
      
      testimonials[currentIndex].style.display = 'block';
      setTimeout(() => {
        testimonials[currentIndex].classList.add('active-testimonial');
      }, 10);
    };
    
    prevBtn.addEventListener('click', () => changeTestimonial('prev'));
    nextBtn.addEventListener('click', () => changeTestimonial('next'));
    
    // Auto-rotación de testimonios
    let autoRotate = setInterval(() => changeTestimonial('next'), 5000);
    
    navControls.addEventListener('mouseenter', () => {
      clearInterval(autoRotate);
    });
    
    navControls.addEventListener('mouseleave', () => {
      autoRotate = setInterval(() => changeTestimonial('next'), 5000);
    });
  };

  // Efecto de tipo máquina de escribir mejorado para visibilidad
  const typewriterEffect = function() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    const highlightText = heroTitle.querySelector('.highlight-text');
    if (!highlightText) return;
    
    // Añadir un contenedor para mejorar la visibilidad
    const originalText = highlightText.textContent;
    highlightText.innerHTML = '<span class="typewriter-text"></span>';
    const typewriterSpan = highlightText.querySelector('.typewriter-text');
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < originalText.length) {
        typewriterSpan.textContent += originalText.charAt(i);
        i++;
      } else {
        clearInterval(typing);
        highlightText.classList.add('typewriter-complete');
      }
    }, 100);
  };

  // Mejorar la visibilidad de las secciones importantes
  const enhanceSectionVisibility = function() {
    const sectionTitles = document.querySelectorAll('section h2');
    sectionTitles.forEach(title => {
      title.classList.add('title-enhanced');
    });
    
    // Destacar precios y características importantes
    const prices = document.querySelectorAll('.plan .price');
    prices.forEach(price => {
      price.classList.add('price-enhanced');
    });
  };

  // Inicializar todas las funciones
  improveLegibility(); // Primero mejoramos la legibilidad
  setupAnimations();
  animateOnScroll();
  setupSmoothScroll();
  setupPlanHoverEffects();
  setupCounters();
  setupScrollToTopButton();
  enhanceHeroSection(); // Reemplazado parallax por efecto más sutil
  animateLogo();
  setupTestimonialCarousel();
  typewriterEffect();
  enhanceSectionVisibility();
  
  // Ejecutar animateOnScroll en cada scroll
  window.addEventListener('scroll', animateOnScroll);
});

// Agregar estilos dinámicos mejorados para mejor contraste y legibilidad
const addDynamicStyles = function() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Mejoras de legibilidad */
    .card-enhanced {
      background-color: #ffffff !important; /* Fondo blanco para mejor contraste */
      box-shadow: 0 12px 30px rgba(0,0,0,0.1) !important;
      color: var(--color-text) !important;
    }
    
    .card-enhanced p {
      color: var(--color-text) !important;
    }
    
    .plan-enhanced {
      background-color: #ffffff !important;
      box-shadow: 0 12px 30px rgba(0,0,0,0.1) !important;
    }
    
    .hero-enhanced {
      position: relative;
    }
    
    .hero-enhanced:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(21, 38, 62, 0.8), rgba(21, 38, 62, 0.95));
      z-index: 0;
    }
    
    .hero-enhanced .hero-content {
      position: relative;
      z-index: 1;
    }
    
    /* Títulos mejorados */
    .title-enhanced {
      position: relative;
      padding-bottom: 15px;
      color: var(--color-primary);
    }
    
    .title-enhanced:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background-color: var(--color-highlight);
    }
    
    /* Precios destacados para mejor visibilidad */
    .price-enhanced {
      position: relative;
      display: inline-block;
      padding: 8px 16px;
      background-color: var(--color-highlight);
      border-radius: 8px;
      color: var(--color-primary) !important;
      font-weight: 500 !important;
    }
    
    /* Resaltado para estadísticas */
    .highlighted-stat {
      color: var(--color-primary);
      font-weight: 600;
      background-color: var(--color-highlight);
      padding: 2px 6px;
      border-radius: 4px;
    }
    
    /* Animación elementos al hacer scroll */
    .animate-element {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Botón volver arriba mejorado */
    .scroll-top-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--color-primary);
      color: #ffffff;
      border: 2px solid var(--color-highlight);
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s, transform 0.3s;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    
    .scroll-top-btn.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .scroll-top-btn:hover {
      background-color: var(--color-highlight);
      color: var(--color-primary);
    }
    
    /* Animación del logo mejorada */
    .logo-animation {
      animation: pulse 2s ease-in-out;
    }
    
    .logo-enhanced {
      padding: 5px 15px;
      border-radius: 8px;
      background-color: var(--color-primary);
      border: 2px solid var(--color-highlight);
      box-shadow: 0 0 15px rgba(255, 201, 71, 0.3);
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    /* Efectos para los planes con mejor contraste */
    .plan-hover {
      transform: translateY(-10px);
      border: 2px solid var(--color-highlight);
    }
    
    /* Sección destacada al navegar */
    .highlight-section {
      animation: highlightBg 1.5s ease;
      position: relative;
    }
    
    .section-indicator {
      position: absolute;
      left: 0;
      top: 0;
      width: 5px;
      height: 100%;
      background-color: var(--color-highlight);
      animation: indicatorPulse 1.5s ease;
    }
    
    @keyframes indicatorPulse {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }
    
    @keyframes highlightBg {
      0% { background-color: #ffffff; }
      50% { background-color: rgba(255, 201, 71, 0.2); }
      100% { background-color: #ffffff; }
    }
    
    /* Controles del carrusel de testimonios mejorados */
    .testimonial-nav {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
    }
    
    .testimonial-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--color-primary);
      color: white;
      border: 2px solid var(--color-highlight);
      font-size: 18px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    
    .testimonial-btn:hover {
      background-color: var(--color-highlight);
      color: var(--color-primary);
    }
    
    .testimonial-enhanced {
      background-color: #ffffff !important;
      border-left: 4px solid var(--color-highlight);
      box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
    }
    
    .active-testimonial {
      animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    /* Efecto typewriter mejorado */
    .typewriter-text {
      border-right: 3px solid var(--color-highlight);
      padding-right: 5px;
      animation: blink 0.7s step-end infinite;
    }
    
    .typewriter-complete {
      text-shadow: 0 0 10px rgba(255, 201, 71, 0.5);
    }
    
    @keyframes blink {
      from, to { border-color: transparent; }
      50% { border-color: var(--color-highlight); }
    }
    
    /* Estilos adicionales para la lista de información */
    .info-list li {
      background-color: #ffffff;
      padding: 10px 15px 10px 25px;
      border-radius: 8px;
      margin-bottom: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
      border-left: 3px solid var(--color-highlight);
    }
    
    .info-list li:before {
      color: var(--color-primary);
      font-weight: bold;
    }
  `;
  
  document.head.appendChild(styleElement);
};

// Ejecutar añadir estilos dinámicos después de cargar el DOM
document.addEventListener('DOMContentLoaded', addDynamicStyles);