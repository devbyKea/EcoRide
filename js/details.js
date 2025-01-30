document.addEventListener("DOMContentLoaded", function () {
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

    // Afficher les détails
    document.getElementById("trajet-details").innerHTML = `
        <h2>${trajet.depart} → ${trajet.arrivee}</h2>
        <p>Date : ${trajet.date}</p>
        <p>Prix : ${trajet.prix}€</p>
        <p>Note du chauffeur : ${trajet.chauffeur.note}/5</p>
    `;
});
