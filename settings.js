document.addEventListener("DOMContentLoaded", function () { 
    const body = document.body;
    const dropdown = document.getElementById('style-dropdown');
    const storedBg = localStorage.getItem("customBackground");

    const isBase64 = (str) => {
        try {
            return btoa(atob(str)) === str;
        } catch (e) {
            return false;
        }
    };

    const decodeBase64 = (encodedData) => {
        if (!encodedData || !isBase64(encodedData)) return null;
        try {
            return atob(encodedData);
        } catch (e) {
            console.error("Error decoding base64 data:", e);
            return null;
        }
    };

    const userEmailEncoded = localStorage.getItem("userEmail");
    const isUserSignedIn = userEmailEncoded !== null;
    const userEmail = decodeBase64(userEmailEncoded) || "No Email";

    const userNameEncoded = localStorage.getItem("userName");
    const userName = decodeBase64(userNameEncoded) || "Unknown User";

    const userPhotoEncoded = localStorage.getItem("userPhoto");
    const userPhoto = decodeBase64(userPhotoEncoded) || "https://www.mobile-calendar.com/img/main/user.webp";

    // Profile Elements
    const profilePicElement = document.getElementById("menu-profile-pic");
    if (profilePicElement) profilePicElement.src = userPhoto;

    const profileNameElement = document.getElementById("profile-name");
    const profileEmailElement = document.getElementById("profile-email");

    if (profileNameElement) profileNameElement.innerText = userName;
    if (profileEmailElement) profileEmailElement.innerText = userEmail;

    // Set Background if Available
    if (storedBg) {
        body.style.background = storedBg;
        if (dropdown) dropdown.value = storedBg;
    } else {
        body.classList.add("default-bg");
    }

    // Background Change Event
    if (dropdown) {
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
    }

    function resetBackground() {
        localStorage.removeItem("customBackground");
        body.classList.add("default-bg");
        body.style.background = "";
        if (dropdown) dropdown.value = "";
    }

    // **Cookie Protection**
    const hashString = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    };

    const getCookies = () => document.cookie.split("; ").filter(cookie => cookie.trim() !== "");

    const decodeCookies = (cookies) => {
        return cookies.map(cookie => {
            const [name, value] = cookie.split("=");
            return `${name}=${decodeBase64(value) || value}`;
        });
    };

    const originalCookies = decodeCookies(getCookies());
    let originalHash = hashString(originalCookies.join("; "));

    const resetCookies = () => {
        console.warn("Cookies were modified! Resetting...");

        document.cookie.split("; ").forEach(cookie => {
            const [cookieName] = cookie.split("=");
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        });

        originalCookies.forEach(cookie => {
            document.cookie = cookie;
        });

        originalHash = hashString(originalCookies.join("; "));
    };

    const monitorCookies = () => {
        const currentCookies = decodeCookies(getCookies());
        const currentHash = hashString(currentCookies.join("; "));

        if (currentHash !== originalHash) {
            resetCookies();
        }
    };

    setInterval(monitorCookies, 1000);
});

window.onload = () => {
    const userPhotoEncoded = localStorage.getItem("userPhoto");
    const decodedUserPhoto = decodeBase64(userPhotoEncoded) || "https://www.mobile-calendar.com/img/main/user.webp";
    
    const profilePicElement = document.getElementById("menu-profile-pic");
    if (profilePicElement) {
        profilePicElement.src = decodedUserPhoto;
    }
};
