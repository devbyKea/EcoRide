document.addEventListener("DOMContentLoaded", () => {
    const dropdownMenu = document.getElementById("profile-dropdown-menu");
    const user = JSON.parse(localStorage.getItem("user")); // Vérifie si l'utilisateur est connecté

    if (user) {
        // L'utilisateur est connecté → Afficher "Modifier le profil" et "Déconnexion"
        dropdownMenu.innerHTML = `
            <a href="profil.html">Modifier le profil</a>
            <a href="#" id="logout">Déconnexion</a>
        `;

        // Gestion du clic sur "Déconnexion"
        document.getElementById("logout").addEventListener("click", (event) => {
            event.preventDefault();
            localStorage.removeItem("user"); // Supprime l'utilisateur du localStorage
            window.location.href = "login.html"; // Redirige vers la connexion
        });
    } else {
        // L'utilisateur **n'est pas connecté** → Afficher "Connexion" et "Inscription"
        dropdownMenu.innerHTML = `
            <a href="login.html">Connexion</a>
            <a href="inscription.html">Inscription</a>
        `;
    }
});
