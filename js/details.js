document.addEventListener("DOMContentLoaded", function () {
    // ✅ Récupérer l'ID du trajet depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const trajetId = params.get("id");

    if (!trajetId) {
        document.getElementById("trajet-details").innerHTML = "<p>Trajet non trouvé.</p>";
        return;
    }

    // ✅ Simuler une base de données locale
    const trajets = [
        {
            id: 1,
            depart: "Paris",
            arrivee: "Lyon",
            date: "2025-01-20",
            heureDepart: "10:00",
            heureArrivee: "14:00",
            chauffeur: { pseudo: "Jean Dupont", photo: "../img/profileh1.png", note: 4.8, avis: "Très ponctuel et agréable !" },
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
            chauffeur: { pseudo: "Marie Laure", photo: "../img/profilef1.png", note: 4.5, avis: "Bonne conduite, mais un peu bavarde." },
            vehicule: { marque: "Peugeot", modele: "308", energie: "Diesel ⛽" },
            preferences: ["Pas d'animaux 🚫🐶", "Silence total 🤫"],
            placesRestantes: 1,
            prix: 15,
            ecologique: false,
            duree: 150
        },
        {
            id: 3,
            depart: "Bordeaux",
            arrivee: "Toulouse",
            date: "2025-01-22",
            heureDepart: "08:30",
            heureArrivee: "11:30",
            chauffeur: { pseudo: "Paul Martin", photo: "../img/profileh2.png", note: 4.7, avis: "Trajet confortable et sécurisé." },
            vehicule: { marque: "Renault", modele: "Zoé", energie: "Électrique ⚡" },
            preferences: ["Accepte les animaux 🐱", "Musique pop 🎶"],
            placesRestantes: 3,
            prix: 20,
            ecologique: true,
            duree: 180
        }
    ];

    // ✅ Trouver le trajet correspondant
    const trajet = trajets.find(t => t.id == trajetId);

    if (!trajet) {
        document.getElementById("trajet-details").innerHTML = "<p>Trajet introuvable.</p>";
    } else {
        // ✅ Afficher les détails du trajet avec les nouvelles infos
        document.getElementById("trajet-details").innerHTML = `
            <div class="profile-container">
                <img src="${trajet.chauffeur.photo}" alt="Photo de ${trajet.chauffeur.pseudo}" class="photo-chauffeur">
                <h3>${trajet.chauffeur.pseudo} (${trajet.chauffeur.note}/5)</h3>
                <p>⭐ ${trajet.chauffeur.avis}</p>
            </div>

            <div class="details-trajet">
                <p>🚗 ${trajet.depart} → ${trajet.arrivee}</p>
                <p>📅 ${trajet.date}</p>
                <p>🕒 ${trajet.heureDepart} → ${trajet.heureArrivee}</p>
                <p>💰 ${trajet.prix}€</p>
                <p>🪑 ${trajet.placesRestantes} places restantes</p>
                <p>${trajet.ecologique ? "🌱 Voyage écologique" : "🚗 Voyage classique"}</p>
            </div>

            <div class="vehicule-details">
                <h4>🚘 Véhicule</h4>
                <p><strong>${trajet.vehicule.marque} ${trajet.vehicule.modele}</strong> – ${trajet.vehicule.energie}</p>
            </div>

            <div class="preferences">
                <h4>🎧 Préférences du conducteur</h4>
                <ul>${trajet.preferences.map(pref => `<li>${pref}</li>`).join("")}</ul>
            </div>

            <button class="btn-reserver">Participer</button>
        `;

        // ✅ Gérer le bouton retour
        document.getElementById("retour-trajets").addEventListener("click", function () {
            window.location.href = "trajets.html";
        });
    }
});

