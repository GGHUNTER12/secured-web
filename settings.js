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

    // Function to reset modified localStorage values
    const resetLocalStorage = () => {
        console.warn("⚠️ localStorage was modified! Resetting values...");
        localStorage.setItem("userEmail", originalStorage.userEmail);
        localStorage.setItem("userName", originalStorage.userName);
        localStorage.setItem("userPhoto", originalStorage.userPhoto);
        localStorage.setItem("customBackground", originalStorage.customBackground);
    };

    // Store original localStorage values
    const originalStorage = {
        userEmail: localStorage.getItem("userEmail") || "",
        userName: localStorage.getItem("userName") || "",
        userPhoto: localStorage.getItem("userPhoto") || "",
        customBackground: localStorage.getItem("customBackground") || "",
    };

    // Function to monitor localStorage changes
    const monitorLocalStorage = () => {
        for (let key in originalStorage) {
            if (localStorage.getItem(key) !== originalStorage[key]) {
                resetLocalStorage();
                break;
            }
        }
    };

    // Check for localStorage changes every second
    setInterval(monitorLocalStorage, 1000);

    // Set profile data
    const userEmail = decodeBase64(originalStorage.userEmail);
    const userName = decodeBase64(originalStorage.userName);
    const userPhoto = decodeBase64(originalStorage.userPhoto) || "https://www.mobile-calendar.com/img/main/user.webp";

    const profilePicElement = document.getElementById("menu-profile-pic");
    if (profilePicElement) profilePicElement.src = userPhoto;

    const profileNameElement = document.getElementById("profile-name");
    const profileEmailElement = document.getElementById("profile-email");
    if (profileNameElement && profileEmailElement) {
        profileNameElement.innerText = userName || "Unknown User";
        profileEmailElement.innerText = userEmail || "No Email";
    }

    // Set background
    if (storedBg) {
        body.style.background = storedBg;
        dropdown.value = storedBg;
    } else {
        body.classList.add("default-bg");
    }

    dropdown.addEventListener("change", function () {
        if (!originalStorage.userEmail) {
            alert("You need to sign in to change the background!");
            dropdown.value = storedBg || "";
            return;
        }

        const selectedValue = dropdown.value;
        if (selectedValue) {
            body.style.background = selectedValue;
            localStorage.setItem("customBackground", selectedValue);
        } else {
            localStorage.removeItem("customBackground");
            body.classList.add("default-bg");
            body.style.background = "";
            dropdown.value = "";
        }
    });
});
