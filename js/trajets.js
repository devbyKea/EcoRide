// Gestion de la recherche de trajets
document.getElementById('rechercher-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton

    // Exemple de données fictives de trajets disponibles
    const trajets = [
        { depart: "Paris", arrivee: "Lyon", date: "2025-01-20", heure: "10:00" },
        { depart: "Marseille", arrivee: "Nice", date: "2025-01-21", heure: "14:00" },
    ];

    // Récupère les valeurs saisies par l'utilisateur
    const villeDepart = document.querySelector('input[name="depart"]').value.trim();
    const villeArrivee = document.querySelector('input[name="arrivee"]').value.trim();
    const dateSelectionnee = document.querySelector('input[name="date"]').value.trim();

    // Filtrer les trajets en fonction des critères
    const trajetsFiltres = trajets.filter(trajet => 
        trajet.depart.toLowerCase() === villeDepart.toLowerCase() &&
        trajet.arrivee.toLowerCase() === villeArrivee.toLowerCase() &&
        trajet.date === dateSelectionnee
    );

    // Sélection des sections pour afficher les résultats
    const sectionTrajets = document.getElementById('trajets-disponibles');
    const sectionAucunTrajet = document.getElementById('aucun-trajet');
    const listeTrajets = document.getElementById('liste-trajets');

    // Réinitialise les résultats précédents
    listeTrajets.innerHTML = '';

    if (trajetsFiltres.length > 0) {
        // Affiche les trajets disponibles
        trajetsFiltres.forEach(trajet => {
            const listItem = document.createElement('li');
            listItem.textContent = `De ${trajet.depart} à ${trajet.arrivee} - ${trajet.date} à ${trajet.heure}`;
            listeTrajets.appendChild(listItem);
        });
        sectionTrajets.style.display = 'block';
        sectionAucunTrajet.style.display = 'none';
    } else {
        // Affiche le message "Aucun trajet disponible"
        sectionTrajets.style.display = 'none';
        sectionAucunTrajet.style.display = 'block';
    }
});

// Fonction pour récupérer les paramètres de l'URL
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        depart: params.get('depart'),
        arrivee: params.get('arrivee'),
        date: params.get('date'),
    };
}

// Charger les trajets au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const { depart, arrivee, date } = getURLParams();

    if (depart && arrivee && date) {
        // Simuler la recherche avec les paramètres
        rechercherTrajets(depart, arrivee, date);
    }
});

// Fonction pour afficher les trajets disponibles ou un message d'erreur
function rechercherTrajets(depart, arrivee, date) {
    const trajets = [
        { depart: "Paris", arrivee: "Lyon", date: "2025-01-20", heure: "10:00" },
        { depart: "Marseille", arrivee: "Nice", date: "2025-01-21", heure: "14:00" },
    ];

    // Filtrer les trajets en fonction des critères
    const trajetsFiltres = trajets.filter(trajet =>
        trajet.depart.toLowerCase() === depart.toLowerCase() &&
        trajet.arrivee.toLowerCase() === arrivee.toLowerCase() &&
        trajet.date === date
    );

    const sectionTrajets = document.getElementById('trajets-disponibles');
    const sectionAucunTrajet = document.getElementById('aucun-trajet');
    const listeTrajets = document.getElementById('liste-trajets');

    // Réinitialise les résultats précédents
    listeTrajets.innerHTML = '';

    if (trajetsFiltres.length > 0) {
        // Affiche les trajets disponibles
        trajetsFiltres.forEach(trajet => {
            const listItem = document.createElement('li');
            listItem.textContent = `De ${trajet.depart} à ${trajet.arrivee} - ${trajet.date} à ${trajet.heure}`;
            listeTrajets.appendChild(listItem);
        });
        sectionTrajets.style.display = 'block';
        sectionAucunTrajet.style.display = 'none';
    } else {
        // Affiche le message "Aucun trajet disponible"
        sectionTrajets.style.display = 'none';
        sectionAucunTrajet.style.display = 'block';
    }
}
