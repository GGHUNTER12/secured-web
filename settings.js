document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const dropdown = document.getElementById('style-dropdown');
    const storedBg = localStorage.getItem("customBackground");

    const userEmail = localStorage.getItem("userEmail");
    const isUserSignedIn = userEmail !== null;

    if (storedBg) {
        body.style.background = storedBg;
        dropdown.value = storedBg;
    } else {
        body.classList.add("default-bg");
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
        } else {
            resetBackground();
        }
    });

    function resetBackground() {
        localStorage.removeItem("customBackground");
        body.classList.add("default-bg");
        body.style.background = "";
    }

    // Monitor cookies and reset if modified
    let originalCookies = document.cookie;
    setInterval(() => {
        if (document.cookie !== originalCookies) {
            console.warn("Cookies were modified! Resetting...");
            document.cookie = originalCookies; // Restore original cookies
        }
    }, 1000);
});

window.onload = () => {
    const userPhoto = localStorage.getItem("userPhoto");
    document.getElementById("menu-profile-pic").src = userPhoto || "https://www.mobile-calendar.com/img/main/user.webp";
};
