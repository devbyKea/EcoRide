document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script profil.js chargé !");

    // 🎯 GESTION DU MENU UTILISATEUR
    const userLogo = document.getElementById("user-logo");
    const dropdownMenu = document.getElementById("profile-dropdown-menu");

    if (userLogo && dropdownMenu) {
        userLogo.addEventListener("click", (event) => {
            event.preventDefault(); // Empêche le comportement par défaut du lien
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
        });

        // Fermer le menu si on clique ailleurs
        document.addEventListener("click", (event) => {
            if (!userLogo.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = "none";
            }
        });
    }

    // 🎯 GESTION DU MENU HAMBURGER
    const menuBtn = document.querySelector(".menu-btn");
    const dropdownNav = document.querySelector(".dropdown-menu");

    if (menuBtn && dropdownNav) {
        menuBtn.addEventListener("click", () => {
            dropdownNav.style.display = dropdownNav.style.display === "block" ? "none" : "block";
        });

        dropdownNav.addEventListener("mouseleave", () => {
            dropdownNav.style.display = "none";
        });
    }

    // 🎯 ANIMATION DU BOUTON HAMBURGER
    const hamburger = document.querySelector(".hamburger");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
        });
    }

    // 🔍 Vérification de l'utilisateur connecté
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Vous devez être connecté !");
        window.location.href = "login.html"; // Redirection vers la page de connexion
    } else {
        document.getElementById("user-email").textContent = user.email;

        // 🎯 Modifier le menu déroulant pour afficher "Modifier le profil" et "Déconnexion"
        dropdownMenu.innerHTML = `
            <a href="profil.html">Modifier le profil</a>
            <a href="#" id="logout">Déconnexion</a>
        `;

        // 🔓 Gestion du bouton Déconnexion
        document.getElementById("logout").addEventListener("click", (event) => {
            event.preventDefault();
            localStorage.removeItem("user");
            window.location.href = "login.html"; // Redirection après déconnexion
        });
    }

    // ✏️ Gestion de la modification du profil
    const editBtn = document.getElementById("edit-btn");
    const saveBtn = document.getElementById("save-btn");
    const inputs = document.querySelectorAll(".profil-card input, .profil-card select");

    editBtn.addEventListener("click", () => {
        inputs.forEach(input => input.disabled = false);
        editBtn.style.display = "none";
        saveBtn.style.display = "inline-block";
    });

    saveBtn.addEventListener("click", () => {
        inputs.forEach(input => input.disabled = true);
        editBtn.style.display = "inline-block";
        saveBtn.style.display = "none";

        // 🔽 Envoi des données au serveur
        updateUserProfile();
    });

    // 🚗 Gestion des options Chauffeur / Passager
    const roleSelect = document.getElementById("role");
    const chauffeurSection = document.getElementById("chauffeur-section");
    const addVehicleBtn = document.getElementById("ajouter-vehicule");
    const vehiclesContainer = document.getElementById("vehicules-container");

    if (roleSelect) {
        roleSelect.addEventListener("change", () => {
            chauffeurSection.style.display = roleSelect.value.includes("chauffeur") ? "block" : "none";
        });
    }

    // ➕ Ajouter un véhicule
    if (addVehicleBtn) {
        addVehicleBtn.addEventListener("click", () => {
            const vehicleHTML = `
                <div class="vehicule">
                    <label>Marque :</label>
                    <input type="text" class="vehicule-marque">
                    
                    <label>Modèle :</label>
                    <input type="text" class="vehicule-modele">
                    
                    <label>Couleur :</label>
                    <input type="text" class="vehicule-couleur">
                    
                    <label>Places disponibles :</label>
                    <input type="number" min="1" class="vehicule-places">
                </div>
            `;
            vehiclesContainer.insertAdjacentHTML("beforeend", vehicleHTML);
        });
    }

    // 🔄 Charger les infos du profil depuis l'API
    loadUserProfile();
});

// 🖥️ Fonction de chargement des données utilisateur
function loadUserProfile() {
    const apiUrl = "https://ecoride-production-f991.up.railway.app/api/profil.php";

    fetch(apiUrl, { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Erreur API :", data.error);
                return;
            }

            document.getElementById("email").value = data.email;
            document.getElementById("nom").value = data.nom;
            document.getElementById("telephone").value = data.telephone;
            document.getElementById("role").value = data.role;

            if (data.role.includes("chauffeur")) {
                document.getElementById("chauffeur-section").style.display = "block";
                document.getElementById("plaque").value = data.plaque || "";
                document.getElementById("date-immatriculation").value = data.immatriculation || "";
                document.getElementById("marque").value = data.marque || "";
                document.getElementById("modele").value = data.modele || "";
                document.getElementById("couleur").value = data.couleur || "";
                document.getElementById("places").value = data.places || 0;
            }
        })
        .catch(error => console.error("Erreur API :", error));
}

// 📤 Fonction d'envoi des modifications au serveur
function updateUserProfile() {
    const apiUrl = "https://ecoride-production-f991.up.railway.app/api/profil.php";

    const userData = {
        nom: document.getElementById("nom").value,
        email: document.getElementById("email").value,
        telephone: document.getElementById("telephone").value,
        role: document.getElementById("role").value,
        plaque: document.getElementById("plaque").value,
        immatriculation: document.getElementById("date-immatriculation").value,
        marque: document.getElementById("marque").value,
        modele: document.getElementById("modele").value,
        couleur: document.getElementById("couleur").value,
        places: document.getElementById("places").value
    };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include"
    })
        .then(response => response.json())
        .then(data => {
            alert(data.success || "Erreur lors de la sauvegarde");
        })
        .catch(error => console.error("Erreur API :", error));
}
