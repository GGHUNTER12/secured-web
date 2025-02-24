document.addEventListener("DOMContentLoaded", function () {
    const announcementBox = document.getElementById("announcement");
    const closeButton = document.getElementById("announcement-close");

    const announcementText = "Lets go Secured V2 finally came out";

    const storedAnnouncement = localStorage.getItem("lastAnnouncement");

    if (storedAnnouncement !== announcementText) {
        localStorage.setItem("lastAnnouncement", announcementText);
        localStorage.removeItem("announcementClosed");
    }

    if (localStorage.getItem("announcementClosed") !== "true") {
        announcementBox.style.display = "flex";
    } else {
        announcementBox.style.display = "none"; 
    }

    closeButton.addEventListener("click", function () {
        closeAnnouncement();
    });
});

function closeAnnouncement() {
    document.getElementById('announcement').style.display = 'none';
    localStorage.setItem("announcementClosed", "true");
}
