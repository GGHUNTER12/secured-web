document.addEventListener("DOMContentLoaded", function () { 
    const body = document.body;
    const dropdown = document.getElementById('style-dropdown');
    const storedBg = localStorage.getItem("customBackground");

    // Check if user is logged in by checking localStorage for userEmail
    const userEmail = localStorage.getItem("userEmail");

    // Check if the user is signed in
    const isUserSignedIn = userEmail !== null;

    // Apply stored background if found
    if (storedBg) {
        body.style.background = storedBg;
        dropdown.value = storedBg;
    } else {
        body.classList.add("default-bg");
    }

    // Event listener for dropdown change
    dropdown.addEventListener('change', function () {
        // Check if the user is not signed in and try to change the background
        if (!isUserSignedIn) {
            alert("You need to sign in to change the background!");
            dropdown.value = ''; // Reset the dropdown if not signed in
            return; // Stop the function here if the user is not signed in
        }

        const selectedValue = dropdown.value;
        if (selectedValue) {
            body.style.background = selectedValue;
            localStorage.setItem("customBackground", selectedValue);
        } else {
            resetBackground();
        }
    });

    // Function to reset to default
    function resetBackground() {
        localStorage.removeItem("customBackground");
        body.classList.add("default-bg");
        body.style.background = "";
    }
});

window.onload = () => {
    // Check if profile data exists in localStorage
    const userPhoto = localStorage.getItem("userPhoto");

    // If there's a photo in localStorage, update the profile picture
    if (userPhoto) {
        // Set the profile picture from localStorage
        document.getElementById("menu-profile-pic").src = userPhoto;
    } else {
        // If no user data, use a default avatar image
        document.getElementById("menu-profile-pic").src = "https://www.mobile-calendar.com/img/main/user.webp";
    }
};
