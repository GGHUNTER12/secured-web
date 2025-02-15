particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        move: { enable: true, speed: 3 }
    },
    interactivity: {
        events: { onhover: { enable: true, mode: "bubble" } },
        modes: { 
            bubble: { distance: 100, size: 6, opacity: 0.2, speed: 3 }
        }
    }
});
