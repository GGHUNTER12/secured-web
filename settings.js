document.addEventListener("DOMContentLoaded", function () { 
    const body = document.body;
    const dropdown = document.getElementById('style-dropdown');
    const storedBg = localStorage.getItem("customBackground");

    const userEmailEncoded = localStorage.getItem("userEmail");
    const isUserSignedIn = userEmailEncoded !== null;

    // Decode base64 safely
    const decodeBase64 = (encodedData) => {
        try {
            return atob(encodedData);
        } catch (e) {
            console.error("Error decoding base64 data:", e);
            return null;
        }
    };

    // Decode user data
    const userEmail = userEmailEncoded ? decodeBase64(userEmailEncoded) : null;
    const userNameEncoded = localStorage.getItem("userName");
    const userName = userNameEncoded ? decodeBase64(userNameEncoded) : null;
    const userPhotoEncoded = localStorage.getItem("userPhoto");
    const userPhoto = userPhotoEncoded ? decodeBase64(userPhotoEncoded) : "https://www.mobile-calendar.com/img/main/user.webp";

    // Set profile photo if available
    const profilePicElement = document.getElementById("menu-profile-pic");
    if (profilePicElement) {
        profilePicElement.src = userPhoto;
    }

    // Check if profile name and email elements exist before modifying them
    const profileNameElement = document.getElementById("profile-name");
    const profileEmailElement = document.getElementById("profile-email");

    if (profileNameElement && profileEmailElement) {
        profileNameElement.innerText = userName || "Unknown User";
        profileEmailElement.innerText = userEmail || "No Email";
    }

    // Set the background based on stored value
    if (storedBg) {
        body.style.background = storedBg;
        dropdown.value = storedBg;
    } else {
        body.classList.add("default-bg");
    }

    // Event listener for background change
    dropdown.addEventListener('change', function () {
        if (!isUserSignedIn) {
            alert("You need to sign in to change the background!");
            dropdown.value = storedBg || ""; // Reset to previous valid background
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

    // Reset background to default
    function resetBackground() {
        localStorage.removeItem("customBackground");
        body.classList.add("default-bg");
        body.style.background = "";
        dropdown.value = ""; // Ensure dropdown resets visually
    }

    // Function to reset cookies
    const resetCookies = () => {
        const cookies = document.cookie.split("; ");
        cookies.forEach(cookie => {
            const [cookieName] = cookie.split("=");
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        });
        // After clearing the cookies, restore the original cookies
        originalCookies.forEach(cookie => {
            document.cookie = cookie;
        });
    };

    // Function to monitor cookies for changes
    let originalCookies = document.cookie.split("; ");
    const monitorCookies = () => {
        const currentCookies = document.cookie.split("; ");
        
        // If cookies are different, reset them
        if (currentCookies.length !== originalCookies.length || !currentCookies.every((cookie, i) => cookie === originalCookies[i])) {
            console.warn("Cookies were modified! Resetting...");
            resetCookies();
            originalCookies = currentCookies; // Update original cookies to reflect current state
        }
    };

    // Check for cookies changes every 1 second
    setInterval(monitorCookies, 1000);
});

window.onload = () => {
    const userPhotoEncoded = localStorage.getItem("userPhoto");
    const decodedUserPhoto = userPhotoEncoded ? atob(userPhotoEncoded) : "https://www.mobile-calendar.com/img/main/user.webp";
    
    const profilePicElement = document.getElementById("menu-profile-pic");
    if (profilePicElement) {
        profilePicElement.src = decodedUserPhoto;
    }
};
