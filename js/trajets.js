document.getElementById('rechercher-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton

    // Afficher le loader
    const loader = document.getElementById('loading-indicator');
    loader.style.display = 'block';

    // Exemple de données fictives de trajets disponibles
    const trajets = [
        {
            depart: "Paris",
            arrivee: "Lyon",
            date: "2025-01-20",
            heureDepart: "10:00",
            heureArrivee: "14:00",
            chauffeur: { pseudo: "Jean Dupont", photo: "../img/profileh1.png", note: 4.8 },
            placesRestantes: 2,
            prix: 25,
            ecologique: true,
        },
        {
            depart: "Marseille",
            arrivee: "Nice",
            date: "2025-01-21",
            heureDepart: "09:00",
            heureArrivee: "11:30",
            chauffeur: { pseudo: "Marie Laure", photo: "../img/profilef1.png", note: 4.5 },
            placesRestantes: 1,
            prix: 15,
            ecologique: false,
        },
        {
            depart: "Bordeaux",
            arrivee: "Toulouse",
            date: "2025-01-22",
            heureDepart: null,
            heureArrivee: null,
            chauffeur: { pseudo: "Paul Martin", photo: "../img/profileh2.png", note: 4.7 },
            placesRestantes: 3,
            prix: 20,
            ecologique: true,
        },
    ];
    

    // Récupère les valeurs saisies par l'utilisateur
    const villeDepart = document.querySelector('input[name="depart"]').value.trim();
    const villeArrivee = document.querySelector('input[name="arrivee"]').value.trim();
    const dateSelectionnee = document.querySelector('input[name="date"]').value.trim();

    setTimeout(() => {
        // Filtrer les trajets en fonction des critères (ville, date, et places restantes)
        const trajetsFiltres = trajets.filter(trajet =>
            (villeDepart ? trajet.depart.toLowerCase() === villeDepart.toLowerCase() : true) &&
            (villeArrivee ? trajet.arrivee.toLowerCase() === villeArrivee.toLowerCase() : true) &&
            (dateSelectionnee ? trajet.date === dateSelectionnee : true) &&
            trajet.placesRestantes > 0
        );

        const sectionTrajets = document.getElementById('trajets-disponibles');
        const sectionAucunTrajet = document.getElementById('aucun-trajet');
        const listeTrajets = document.getElementById('liste-trajets');

        // Réinitialise les résultats précédents
        listeTrajets.innerHTML = '';

        if (trajetsFiltres.length > 0) {
            // Affiche les trajets disponibles
            sectionTrajets.style.display = 'block';
            sectionAucunTrajet.style.display = 'none';

            trajetsFiltres.forEach(trajet => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <div class="trajet">
                        <div class="profile-container">
                            <h4>${trajet.chauffeur.pseudo} (${trajet.chauffeur.note}/5)</h4>
                            <img src="${trajet.chauffeur.photo}" alt="Photo de ${trajet.chauffeur.pseudo}" class="photo-chauffeur">
                        </div>
                        <div class="details-trajet">
                            <p>${trajet.placesRestantes} place(s) restante(s) - ${trajet.prix}€</p>
                            <p>${formatDate(trajet.date)}</p>
                            ${trajet.heureDepart ? `<p>Départ à ${trajet.heureDepart}</p>` : ""}
                            ${trajet.heureArrivee ? `<p>Arrivée à ${trajet.heureArrivee}</p>` : ""}
                            <p>${trajet.ecologique ? "Voyage écologique 🌱" : "Voyage classique 🚗"}</p>
                            <div class="btn-container">
                                <button class="btn-detail">Détail</button>
                            </div>
                        </div>
                    </div>
                `;
                listeTrajets.appendChild(listItem);
            });
            
        } else {
            // Affiche tous les trajets fictifs si aucun filtre n'est défini
            sectionTrajets.style.display = 'block';
            sectionAucunTrajet.style.display = 'none';

            trajets.forEach(trajet => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <div class="trajet">
                        <img src="${trajet.chauffeur.photo}" alt="Photo de ${trajet.chauffeur.pseudo}" class="photo-chauffeur">
                        <div class="details-trajet">
                            <h4>${trajet.chauffeur.pseudo} (${trajet.chauffeur.note}/5)</h4>
                            <p>${trajet.placesRestantes} place(s) restante(s) - ${trajet.prix}€</p>
                            <p>${formatDate(trajet.date)}</p>
                            ${trajet.heureDepart ? `<p>Départ à ${trajet.heureDepart}</p>` : ""}
                            ${trajet.heureArrivee ? `<p>Arrivée à ${trajet.heureArrivee}</p>` : ""}
                            <p>${trajet.ecologique ? "Voyage écologique 🌱" : "Voyage classique 🚗"}</p>
                            <button class="btn-detail">Détail</button>
                        </div>
                    </div>
                `;
                listeTrajets.appendChild(listItem);
            });
        }

        // Masquer le loader après chargement
        loader.style.display = 'none';

        // Défilement automatique vers la section des résultats
        sectionTrajets.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }, 2000); // Simule un délai de chargement
});

// Fonction pour formater les dates en français
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
}
