document.addEventListener("DOMContentLoaded", async () => {
    console.log("✅ Script profil.js chargé !");

    // GESTION DU MENU HAMBURGER
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

    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        window.location.href = "login.html"; // Redirige si non connecté
        return;
    }

    console.log("🔍 Chargement du profil pour :", user);

    // Charger les données utilisateur
    try {
        const response = await fetch(`https://ecoride-production.up.railway.app/api/verify_session.php?user_id=${user.id}`);
        const data = await response.json();

        if (data.status === "error") {
            console.warn("⚠️ Session invalide :", data.message);
            localStorage.removeItem("user");
            window.location.href = "login.html";
            return;
        }

        console.log("✅ Profil utilisateur :", data);

        document.getElementById("pseudo").textContent = data.user.pseudo || "";
        document.getElementById("email").textContent = data.user.email || "";
        document.getElementById("role").value = data.user.role || "passager"; // Sélectionne le rôle stocké

        afficherChampsSupplementaires(data.user.role); // Vérifie si la section doit être affichée

    } catch (error) {
        console.error("❌ Erreur lors du chargement du profil :", error);
    }

    // Gestion du changement de rôle
    const roleSelect = document.getElementById("role");
    if (roleSelect) {
        roleSelect.addEventListener("change", (event) => {
            const selectedRole = event.target.value;
            console.log("🔄 Changement de rôle sélectionné :", selectedRole);
            afficherChampsSupplementaires(selectedRole);
        });
    }

    // Fonction pour afficher/cacher la section chauffeur
    function afficherChampsSupplementaires(role) {
        const chauffeurSection = document.getElementById("chauffeur-section");
        if (!chauffeurSection) return; // Vérifie si l'élément est trouvé dans le DOM

        console.log("🚗 Rôle détecté :", role);

        if (role === "chauffeur" || role === "chauffeur_passager") {
            console.log("✅ Affichage des champs chauffeur");
            chauffeurSection.style.display = "block";
        } else {
            console.log("❌ Masquer les champs chauffeur");
            chauffeurSection.style.display = "none";
        }
    }

    // GESTION DU MODE ÉDITION
    const editButton = document.getElementById("edit-btn");
    const saveButton = document.getElementById("save-btn");

    if (editButton && saveButton) {
        editButton.addEventListener("click", () => {
            console.log("🛠 Mode édition activé");
            document.querySelectorAll("input, select").forEach(input => input.disabled = false);
            saveButton.style.display = "block";
            editButton.style.display = "none";
        });

        saveButton.addEventListener("click", async () => {
            console.log("📤 Sauvegarde demandée !");

            const data = {
                user_id: user.id,
                pseudo: document.getElementById("pseudo").textContent,
                email: document.getElementById("email").textContent,
                role: document.getElementById("role").value,
                plaque: document.getElementById("plaque")?.value || "",
                date_immatriculation: document.getElementById("date-immatriculation")?.value || "",
                fumeur: document.getElementById("fumeur")?.checked ? 1 : 0,
                animaux: document.getElementById("animaux")?.checked ? 1 : 0,
                preferences: document.getElementById("custom-preferences")?.value || "",
                vehicules: getVehicules()
            };

            console.log("📤 Données envoyées :", data);

            try {
                const response = await fetch("https://ecoride-production.up.railway.app/api/updateUserProfile.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                console.log("✅ Réponse du serveur :", result);

                if (result.status === "success") {
                    alert("Profil mis à jour !");
                    document.querySelectorAll("input, select").forEach(input => input.disabled = true);
                    saveButton.style.display = "none";
                    editButton.style.display = "block";
                } else {
                    alert("❌ Erreur : " + result.message);
                }
            } catch (error) {
                console.error("❌ Erreur de mise à jour :", error);
                alert("Une erreur est survenue !");
            }
        });
    }

    // GESTION DE LA DÉCONNEXION
    const logoutButton = document.getElementById("logout-btn");
    if (logoutButton) {
        logoutButton.addEventListener("click", async () => {
            try {
                const response = await fetch("https://ecoride-production.up.railway.app/api/logout.php", {
                    method: "POST"
                });

                const result = await response.json();
                console.log("✅ Déconnexion :", result);

                if (result.status === "success") {
                    alert("Déconnexion réussie !");
                    localStorage.removeItem("user");
                    window.location.href = "index.html";
                } else {
                    alert("❌ Erreur lors de la déconnexion !");
                }
            } catch (error) {
                console.error("❌ Erreur de déconnexion :", error);
                alert("Une erreur est survenue !");
            }
        });
    }

    // Ajouter dynamiquement un véhicule
    document.getElementById("ajouter-vehicule").addEventListener("click", () => {
        const container = document.getElementById("vehicules-container");

        const newVehicule = document.createElement("div");
        newVehicule.classList.add("vehicule");
        newVehicule.innerHTML = `
            <label>Marque :</label>
            <input type="text" class="vehicule-marque">
            
            <label>Modèle :</label>
            <input type="text" class="vehicule-modele">

            <label>Couleur :</label>
            <input type="text" class="vehicule-couleur">

            <label>Places disponibles :</label>
            <input type="number" min="1" class="vehicule-places">
            
            <button class="supprimer-vehicule">Supprimer</button>
        `;

        container.appendChild(newVehicule);

        // Gestion de la suppression de véhicules
        newVehicule.querySelector(".supprimer-vehicule").addEventListener("click", () => {
            newVehicule.remove();
        });
    });

    // Fonction pour récupérer les véhicules
    function getVehicules() {
        const vehicules = [];
        document.querySelectorAll(".vehicule").forEach(vehicule => {
            vehicules.push({
                marque: vehicule.querySelector(".vehicule-marque").value,
                modele: vehicule.querySelector(".vehicule-modele").value,
                couleur: vehicule.querySelector(".vehicule-couleur").value,
                places: vehicule.querySelector(".vehicule-places").value
            });
        });
        return vehicules;
    }
});
