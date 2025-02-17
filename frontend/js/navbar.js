document.addEventListener("DOMContentLoaded", () => {
    console.log("Script chargé !");

    const dropdownMenu = document.getElementById("profile-dropdown-menu");
    const profileButton = document.getElementById("user-logo");

    // Vérification sécurisée de localStorage avant JSON.parse()
    let user = null;
    try {
        const userData = localStorage.getItem("user");
        user = userData && userData !== "undefined" ? JSON.parse(userData) : null;
    } catch (error) {
        console.error("Erreur de parsing JSON du localStorage:", error);
        user = null;
    }

    console.log("User data:", user);

    // Met à jour le menu en fonction de l'état de connexion
    function updateDropdownMenu() {
        if (user) {
            dropdownMenu.innerHTML = `
                <a href="profil.html">Modifier le profil</a>
                <a href="#" id="logout">Déconnexion</a>
            `;

            console.log("Utilisateur connecté : affichage du menu connecté");

            // Gérer la déconnexion
            document.getElementById("logout").addEventListener("click", (event) => {
                event.preventDefault();
                localStorage.removeItem("user");
                window.location.href = "login.html";
            });
        } else {
            dropdownMenu.innerHTML = `
                <a href="login.html">Connexion</a>
                <a href="inscription.html">Inscription</a>
            `;
            console.log("Utilisateur non connecté : affichage du menu invité");
        }
    }

    // ✅ Appel immédiat pour s'assurer que le menu est mis à jour
    updateDropdownMenu();

    // Gérer l'affichage du menu au clic
    profileButton.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Bouton de profil cliqué !");
        dropdownMenu.classList.toggle("visible");
    });

    // Cacher le menu si on clique en dehors
    document.addEventListener("click", (event) => {
        if (!profileButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            console.log("Clique en dehors du menu, fermeture...");
            dropdownMenu.classList.remove("visible");
        }
    });
});
