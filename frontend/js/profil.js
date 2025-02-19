document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script profil.js chargé !");


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

    // 🎯 GESTION DU FORMULAIRE DE PROFIL
        const roleSelect = document.getElementById("role");
    
        fetch("https://ecoride-production-f991.up.railway.app/api/profil.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log("✅ Données utilisateur reçues :", data);
            
            if (data.error) {
                console.error("❌ Erreur :", data.error);
                alert("Erreur lors du chargement des données.");
                return;
            }
    
            console.log("📌 Mise à jour des champs avec :", {
                email: data.email,
                nom: data.nom,
                telephone: data.telephone,
                pseudo: data.pseudo
            });
    
            // ✅ Assurer que les champs ne sont pas null avant insertion
            document.getElementById("email").value = data.email || "";
            document.getElementById("nom").value = data.nom || "";
            document.getElementById("telephone").value = data.telephone || "";
            document.getElementById("pseudo").value = data.pseudo || "";
    
            // ✅ Supprimer l'attribut `disabled` pour s'assurer que les valeurs s'affichent
            document.getElementById("email").removeAttribute("disabled");
            document.getElementById("nom").removeAttribute("disabled");
            document.getElementById("telephone").removeAttribute("disabled");
            document.getElementById("pseudo").removeAttribute("disabled");

            console.log("🔍 email trouvé ?", document.getElementById("email"));
            console.log("🔍 nom trouvé ?", document.getElementById("nom"));
            console.log("🔍 téléphone trouvé ?", document.getElementById("telephone"));
            console.log("🔍 pseudo trouvé ?", document.getElementById("pseudo"));
            console.log("🔍 rôle trouvé ?", roleSelect);

    
            if (data.role) {
                roleSelect.value = data.role.toLowerCase().replace(" ", "_"); // Adapter au <select>
            }
        })
        .catch(error => console.error("❌ Erreur de récupération :", error));
    
        // 📝 Rendre les champs modifiables au clic sur "Modifier"
        editButton.addEventListener("click", () => {
            console.log("🛠 Mode édition activé");
            inputs.forEach(input => input.disabled = false);
            saveButton.style.display = "block";
            editButton.style.display = "none";
        });
    
        // 🚗 Afficher ou masquer les champs supplémentaires selon le rôle
        roleSelect.addEventListener("change", (event) => {
            console.log("📌 Rôle sélectionné :", event.target.value);
            afficherChampsSupplementaires(event.target.value);
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
    
        // 📤 Envoyer les modifications à l'API
        saveButton.addEventListener("click", async () => {
            const data = {
                nom: document.getElementById("nom").value,
                prenom: document.getElementById("prenom") ? document.getElementById("prenom").value : "",
                email: document.getElementById("email").value,
                telephone: document.getElementById("telephone").value,
                pseudo: document.getElementById("pseudo").value,
                role: roleSelect.value,
                vehicules: []
            };
    
            // 🚗 Si l'utilisateur est un chauffeur, on récupère ses véhicules
            if (chauffeurSection.style.display === "block") {
                console.log("📋 Collecte des données véhicules...");
                document.querySelectorAll(".vehicule").forEach((vehicule, index) => {
                    data.vehicules.push({
                        voiture_id: vehicule.dataset.voitureId || null,
                        modele: vehicule.querySelector(".vehicule-marque").value,
                        immatriculation: vehicule.querySelector(".plaque").value,
                        energie: vehicule.querySelector(".vehicule-energie").value,
                        couleur: vehicule.querySelector(".vehicule-couleur").value,
                        date_premiere_immatriculation: vehicule.querySelector(".date-immatriculation").value
                    });
                });
            }
    
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