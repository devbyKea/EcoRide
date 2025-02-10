import API_URL from "./config.js";

async function chargerProfil() {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
        alert("Utilisateur non connecté");
        window.location.href = "connexion.html";
        return;
    }

    const response = await fetch(`${API_URL}/users.php?id=${userId}`);
    const data = await response.json();

    if (data.error) {
        alert("Erreur : " + data.error);
    } else {
        document.getElementById("pseudo").textContent = data.pseudo;
        document.getElementById("email").textContent = data.email;
        document.getElementById("telephone").textContent = data.telephone;
        document.getElementById("adresse").textContent = data.adresse;
    }
}

document.addEventListener("DOMContentLoaded", chargerProfil);
