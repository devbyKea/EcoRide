// Objet: Gestion de la session utilisateur
async function checkSession() {
    const sessionId = localStorage.getItem("session_id");

    if (!sessionId) {
        window.location.href = "login.html"; // Redirige si pas connecté
        return;
    }

    const response = await fetch(`https://ecoride-production-f991.up.railway.app/api/verify_session.php?session_id=${sessionId}`);
    const data = await response.json();

    if (data.error) {
        localStorage.removeItem("session_id");
        localStorage.removeItem("user");
        window.location.href = "login.html"; // Redirection en cas d'expiration
    } else {
        document.getElementById("user-email").innerText = data.user.email;
    }
}

// Vérifier la session dès le chargement de la page
checkSession();

