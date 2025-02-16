document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const storedBg = localStorage.getItem("customBackground");

    // Apply stored background if found
    if (storedBg) {
        body.style.background = storedBg;
        body.classList.remove("default-bg");
    } else {
        body.classList.add("default-bg");
    }

    // Function to change the background
    window.setBackground = function (bgValue) {
        body.style.background = bgValue;
        localStorage.setItem("customBackground", bgValue);
        body.classList.remove("default-bg");
    };

    // Function to reset to default
    window.resetBackground = function () {
        localStorage.removeItem("customBackground");
        body.classList.add("default-bg");
        body.style.background = "";
    };
});

// loading.js

window.addEventListener("load", () => {
    // Hide the loading screen and show the main content
    document.getElementById("loading-screen").classList.add("hidden");
    document.getElementById("main-content").style.display = "block";
});
