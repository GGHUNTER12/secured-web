document.addEventListener("DOMContentLoaded", function () {
    const announcementBox = document.getElementById("announcement");
    const closeButton = document.getElementById("announcement-close");

    // Set the announcement text (Change this when there's a new announcement)
    const announcementText = "test";

    // Check localStorage for the last seen announcement
    const storedAnnouncement = localStorage.getItem("lastAnnouncement");

    // If the announcement text is different from the stored one, reset visibility
    if (storedAnnouncement !== announcementText) {
        localStorage.setItem("lastAnnouncement", announcementText);
        localStorage.removeItem("announcementClosed");
    }

    // Check if the user already closed the announcement
    if (localStorage.getItem("announcementClosed") !== "true") {
        announcementBox.style.display = "flex"; // Show announcement
    } else {
        announcementBox.style.display = "none"; // Hide if previously closed
    }

    // Close button event
    closeButton.addEventListener("click", function () {
        closeAnnouncement(); // Call function to close with animation
    });
});

// Function to close announcement with a fade-out effect
function closeAnnouncement() {
    const announcementBox = document.getElementById('announcement');
    
    // Add fade-out class
    announcementBox.classList.add("announcement-hide");

    // Wait for animation, then hide completely
    setTimeout(() => {
        announcementBox.style.display = "none";
        localStorage.setItem("announcementClosed", "true");
    }, 500); // Matches the CSS transition time
}
