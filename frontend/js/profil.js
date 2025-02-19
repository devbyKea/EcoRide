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
    document.addEventListener("DOMContentLoaded", () => {
        console.log("✅ Script profil.js chargé !");

        // 🎯 Vérification des éléments essentiels
        const roleSelect = document.getElementById("role");
        const chauffeurSection = document.getElementById("chauffeur-section");
        const editButton = document.getElementById("edit-btn");
        const saveButton = document.getElementById("save-btn");
    
        if (!roleSelect) {
            console.error("❌ Élément 'role' introuvable !");
            return;
        }
        if (!chauffeurSection) {
            console.error("❌ Élément 'chauffeur-section' introuvable !");
            return;
        }

        if (!editButton || !saveButton) console.error("❌ Bouton Modifier ou Sauvegarder introuvable !");
    
        // 🎯 Charger les données de l'utilisateur
        fetch("https://ecoride-production-f991.up.railway.app/api/profil.php", {
            method: "GET",
            credentials: "include",
            mode: "cors",
        })
        .then(response => response.json())
        .then(data => {
            console.log("✅ Données utilisateur reçues :", data);
            if (data.error) {
                console.error("❌ Erreur :", data.error);
                alert("Erreur lors du chargement des données.");
                return;
            }
    
            // 🎯 Mise à jour des champs
            document.getElementById("email").value = data.email || "";
            document.getElementById("nom").value = data.nom || "";
            document.getElementById("telephone").value = data.telephone || "";
            document.getElementById("pseudo").value = data.pseudo || "";
            
            if (data.role) {
                roleSelect.value = data.role.toLowerCase().replace(" ", "_");
                console.log("📌 Rôle détecté :", roleSelect.value);
                afficherChampsSupplementaires(roleSelect.value);
            }
        })
        .catch(error => console.error("❌ Erreur de récupération :", error));
    
    // 🎯 Détection du changement de rôle
    roleSelect.addEventListener("change", () => {
        console.log("📌 Rôle sélectionné :", roleSelect.value);
        afficherChampsSupplementaires(roleSelect.value);
    });

    function afficherChampsSupplementaires(role) {
        if (role === "chauffeur" || role === "chauffeur_passager") {
            console.log("🚗 Affichage des champs pour les chauffeurs");
            chauffeurSection.style.display = "block";
        } else {
            console.log("🚫 Cacher les champs supplémentaires");
            chauffeurSection.style.display = "none";
        }
    }

    // Vérifier si un rôle est déjà sélectionné au chargement de la page
    afficherChampsSupplementaires(roleSelect.value);

    
        // 🎯 Mode édition
        editButton.addEventListener("click", () => {
            console.log("🛠 Mode édition activé");
            document.querySelectorAll("input, select").forEach(input => input.disabled = false);
            saveButton.style.display = "block";
            editButton.style.display = "none";
        });
    
        // 🎯 Sauvegarde des modifications
        saveButton.addEventListener("click", async () => {
            console.log("📤 Sauvegarde demandée !");
            const data = {
                nom: document.getElementById("nom").value,
                prenom: document.getElementById("prenom") ? document.getElementById("prenom").value : "",
                email: document.getElementById("email").value,
                telephone: document.getElementById("telephone").value,
                pseudo: document.getElementById("pseudo").value,
                role: roleSelect.value,
            };
    
            console.log("📤 Données envoyées :", data);
    
            try {
                const response = await fetch("https://ecoride-production-f991.up.railway.app/api/profil.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(data)
                });
    
                const result = await response.json();
                console.log("✅ Réponse du serveur :", result);
    
                if (result.success) {
                    alert("Profil mis à jour !");
                    location.reload();
                } else {
                    alert("❌ Erreur : " + result.error);
                }
            } catch (error) {
                console.error("❌ Erreur de mise à jour :", error);
                alert("Une erreur est survenue !");
            }
        });
    });
