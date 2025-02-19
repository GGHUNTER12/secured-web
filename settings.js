document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const dropdown = document.getElementById('style-dropdown');
    const storedBg = localStorage.getItem("customBackground");

    const decodeBase64 = (encodedData) => {
        try {
            return atob(encodedData);
        } catch (e) {
            console.error("Error decoding base64 data:", e);
            return null;
        }
    };

    // Store original values to prevent tampering
    const originalStorage = {
        userEmail: localStorage.getItem("userEmail"),
        userName: localStorage.getItem("userName"),
        userPhoto: localStorage.getItem("userPhoto"),
        customBackground: localStorage.getItem("customBackground")
    };

    // Decode user data
    const userEmail = decodeBase64(originalStorage.userEmail) || null;
    const userName = decodeBase64(originalStorage.userName) || null;
    const userPhoto = decodeBase64(originalStorage.userPhoto) || "https://www.mobile-calendar.com/img/main/user.webp";

    // Profile Photo
    const profilePicElement = document.getElementById("menu-profile-pic");
    if (profilePicElement) {
        profilePicElement.src = userPhoto;
    }

    // Profile Name & Email
    const profileNameElement = document.getElementById("profile-name");
    const profileEmailElement = document.getElementById("profile-email");

    if (profileNameElement && profileEmailElement) {
        profileNameElement.innerText = userName || "Unknown User";
        profileEmailElement.innerText = userEmail || "No Email";
    }

    // Set Background
    if (storedBg) {
        body.style.background = storedBg;
        dropdown.value = storedBg;
    } else {
        body.classList.add("default-bg");
    }

    // Event listener for background change
    dropdown.addEventListener('change', function () {
        if (!userEmail) {
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

    // Reset background to default
    function resetBackground() {
        localStorage.removeItem("customBackground");
        body.classList.add("default-bg");
        body.style.background = "";
        dropdown.value = ""; 
    }

    // Function to monitor localStorage changes
    const monitorLocalStorage = () => {
        for (const key in originalStorage) {
            const currentValue = localStorage.getItem(key);
            if (currentValue !== originalStorage[key]) {
                console.warn(`⚠️ LocalStorage key '${key}' was modified! Resetting...`);
                localStorage.setItem(key, originalStorage[key]); // Restore original value
            }
        }
    };

    // Monitor localStorage every 1 second
    setInterval(monitorLocalStorage, 1000);
});

window.onload = () => {
    const userPhotoEncoded = localStorage.getItem("userPhoto");
    const decodedUserPhoto = userPhotoEncoded ? atob(userPhotoEncoded) : "https://www.mobile-calendar.com/img/main/user.webp";

    const profilePicElement = document.getElementById("menu-profile-pic");
    if (profilePicElement) {
        profilePicElement.src = decodedUserPhoto;
    }
};
