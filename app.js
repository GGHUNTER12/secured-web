// Initialize Particles.js
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
        events: { onhover: { enable: true, mode: "repulse" } },
        modes: { 
            repulse: { distance: 100, duration: 0.4 }
        }
    }
});

// Wait for window to load
window.onload = function() {
    // Hide loading screen after everything is loaded
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
};
