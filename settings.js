document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const logo = document.querySelector('.logo a');
    const storedBg = localStorage.getItem("customBackground");

    function isGradient(bgValue) {
        return bgValue.includes('gradient');
    }

    function extractColorFromGradient(gradient) {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 1);
        const pixelData = ctx.getImageData(0, 0, 1, 1).data;
        return `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
    }

    function applyStyles(bgValue) {
        body.style.background = bgValue;
        document.documentElement.style.setProperty("--dynamic-color", bgValue);
        body.classList.remove("default-bg");

        let color;
        if (isGradient(bgValue)) {
            color = extractColorFromGradient(bgValue);
        } else {
            color = bgValue;
        }

        // Update logo color
        logo.style.color = color;

        // Update text highlight color
        document.documentElement.style.setProperty("--highlight-color", color);

        // Update scrollbar colors
        document.documentElement.style.setProperty("--scrollbar-thumb-color", color);
        document.documentElement.style.setProperty("--scrollbar-track-color", '#f1f1f1'); // Adjust as needed
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
        document.documentElement.style.removeProperty("--highlight-color");
        document.documentElement.style.removeProperty("--scrollbar-thumb-color");
        document.documentElement.style.removeProperty("--scrollbar-track-color");
        logo.style.color = ''; // Reset logo color
    };
});
