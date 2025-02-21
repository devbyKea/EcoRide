document.addEventListener("DOMContentLoaded", () => {
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

    // GESTION DE LA DÉCONNEXION
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", async (event) => {
            event.preventDefault();
            console.log("🔴 Déconnexion demandée...");

            try {
                const response = await fetch("https://ecoride-production-f991.up.railway.app/api/logout.php", {
                    method: "POST",
                    credentials: "include"
                });

                const result = await response.json();
                console.log("✅ Réponse du serveur :", result);

                if (result.success) {
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

    // CHARGEMENT DU PROFIL UTILISATEUR
    fetch("https://ecoride-production-f991.up.railway.app/api/getUserProfile.php", {
        method: "GET",
        credentials: "include",
        mode: "cors",
    })
    .then(response => response.json())
    .then(data => {
        console.log("✅ Profil récupéré :", data);

        if (data.error) {
            console.error("❌ Erreur :", data.error);
            alert("Erreur lors du chargement des données.");
            return;
        }

        document.getElementById("email").value = data.email || "";
        document.getElementById("nom").value = data.username || "";
        document.getElementById("telephone").value = data.phone || "";
        document.getElementById("role").value = data.role || "passager";

        afficherChampsSupplementaires(data.role);

        if (data.role === "chauffeur" || data.role === "chauffeur_passager") {
            document.getElementById("plaque").value = data.plaque || "";
            document.getElementById("date_immatriculation").value = data.date_immatriculation || "";
            document.getElementById("marque").value = data.marque || "";
            document.getElementById("modele").value = data.modele || "";
            document.getElementById("couleur").value = data.couleur || "";
            document.getElementById("places_disponibles").value = data.places_disponibles || "";
            document.getElementById("fumeur").checked = data.fumeur == 1;
            document.getElementById("animaux").checked = data.animaux == 1;
            document.getElementById("preferences").value = data.preferences || "";
        }
    })
    .catch(error => console.error("❌ Erreur de récupération :", error));

    // Gestion du changement de rôle
    const roleSelect = document.getElementById("role");
    roleSelect.addEventListener("change", () => {
        afficherChampsSupplementaires(roleSelect.value);
    });

    function afficherChampsSupplementaires(role) {
        const chauffeurSection = document.getElementById("chauffeur-section");
        if (role === "chauffeur" || role === "chauffeur_passager") {
            console.log("🚗 Affichage des champs chauffeur");
            chauffeurSection.style.display = "block";
        } else {
            console.log("🚫 Cacher les champs chauffeur");
            chauffeurSection.style.display = "none";
        }
    }

    // Mode édition
    const editButton = document.getElementById("edit-btn");
    const saveButton = document.getElementById("save-btn");

    editButton.addEventListener("click", () => {
        console.log("🛠 Mode édition activé");
        document.querySelectorAll("input, select").forEach(input => input.disabled = false);
        saveButton.style.display = "block";
        editButton.style.display = "none";
    });

    // Sauvegarde des modifications
    saveButton.addEventListener("click", async () => {
        console.log("📤 Sauvegarde demandée !");

        const data = {
            username: document.getElementById("nom").value,
            phone: document.getElementById("telephone").value,
            role: document.getElementById("role").value
        };

        if (data.role === "chauffeur" || data.role === "chauffeur_passager") {
            data.plaque = document.getElementById("plaque").value;
            data.date_immatriculation = document.getElementById("date_immatriculation").value;
            data.marque = document.getElementById("marque").value;
            data.modele = document.getElementById("modele").value;
            data.couleur = document.getElementById("couleur").value;
            data.places_disponibles = document.getElementById("places_disponibles").value;
            data.fumeur = document.getElementById("fumeur").checked ? 1 : 0;
            data.animaux = document.getElementById("animaux").checked ? 1 : 0;
            data.preferences = document.getElementById("preferences").value;
        }

        console.log("📤 Données envoyées :", data);

        try {
            const response = await fetch("https://ecoride-production-f991.up.railway.app/api/updateUserProfile.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log("✅ Réponse du serveur :", result);

            if (result.message) {
                alert("Profil mis à jour !");
                document.querySelectorAll("input, select").forEach(input => input.disabled = true);
                saveButton.style.display = "none";
                editButton.style.display = "block";
            } else {
                alert("❌ Erreur : " + result.error);
            }
        } catch (error) {
            console.error("❌ Erreur de mise à jour :", error);
            alert("Une erreur est survenue !");
        }
    });
});
