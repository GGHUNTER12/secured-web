document.addEventListener("DOMContentLoaded", function () { 
    const body = document.body;
    const dropdown = document.getElementById('style-dropdown');
    const storedBg = localStorage.getItem("customBackground");

    const userEmailEncoded = localStorage.getItem("userEmail");
    const isUserSignedIn = userEmailEncoded !== null;

    const decodeBase64 = (encodedData) => {
        try {
            return atob(encodedData);
        } catch (e) {
            console.error("Error decoding base64 data:", e);
            return null;
        }
    };

    const userEmail = userEmailEncoded ? decodeBase64(userEmailEncoded) : null;
    const userNameEncoded = localStorage.getItem("userName");
    const userName = userNameEncoded ? decodeBase64(userNameEncoded) : null;
    const userPhotoEncoded = localStorage.getItem("userPhoto");
    const userPhoto = userPhotoEncoded ? decodeBase64(userPhotoEncoded) : "https://www.mobile-calendar.com/img/main/user.webp";

    const profilePicElement = document.getElementById("menu-profile-pic");
    if (profilePicElement) {
        profilePicElement.src = userPhoto;
    }

    const profileNameElement = document.getElementById("profile-name");
    const profileEmailElement = document.getElementById("profile-email");

    if (profileNameElement && profileEmailElement) {
        profileNameElement.innerText = userName || "Unknown User";
        profileEmailElement.innerText = userEmail || "No Email";
    }

    if (storedBg) {
        body.style.background = storedBg;
        dropdown.value = storedBg;
    } else {
        body.classList.add("default-bg");
    }

    dropdown.addEventListener('change', function () {
        if (!isUserSignedIn) {
            alert("You need to sign in to change the background!");
            dropdown.value = storedBg || ""; 
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
        dropdown.value = ""; 
    }

    const getCookies = () => {
        return document.cookie.split("; ").filter(cookie => cookie.trim() !== "");
    };

    const originalCookies = getCookies();

    const resetCookies = () => {
        document.cookie.split("; ").forEach(cookie => {
            const [cookieName] = cookie.split("=");
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        });

        originalCookies.forEach(cookie => {
            document.cookie = cookie;
        });
    };

    const monitorCookies = () => {
        const currentCookies = getCookies();

        if (currentCookies.length !== originalCookies.length || !currentCookies.every((cookie, i) => cookie === originalCookies[i])) {
            console.warn("Cookies were modified! Resetting...");
            resetCookies();
        }
    };

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
