document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const logoLink = document.querySelector('.logo a');
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
        body.classList.remove("default-bg");

        let dynamicColor;
        if (isGradient(bgValue)) {
            dynamicColor = extractColorFromGradient(bgValue);
        } else {
            dynamicColor = bgValue;
        }

        document.documentElement.style.setProperty("--dynamic-color", dynamicColor);
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
    };
});
