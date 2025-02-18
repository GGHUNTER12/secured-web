document.addEventListener("DOMContentLoaded", function () { 
    const body = document.body;
    const dropdown = document.getElementById('style-dropdown');
    const storedBg = localStorage.getItem("customBackground");
    const storedHoverColor = localStorage.getItem("logoHoverColor");

    const userEmail = localStorage.getItem("userEmail");
    const isUserSignedIn = userEmail !== null;

    if (storedBg) {
        body.style.background = storedBg;
        const validOption = [...dropdown.options].some(opt => opt.value === storedBg);
        if (validOption) dropdown.value = storedBg;
    } else {
        body.classList.add("default-bg");
    }

    if (storedHoverColor) {
        document.documentElement.style.setProperty("--logo-hover-color", storedHoverColor);
    }

    dropdown.addEventListener('change', function () {
        if (!isUserSignedIn) {
            alert("You need to sign in to change the background!");
            dropdown.value = ''; 
            return;
        }

        const selectedValue = dropdown.value;
        if (selectedValue) {
            body.style.background = selectedValue;
            localStorage.setItem("customBackground", selectedValue);

            let hoverColor = "#903aef"; // Default hover color

            if (selectedValue === "linear-gradient(135deg, #42e695, #3bb2b8)") {
                hoverColor = "#42e695"; // Solid color for Green Gradient
            } else {
                const match = selectedValue.match(/#([0-9a-fA-F]{6})/);
                if (match) {
                    hoverColor = match[0]; // Extract the first color in the gradient
                }
            }

            localStorage.setItem("logoHoverColor", hoverColor);
            document.documentElement.style.setProperty("--logo-hover-color", hoverColor);
        } else {
            resetBackground();
        }
    });

    function resetBackground() {
        localStorage.removeItem("customBackground");
        localStorage.removeItem("logoHoverColor");
        body.classList.add("default-bg");
        body.style.background = "";
        document.documentElement.style.setProperty("--logo-hover-color", "#903aef");
    }
});

window.onload = () => {
    const userPhoto = localStorage.getItem("userPhoto");
    document.getElementById("menu-profile-pic").src = userPhoto || "https://www.mobile-calendar.com/img/main/user.webp";
};
