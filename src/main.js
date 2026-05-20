import './style.css';
import Reveal from 'reveal.js';
import gsap from 'gsap';

// INICIALIZACIÓN DE REVEAL.JS CON EFECTO ZOOM
Reveal.initialize({
    controls: true,
    progress: true,
    center: false,
    hash: true,
    transition: 'zoom', // La animación central para cambiar de diapositiva
    backgroundTransition: 'fade',
    // Configuraciones de resolución y escalado
    width: 1200,
    height: 720,
    margin: 0.1,
    minScale: 0.2,
    maxScale: 1.5,
    keyboard: true
});

// LÓGICA DEL BOTÓN INTERACTIVO "INITIALIZE SYSTEM"
const btn = document.getElementById('btn-encender');
const leds = document.querySelectorAll('.led-estado');

if(btn) {
    btn.addEventListener('click', () => {
        // Evitar doble clic
        if(btn.classList.contains('active')) return;
        btn.classList.add('active');
        
        btn.innerText = "SINCORNIZANDO CORE...";
        btn.style.borderColor = "#dcd3ff";
        btn.style.color = "#dcd3ff";
        
        // Animación de GSAP para la secuencia de encendido
        const tl = gsap.timeline();
        tl.to(leds, { 
            opacity: 0.2, 
            duration: 0.2, 
            stagger: 0.1, 
            onComplete: () => {
                leds.forEach(led => {
                    led.classList.remove('rojo');
                    led.classList.add('verde');
                });
            }
        })
        .to(leds, { opacity: 1, duration: 0.3, stagger: 0.2 })
        .call(() => {
            btn.innerText = "SYSTEM ONLINE";
            btn.style.background = "#a8e6cf";
            btn.style.color = "#050608";
            btn.style.boxShadow = "0 0 30px rgba(168, 230, 207, 0.8)";
            btn.style.borderColor = "#a8e6cf";
        });
    });
}