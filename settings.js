document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const title = document.querySelector(".title"); // Updated to target .title
    const storedBg = localStorage.getItem("customBackground");

    function applyStyles(bgValue) {
        body.style.background = bgValue;
        document.documentElement.style.setProperty("--dynamic-color", bgValue);
        body.classList.remove("default-bg");

        // Adjust the glow color based on background
        updateTitleGlow(bgValue);
    }

    function updateTitleGlow(bgValue) {
        if (!title) return; // If title doesn't exist, don't do anything

        let glowColor = "#ffffff"; // Default glow color
        if (bgValue.startsWith("#")) {
            glowColor = bgValue; // Use the same color if it's a hex
        } else if (bgValue.includes("rgb")) {
            glowColor = bgValue; // Use the same color if it's RGB
        }

        document.documentElement.style.setProperty("--title-glow", glowColor);
    }

    // Apply stored background if found
    if (storedBg) {
        applyStyles(storedBg);
    } else {
        body.classList.add("default-bg");
    }

    // Function to change the background
    window.setBackground = function (bgValue) {
        applyStyles(bgValue);
        localStorage.setItem("customBackground", bgValue);
    };

    // Function to reset to default
    window.resetBackground = function () {
        localStorage.removeItem("customBackground");
        body.classList.add("default-bg");
        body.style.background = "";
        document.documentElement.style.removeProperty("--dynamic-color");
        document.documentElement.style.removeProperty("--title-glow");
    };
});
