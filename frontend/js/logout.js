document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("session_id");
    localStorage.removeItem("user");
    window.location.href = "login.html"; // Retour à la page de connexion
});
