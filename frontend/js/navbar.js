
    document.addEventListener("DOMContentLoaded", () => {
        console.log("Script chargé !"); // Vérifie que le script se charge bien

        const dropdownMenu = document.getElementById("profile-dropdown-menu");
        const profileButton = document.getElementById("user-logo");
        const userData = localStorage.getItem("user");
        const user = userData ? JSON.parse(userData) : null;


        console.log("profileButton:", profileButton); // Vérifie si profileButton est bien trouvé
        console.log("dropdownMenu:", dropdownMenu); // Vérifie si dropdownMenu est bien trouvé
        console.log("User data:", user); // Vérifie le contenu de localStorage

        // Met à jour le menu en fonction de l'état de connexion
        function updateDropdownMenu() {
            if (user) {
                dropdownMenu.innerHTML = `
                    <a href="profil.html">Modifier le profil</a>
                    <a href="#" id="logout">Déconnexion</a>
                `;

                console.log("Utilisateur connecté : affichage du menu connecté");

                // Gestion de la déconnexion
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

                console.log("Utilisateur non connecté : affichage du menu invité");
            }
        }

        // Mettre à jour le menu au chargement
        updateDropdownMenu();

        // Gérer l'affichage du menu au clic
        profileButton.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("Bouton de profil cliqué !");
            dropdownMenu.classList.toggle("visible"); // Ajoute/enlève la classe "visible"
        });

        // Cacher le menu si on clique en dehors
        document.addEventListener("click", (event) => {
            if (!profileButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                console.log("Clique en dehors du menu, fermeture...");
                dropdownMenu.classList.remove("visible");
            }
        });
    });