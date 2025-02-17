document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const storedBg = localStorage.getItem("customBackground");

    function applyStyles(bgValue) {
        body.style.background = bgValue;
        document.documentElement.style.setProperty("--dynamic-color", bgValue);
        body.classList.remove("default-bg");
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
