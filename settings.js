document.addEventListener("DOMContentLoaded", function () { 
    const body = document.body;
    const dropdown = document.getElementById('style-dropdown');
    const storedBg = localStorage.getItem("customBackground");
    const storedHoverColor = localStorage.getItem("logoHoverColor");
    const logoHoverStyle = document.createElement("style");
    document.head.appendChild(logoHoverStyle);

    // Background to hover color mapping
    const gradientHoverColors = {
        "linear-gradient(135deg, #ff7eb3, #ff758c)": "#ff758c", // Pink Gradient
        "linear-gradient(135deg, #42e695, #3bb2b8)": "#42e695", // Green Gradient
        "linear-gradient(135deg, #89CFF0, #A3D8F4)": "#89CFF0", // Baby Blue Gradient
        "linear-gradient(135deg, #ff9966, #ff5e62)": "#ff9966", // Orange Gradient
        "linear-gradient(135deg, #ffeb3b, #f44336)": "#ffeb3b", // Sunset Gradient
        "linear-gradient(135deg, #000000, #434343)": "#434343"  // Black Gradient
    };

    // Check if user is logged in by checking localStorage for userEmail
    const userEmail = localStorage.getItem("userEmail");
    const isUserSignedIn = userEmail !== null;

    // Apply stored background if found
    if (storedBg) {
        body.style.background = storedBg;
        dropdown.value = storedBg;
    } else {
        body.classList.add("default-bg");
    }

    // Apply stored hover color if found
    if (storedHoverColor) {
        updateLogoHoverColor(storedHoverColor);
    }

    // Event listener for dropdown change
    dropdown.addEventListener('change', function () {
        if (!isUserSignedIn) {
            alert("You need to sign in to change the background!");
            dropdown.value = ''; // Reset dropdown if not signed in
            return;
        }

        const selectedValue = dropdown.value;
        if (selectedValue) {
            body.style.background = selectedValue;
            localStorage.setItem("customBackground", selectedValue);
            const hoverColor = gradientHoverColors[selectedValue] || "#903aef"; // Default if not in list
            localStorage.setItem("logoHoverColor", hoverColor);
            updateLogoHoverColor(hoverColor);
        } else {
            resetBackground();
        }
    });

    // Function to update the hover color for the logo
    function updateLogoHoverColor(color) {
        logoHoverStyle.innerHTML = `.logo a:hover { color: ${color}; }`;
    }

    // Function to reset to default
    function resetBackground() {
        localStorage.removeItem("customBackground");
        localStorage.removeItem("logoHoverColor");
        body.classList.add("default-bg");
        body.style.background = "";
        updateLogoHoverColor("#903aef"); // Reset to default hover color
    }
});

window.onload = () => {
    const userPhoto = localStorage.getItem("userPhoto");
    document.getElementById("menu-profile-pic").src = userPhoto ? userPhoto : "https://www.mobile-calendar.com/img/main/user.webp";
};
