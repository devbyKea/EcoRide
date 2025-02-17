document.addEventListener("DOMContentLoaded", () => {
    const dropdownMenu = document.getElementById("profile-dropdown-menu");
    const profileButton = document.getElementById("profile-button");
    const user = JSON.parse(localStorage.getItem("user")); // Vérifie si un utilisateur est connecté

    // Mise à jour du contenu du menu en fonction de l'état de connexion
    function updateDropdownMenu() {
        if (user) {
            dropdownMenu.innerHTML = `
                <a href="profil.html">Modifier le profil</a>
                <a href="#" id="logout">Déconnexion</a>
            `;

            // Gérer la déconnexion
            document.getElementById("logout").addEventListener("click", (event) => {
                event.preventDefault();
                localStorage.removeItem("user"); // Supprime l'utilisateur du localStorage
                window.location.href = "login.html"; // Redirige vers la connexion
            });
        } else {
            dropdownMenu.innerHTML = `
                <a href="login.html">Connexion</a>
                <a href="inscription.html">Inscription</a>
            `;
        }
    }

    // Mettre à jour le menu au chargement de la page
    updateDropdownMenu();

    // Gérer l'affichage du menu au clic
    profileButton.addEventListener("click", () => {
        dropdownMenu.classList.toggle("visible"); // Ajoute/enlève la classe "visible"
    });

    // Cacher le menu si on clique en dehors
    document.addEventListener("click", (event) => {
        if (!profileButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("visible");
        }
    });
});