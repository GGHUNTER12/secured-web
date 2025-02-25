document.addEventListener("DOMContentLoaded", function () { 
    const body = document.body;
    const dropdown = document.getElementById('style-dropdown');
    const storedBg = localStorage.getItem("customBackground");
    const logo = document.querySelector(".logo");
    const toggleLogoCheckbox = document.getElementById("toggle-logo");

    // Load the saved state for the logo
    const isLogoHidden = localStorage.getItem("logoHidden") === "true";
    if (toggleLogoCheckbox) {
        toggleLogoCheckbox.checked = isLogoHidden;
    }
    if (logo) {
        logo.style.display = isLogoHidden ? "none" : "block";
    }

    window.toggleLogo = function () {
        const shouldHide = toggleLogoCheckbox.checked;
        localStorage.setItem("logoHidden", shouldHide);
        if (logo) {
            logo.style.display = shouldHide ? "none" : "block";
        }
    };

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
});

window.onload = () => {
    const userPhotoEncoded = localStorage.getItem("userPhoto");
    const decodedUserPhoto = decodeBase64(userPhotoEncoded) || "https://www.mobile-calendar.com/img/main/user.webp";
    
    const profilePicElement = document.getElementById("menu-profile-pic");
    if (profilePicElement) {
        profilePicElement.src = decodedUserPhoto;
    }
};
