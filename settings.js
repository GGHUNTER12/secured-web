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

    // Favicon and Title Handling
    const savedFavicon = localStorage.getItem('favicon') || '';
    const savedTitle = localStorage.getItem('pageTitle') || '';

    if (savedFavicon) {
        document.getElementById('favicon').href = savedFavicon;
    } else {
        document.getElementById('favicon').href = '';  // Default no favicon
    }

    if (savedTitle) {
        document.title = savedTitle;
    } else {
        document.title = '';  // Default no title
    }

    // Favicon Dropdown Handling
    const faviconDropdown = document.getElementById('favicon-dropdown');

    // Set the default selected values in the dropdown based on saved settings
    if (savedFavicon === 'images/googlefavicon.ico') {
        faviconDropdown.value = 'images/googlefavicon.ico|Google - Secured V2';
    } else if (savedFavicon === 'images/secured-favicon.png') {
        faviconDropdown.value = 'images/secured-favicon.png|Secured V2 - Settings';
    } else {
        faviconDropdown.value = ''; // Default empty value
    }

    // Change Favicon and Title from Dropdown
    faviconDropdown.addEventListener('change', function () {
        const selectedOption = faviconDropdown.value;
        if (selectedOption) {
            const [favicon, title] = selectedOption.split('|');
            const faviconLink = document.getElementById("favicon");
            faviconLink.href = favicon;
            document.title = title;

            // Save to localStorage
            localStorage.setItem('favicon', favicon);
            localStorage.setItem('pageTitle', title);
        } else {
            // No favicon or title selected
            const faviconLink = document.getElementById("favicon");
            faviconLink.href = '';  // No favicon
            document.title = '';  // Empty title

            // Remove saved favicon and title from localStorage
            localStorage.removeItem('favicon');
            localStorage.removeItem('pageTitle');
        }
    });
});

window.onload = () => {
    const userPhotoEncoded = localStorage.getItem("userPhoto");
    const decodedUserPhoto = decodeBase64(userPhotoEncoded) || "https://www.mobile-calendar.com/img/main/user.webp";
    
    const profilePicElement = document.getElementById("menu-profile-pic");
    if (profilePicElement) {
        profilePicElement.src = decodedUserPhoto;
    }
};
