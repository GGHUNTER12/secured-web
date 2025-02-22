document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loading-screen");
    
    // Check if a custom background is stored in localStorage
    const customBg = localStorage.getItem("customBackground");
    
    if (customBg) {
        loadingScreen.style.background = customBg;
    }

    // Hide the loading screen after 1 second
    setTimeout(() => {
        loadingScreen.classList.add("hidden");
    }, 1000);
});
