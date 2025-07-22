// Simuler un utilisateur par défaut
let utilisateur = {
    estConnecte: false,  // false = visiteur, true = utilisateur connecté
    credit: 30, // Crédit en euros
    id: null, // ID utilisateur (null si visiteur)
    nom: null // Nom de l'utilisateur
};

// Fonction pour récupérer l'utilisateur en session depuis PHP
async function getUtilisateurSession() {
    try {
        const response = await fetch("session.php");
        if (!response.ok) throw new Error("Erreur serveur");
        return await response.json();
    } catch (error) {
        console.warn("⚠ Impossible de récupérer la session PHP, utilisation des données simulées.");
        return utilisateur; // Si échec, utiliser la simulation
    }
}

// Charger les infos utilisateur et afficher le trajet
document.addEventListener("DOMContentLoaded", async function () {
    utilisateur = await getUtilisateurSession(); // 🔹 Récupère soit PHP, soit simulation

    // Récupérer l'ID du trajet depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const trajetId = params.get("id");

    if (!trajetId) {
        document.getElementById("trajet-details").innerHTML = "<p>Trajet non trouvé.</p>";
        return;
    }

    // Simuler une base de données locale
    const trajets = [
        {
            id: 1,
            depart: "Paris",
            arrivee: "Lyon",
            date: "2025-01-20",
            heureDepart: "10:00",
            heureArrivee: "14:00",
            chauffeur: { pseudo: "Jean Dupont", photo: "../img/profileh1.png", note: 4.8 },
            vehicule: { marque: "Tesla", modele: "Model 3", energie: "Électrique ⚡" },
            preferences: ["Accepte les animaux 🐶", "Musique douce 🎵"],
            placesRestantes: 2,
            prix: 25,
            ecologique: true,
            duree: 240
        },
        {
            id: 2,
            depart: "Marseille",
            arrivee: "Nice",
            date: "2025-01-21",
            heureDepart: "09:00",
            heureArrivee: "11:30",
            chauffeur: { pseudo: "Marie Laure", photo: "../img/profilef1.png", note: 4.5 },
            vehicule: { marque: "Peugeot", modele: "308", energie: "Diesel ⛽" },
            preferences: ["Pas d'animaux 🚫🐶", "Silence total 🤫"],
            placesRestantes: 1,
            prix: 15,
            ecologique: false,
            duree: 150
        }
    ];

    // Trouver le trajet correspondant
    const trajet = trajets.find(t => t.id == trajetId);

    if (!trajet) {
        document.getElementById("trajet-details").innerHTML = "<p>Trajet introuvable.</p>";
        return;
    }

    // Vérifier si le bouton doit être actif
    let boutonParticiper = `<button class="btn-participer" id="btn-participer">Participer</button>`;

    if (trajet.placesRestantes === 0) {
        boutonParticiper = `<button class="btn-participer disabled" disabled>Complet</button>`;
    } else if (utilisateur.estConnecte && utilisateur.credit < trajet.prix) {
        boutonParticiper = `<button class="btn-participer disabled" disabled>Crédit insuffisant</button>`;
    }

    // Afficher les détails du trajet
    document.getElementById("trajet-details").innerHTML = `
        <div class="profile-container">
            <img src="${trajet.chauffeur.photo}" alt="Photo de ${trajet.chauffeur.pseudo}" class="photo-chauffeur">
            <h3>${trajet.chauffeur.pseudo} (${trajet.chauffeur.note}/5)</h3>
        </div>

        <div class="details-trajet">
            <p>🚗 ${trajet.depart} → ${trajet.arrivee}</p>
            <p>📅 ${trajet.date}</p>
            <p>🕒 ${trajet.heureDepart} → ${trajet.heureArrivee}</p>
            <p>💰 ${trajet.prix}€</p>
            <p>🪑 ${trajet.placesRestantes} places restantes</p>
        </div>

        <div class="vehicule-details">
            <h4>🚘 Véhicule</h4>
            <p><strong>${trajet.vehicule.marque} ${trajet.vehicule.modele}</strong> – ${trajet.vehicule.energie}</p>
        </div>

        <div class="preferences">
            <h4>🎧 Préférences du conducteur</h4>
            <ul>${trajet.preferences.map(pref => `<li>${pref}</li>`).join("")}</ul>
        </div>

        ${boutonParticiper}
    `;

    // Ajouter l'événement pour le bouton "Participer"
    if (trajet.placesRestantes > 0) {
        document.getElementById("btn-participer").addEventListener("click", function () {
            if (!utilisateur.estConnecte) {
                // Si l'utilisateur n'est pas connecté, rediriger vers l'inscription
                window.location.href = "inscription.html";
            } else if (utilisateur.credit >= trajet.prix) {
                // Demande de confirmation
                const confirmation1 = confirm(`Voulez-vous participer à ce trajet pour ${trajet.prix}€ ?`);
                if (confirmation1) {
                    const confirmation2 = confirm(`Votre crédit sera réduit de ${trajet.prix}€. Confirmez-vous ?`);
                    if (confirmation2) {
                        // Mise à jour des données
                        utilisateur.credit -= trajet.prix;
                        utilisateur.passagerTrajets.push(trajet);
                        trajet.placesRestantes--;

                        alert("✅ Participation confirmée ! Votre place est réservée.");

                        // Mettre à jour l'affichage des places restantes
                        document.querySelector(".details-trajet p:nth-child(5)").textContent = `🪑 ${trajet.placesRestantes} places restantes`;

                        // Désactiver le bouton après validation
                        document.getElementById("btn-participer").disabled = true;
                        document.getElementById("btn-participer").textContent = "Participation validée";
                    }
                }
            }
        });
    }
});


        // Gérer le bouton retour
        document.getElementById("retour-trajets").addEventListener("click", function () {
            window.location.href = "trajets.html";
        });
    
;

