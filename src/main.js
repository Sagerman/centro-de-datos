import './style.css'; 
import Reveal from 'reveal.js';
import gsap from 'gsap';

// CONFIGURACIÓN CLAVE PARA EVITAR CORTE DE TEXTO
Reveal.initialize({
  controls: true,
  progress: true,
  center: false, // Desactivado para que el contenido fluya desde arriba
  hash: true,
  transition: 'slide', 
  backgroundTransition: 'fade',
  keyboard: true,
  // Estas configuraciones evitan que Reveal aplaste el diseño responsivo
  width: "100%",
  height: "100%",
  margin: 0,
  minScale: 1,
  maxScale: 1
});

// --- LÓGICA DE LA SECUENCIA DE ARRANQUE ---
const btnEncender = document.getElementById('btn-encender');
const leds = document.querySelectorAll('.led-estado');
const servidor = document.getElementById('servidor-rack');

if(btnEncender) {
  btnEncender.addEventListener('click', () => {
    if(btnEncender.classList.contains('activado')) return;
    btnEncender.classList.add('activado');

    btnEncender.innerText = "SINCORNIZANDO DB...";
    btnEncender.style.borderColor = "#dcd3ff"; 
    btnEncender.style.color = "#dcd3ff";

    const tl = gsap.timeline();

    tl.to(leds, { opacity: 0.2, duration: 0.2, stagger: 0.1 })
      .call(() => {
        leds.forEach(led => {
          led.classList.remove('rojo');
          led.classList.add('verde');
        });
      })
      .to(leds, { opacity: 1, duration: 0.15, stagger: 0.15 }) 
      .to(servidor, { x: 8, duration: 0.05, yoyo: true, repeat: 7 }) 
      .to(servidor, {
        boxShadow: "0 15px 60px rgba(168, 230, 207, 0.5)",
        borderColor: "rgba(168, 230, 207, 0.8)",
        duration: 0.5
      })
      .call(() => {
        btnEncender.innerText = "TIER IV ONLINE";
        btnEncender.style.background = "#a8e6cf";
        btnEncender.style.color = "#090a0f";
        btnEncender.style.boxShadow = "0 0 30px rgba(168, 230, 207, 0.8)";
        btnEncender.style.borderColor = "#a8e6cf";
        btnEncender.style.fontWeight = "bold";
      });
  });
}

// --- ANIMACIONES DINÁMICAS AL CAMBIAR DE DIAPOSITIVA ---
Reveal.on('slidechanged', event => {
  const currentSlide = event.currentSlide;
  
  const boxes = currentSlide.querySelectorAll('.box-animada');
  if (boxes.length > 0) {
    gsap.fromTo(boxes, 
      { y: 60, opacity: 0, rotationX: 10 }, 
      { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.15, ease: "back.out(1.2)" }
    );
  }

  const listItems = currentSlide.querySelectorAll('.item-animado');
  if (listItems.length > 0) {
    gsap.fromTo(listItems,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out" }
    );
  }

  const titles = currentSlide.querySelectorAll('.neon-title');
  if(titles.length > 0){
    gsap.fromTo(titles,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }
    );
  }
});