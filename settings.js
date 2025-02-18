document.addEventListener("DOMContentLoaded", function () { 
    const body = document.body;
    const dropdown = document.getElementById('style-dropdown');
    const storedBg = localStorage.getItem("customBackground");
    const storedLogoHoverColor = localStorage.getItem("logoHoverColor"); 
    const logoHoverStyle = document.createElement("style");
    document.head.appendChild(logoHoverStyle);

    // Background-to-hover color mapping
    const gradientHoverColors = {
        "linear-gradient(135deg, #ff7eb3, #ff758c)": "#ff5e62", // Pink Gradient
        "linear-gradient(135deg, #42e695, #3bb2b8)": "#3bb2b8", // Green Gradient
        "linear-gradient(135deg, #89CFF0, #A3D8F4)": "#A3D8F4", // Baby Blue Gradient
        "linear-gradient(135deg, #ff9966, #ff5e62)": "#ff5e62", // Orange Gradient
        "linear-gradient(135deg, #ffeb3b, #f44336)": "#f44336", // Sunset Gradient
        "linear-gradient(135deg, #000000, #434343)": "#434343"  // Black Gradient
    };

    // Check if user is logged in
    const userEmail = localStorage.getItem("userEmail");
    const isUserSignedIn = userEmail !== null;

    // Apply stored background if found
    if (storedBg) {
        body.style.background = storedBg;
        // Ensure dropdown value matches (only set if it exists in options)
        const validOption = [...dropdown.options].some(opt => opt.value === storedBg);
        if (validOption) dropdown.value = storedBg;

        // Apply hover color for stored background
        const hoverColor = gradientHoverColors[storedBg] || "#903aef";
        updateLogoHoverColor(hoverColor);
    } else {
        body.classList.add("default-bg");
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

            // Determine hover color
            const hoverColor = gradientHoverColors[selectedValue] || "#903aef";
            localStorage.setItem("logoHoverColor", hoverColor);
            updateLogoHoverColor(hoverColor);
        } else {
            resetBackground();
        }
    });

    // Function to update the hover color for the logo
    function updateLogoHoverColor(color) {
        logoHoverStyle.innerHTML = `
            .logo a:hover {
                color: ${color} !important;
                transition: color 0.3s ease-in-out;
            }
        `;
    }

    // Function to reset to default
    function resetBackground() {
        localStorage.removeItem("customBackground");
        localStorage.removeItem("logoHoverColor");
        body.classList.add("default-bg");
        body.style.background = "";
        updateLogoHoverColor("#903aef"); // Reset hover color to default
    }
});

window.onload = () => {
    // Check if profile data exists in localStorage
    const userPhoto = localStorage.getItem("userPhoto");

    // If there's a photo in localStorage, update the profile picture
    if (userPhoto) {
        document.getElementById("menu-profile-pic").src = userPhoto;
    } else {
        // If no user data, use a default avatar image
        document.getElementById("menu-profile-pic").src = "https://www.mobile-calendar.com/img/main/user.webp";
    }
};
