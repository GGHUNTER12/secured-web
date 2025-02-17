document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const dropdown = document.getElementById('style-dropdown');
    const storedBg = localStorage.getItem("customBackground");

    // Apply stored background if found
    if (storedBg) {
        body.style.background = storedBg;
        dropdown.value = storedBg;
    } else {
        body.classList.add("default-bg");
    }

    // Event listener for dropdown change
    dropdown.addEventListener('change', function () {
        const selectedValue = dropdown.value;
        if (selectedValue) {
            body.style.background = selectedValue;
            localStorage.setItem("customBackground", selectedValue);
        } else {
            resetBackground();
        }
    });

    // Function to reset to default
    function resetBackground() {
        localStorage.removeItem("customBackground");
        body.classList.add("default-bg");
        body.style.background = "";
    }
});
