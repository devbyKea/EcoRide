import API_URL from "./config.js";

document.getElementById("updateForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const userId = localStorage.getItem("user_id");
    if (!userId) {
        alert("Utilisateur non connecté");
        window.location.href = "connexion.html";
        return;
    }

    const email = document.getElementById("email").value;
    const pseudo = document.getElementById("pseudo").value;
    const telephone = document.getElementById("telephone").value;
    const adresse = document.getElementById("adresse").value;
    const password = document.getElementById("password").value;

    const bodyData = { id: userId, email, pseudo, telephone, adresse };
    if (password) bodyData.password = password;

    const response = await fetch(`${API_URL}/update_user.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
    });

    const data = await response.json();

    if (data.message) {
        alert("Profil mis à jour !");
    } else {
        alert("Erreur : " + data.error);
    }
});
