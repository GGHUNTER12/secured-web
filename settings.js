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

    // Function to reset cookies to a default value
    function resetCookies() {
        const cookies = document.cookie.split(";");

        cookies.forEach(cookie => {
            const cookieName = cookie.split("=")[0].trim();
            // Set each cookie with a past expiration date to remove it
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        });
    }

    // Call resetCookies to reset on page load
    resetCookies();
});

window.onload = () => {
    const userPhoto = localStorage.getItem("userPhoto");
    document.getElementById("menu-profile-pic").src = userPhoto || "https://www.mobile-calendar.com/img/main/user.webp";
};
