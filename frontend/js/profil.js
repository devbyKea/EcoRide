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

            document.addEventListener("DOMContentLoaded", async () => {
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
                    document.getElementById("role").textContent = getRoleName(user.role);
                } catch (error) {
                    console.error("❌ Erreur lors du chargement du profil :", error);
                }
            
                // Gestion du mode édition
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
                        user_id: user.id,
                        pseudo: document.getElementById("pseudo").textContent,
                        email: document.getElementById("email").textContent
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
            
                // Déconnexion
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
            });
            
            // Fonction pour afficher le rôle en texte
            function getRoleName(roleId) {
                switch (roleId) {
                    case 10: return "Utilisateur";
                    case 11: return "Employé";
                    case 12: return "Administrateur";
                    default: return "Inconnu";
                }
            }
        })