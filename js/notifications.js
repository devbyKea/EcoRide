import API_URL from "./config.js";

async function chargerNotifications() {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const response = await fetch(`${API_URL}/notifications.php?user_id=${userId}`);
    const notifications = await response.json();

    const notificationList = document.getElementById("notifications");
    notificationList.innerHTML = "";

    if (notifications.length === 0) {
        notificationList.innerHTML = "<li>Aucune notification</li>";
    } else {
        notifications.forEach(notif => {
            const li = document.createElement("li");
            li.textContent = notif.message;
            notificationList.appendChild(li);
        });
    }
}

document.addEventListener("DOMContentLoaded", chargerNotifications);
