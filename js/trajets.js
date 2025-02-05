import API_URL from "./config.js";

document.addEventListener('DOMContentLoaded', () => {
  const userLogo = document.getElementById('user-logo');
  const dropdownMenu = document.getElementById('profile-dropdown-menu');

  userLogo.addEventListener('click', (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    dropdownMenu.style.display =
      dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  // Fermer le menu si on clique ailleurs
  document.addEventListener('click', (event) => {
    if (!userLogo.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.style.display = 'none';
    }
  });
});

  // Fonction pour mettre en majuscule la première lettre de chaque mot
  function capitalize(input) {
    return input
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, function (letter) {
        return letter.toUpperCase();
      });
  }

  // Appliquer la capitalisation sur les champs
  const departField = document.querySelector('input[name="depart"]');
  const arriveeField = document.querySelector('input[name="arrivee"]');
  if (departField && arriveeField) {
    departField.addEventListener('input', function () {
      this.value = capitalize(this.value);
    });

    arriveeField.addEventListener('input', function () {
      this.value = capitalize(this.value);
    });
  }
  
  // Gestion du menu hamburger
  const menuBtn = document.querySelector(".menu-btn");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  if (menuBtn && dropdownMenu) {
    menuBtn.addEventListener("click", () => {
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });

    dropdownMenu.addEventListener("mouseleave", () => {
      dropdownMenu.style.display = "none";
    });
  }

  // Animation hamburger
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
    });
  }

  // Gestion du calendrier
  const calendarIcon = document.querySelector(".calendar-icon");
  const calendarDropdown = document.querySelector("#calendar-dropdown");
  const dateInput = document.querySelector(".date-input");

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  // Générateur de calendrier
  const generateCalendar = (month, year) => {
    calendarDropdown.innerHTML = ""; // Réinitialiser le contenu

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Premier jour (lundi)

    // En-tête du calendrier
    const header = document.createElement("div");
    header.className = "calendar-header";
    header.innerHTML = `
      <button id="prev-month">&lt;</button>
      <span>${new Date(year, month).toLocaleString("fr-FR", {
        month: "long",
        year: "numeric",
      })}</span>
      <button id="next-month">&gt;</button>
    `;
    calendarDropdown.appendChild(header);

    // Tableau des jours
    const table = document.createElement("table");
    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    const thead = document.createElement("thead");
    const theadRow = document.createElement("tr");
    days.forEach((day) => {
      const th = document.createElement("th");
      th.textContent = day;
      theadRow.appendChild(th);
    });
    thead.appendChild(theadRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    let row = document.createElement("tr");
    for (let i = 0; i < firstDayIndex; i++) {
      row.appendChild(document.createElement("td"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement("td");
      cell.textContent = day;
      cell.className = "calendar-day";
      cell.addEventListener("click", () => {
        const selectedDate = `${day.toString().padStart(2, "0")}/${(month + 1)
          .toString()
          .padStart(2, "0")}/${year}`;
        dateInput.value = selectedDate; // Remplir le champ
        calendarDropdown.style.display = "none"; // Masquer le calendrier
      });
      row.appendChild(cell);

      if ((firstDayIndex + day) % 7 === 0) {
        tbody.appendChild(row);
        row = document.createElement("tr");
      }
    }
    if (row.children.length > 0) {
      tbody.appendChild(row);
    }
    table.appendChild(tbody);
    calendarDropdown.appendChild(table);

    // Navigation des mois
    document.querySelector("#prev-month").addEventListener("click", (e) => {
      e.stopPropagation();
      currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
      generateCalendar(currentMonth, currentYear);
    });

    document.querySelector("#next-month").addEventListener("click", (e) => {
      e.stopPropagation();
      currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
      generateCalendar(currentMonth, currentYear);
    });
  };

  // Afficher/masquer le calendrier
  const toggleCalendar = (e) => {
    e.stopPropagation();
    if (calendarDropdown.style.display === "block") {
      calendarDropdown.style.display = "none";
    } else {
      generateCalendar(currentMonth, currentYear);
      calendarDropdown.style.display = "block";
    }
  };

  // Associer les événements
  dateInput.addEventListener("click", toggleCalendar);
  if (calendarIcon) {
    calendarIcon.addEventListener("click", toggleCalendar);
  }

  // Fermer le calendrier en cliquant à l'extérieur
  document.addEventListener("click", (e) => {
    if (
      !calendarDropdown.contains(e.target) &&
      e.target !== dateInput &&
      e.target !== calendarIcon
    ) {
      calendarDropdown.style.display = "none";
    }
  });

  // Validation du champ de date
  dateInput.addEventListener("input", () => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/; // Format JJ/MM/AAAA
    if (!regex.test(dateInput.value)) {
      dateInput.setCustomValidity("Veuillez entrer une date au format JJ/MM/AAAA.");
    } else {
      dateInput.setCustomValidity("");
    }
  });

  // ✅ Fonction pour récupérer les paramètres de l'URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
      depart: params.get("depart") || "",
      arrivee: params.get("arrivee") || "",
      date: params.get("date") || ""
  };
}

// ✅ Vérifier si on vient de la page d'accueil
window.addEventListener("DOMContentLoaded", function () {
  const params = getQueryParams();

  // Si on a des valeurs, remplir les champs et lancer la recherche
  if (params.depart && params.arrivee && params.date) {
      document.querySelector('input[name="depart"]').value = params.depart;
      document.querySelector('input[name="arrivee"]').value = params.arrivee;
      document.querySelector('input[name="date"]').value = params.date;

      // ✅ Lancer automatiquement la recherche
      rechercherTrajets(new Event("search"), false);
  }
});


// ✅ Récupérer les boutons et le formulaire des filtres
const rechercherBtn = document.getElementById('rechercher-btn');
const filtrerForm = document.getElementById('filter-form');

// ✅ Données fictives des trajets disponibles
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
    },
    {
        id: 3,
        depart: "Bordeaux",
        arrivee: "Toulouse",
        date: "2025-01-22",
        heureDepart: "08:30",
        heureArrivee: "11:30",
        chauffeur: { pseudo: "Paul Martin", photo: "../img/profileh2.png", note: 4.7 },
        placesRestantes: 3,
        prix: 20,
        ecologique: true,
        duree: 180
    }
];

// ✅ Fonction principale pour rechercher et filtrer les trajets
function rechercherTrajets(event, appliquerFiltres = false) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // ✅ Afficher le loader
    const loader = document.getElementById('loading-indicator');
    loader.style.display = 'block';

    // ✅ Récupérer les valeurs saisies
    const villeDepart = document.querySelector('input[name="depart"]').value.trim();
    const villeArrivee = document.querySelector('input[name="arrivee"]').value.trim();
    const dateSelectionnee = document.querySelector('input[name="date"]').value.trim();

    // ✅ Vérifier que tous les champs sont remplis
    if (!villeDepart || !villeArrivee || !dateSelectionnee) {
        alert('Veuillez remplir tous les champs obligatoires.');
        loader.style.display = 'none';
        return;
    }

    // ✅ Mise à jour du résumé de la recherche
    const searchSummary = document.getElementById('search-summary').querySelector('h2');
    searchSummary.textContent = `Résultats pour : ${villeDepart} → ${villeArrivee}`;

    setTimeout(() => {
        // ✅ Filtrer les trajets en fonction des critères de base
        let trajetsFiltres = trajets.filter(trajet =>
            trajet.depart.toLowerCase() === villeDepart.toLowerCase() &&
            trajet.arrivee.toLowerCase() === villeArrivee.toLowerCase() &&
            trajet.date === dateSelectionnee &&
            trajet.placesRestantes > 0
        );

        let suggestionsFiltres = [...trajets]; // Suggestions basées sur les trajets fictifs

        // ✅ Appliquer les filtres avancés si "Filtrer" est utilisé
        if (appliquerFiltres) {
            const isEco = document.getElementById("filter-eco").checked;
            const maxPrice = parseFloat(document.getElementById("filter-price").value) || Infinity;
            const maxDuration = parseFloat(document.getElementById("filter-duration").value) || Infinity;
            const minRating = parseFloat(document.getElementById("filter-rating").value) || 0;

            trajetsFiltres = trajetsFiltres.filter(trajet =>
                (!isEco || trajet.ecologique) &&
                trajet.prix <= maxPrice &&
                trajet.duree <= maxDuration &&
                trajet.chauffeur.note >= minRating
            );

            suggestionsFiltres = suggestionsFiltres.filter(trajet =>
                (!isEco || trajet.ecologique) &&
                trajet.prix <= maxPrice &&
                trajet.duree <= maxDuration &&
                trajet.chauffeur.note >= minRating
            );
        }

        // ✅ Sélection des sections HTML
        const sectionTrajets = document.getElementById('trajets-disponibles');
        const sectionAucunTrajet = document.getElementById('aucun-trajet');
        const listeTrajets = document.getElementById('liste-trajets');

        // ✅ Réinitialiser l'affichage
        listeTrajets.innerHTML = '';

        if (trajetsFiltres.length > 0) {
            sectionTrajets.style.display = 'block';
            sectionAucunTrajet.style.display = 'none';

            trajetsFiltres.forEach(trajet => {
                const listItem = document.createElement('li');
                listItem.innerHTML = formatTrajetHTML(trajet);
                listeTrajets.appendChild(listItem);
            });

        } else {
            // ✅ Aucun trajet trouvé → Afficher les suggestions filtrées
            sectionTrajets.style.display = 'block';
            sectionAucunTrajet.style.display = 'none';

            const messageItem = document.createElement('li');
            messageItem.innerHTML = '<p>Aucun trajet n’est disponible aux dates sélectionnées.</p>';
            listeTrajets.appendChild(messageItem);

            if (suggestionsFiltres.length > 0) {
                const suggestionsTitle = document.createElement('h3');
                suggestionsTitle.textContent = 'Suggestions :';
                suggestionsTitle.className = 'suggestions-title';
                listeTrajets.appendChild(suggestionsTitle);

                suggestionsFiltres.forEach(trajet => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = formatTrajetHTML(trajet);
                    listeTrajets.appendChild(listItem);
                });
            } else {
                const noSuggestion = document.createElement('li');
                noSuggestion.innerHTML = '<p>Aucune suggestion ne correspond aux filtres appliqués.</p>';
                listeTrajets.appendChild(noSuggestion);
            }
        }

        sectionTrajets.scrollIntoView({ behavior: 'smooth', block: 'start' });
        loader.style.display = 'none';

    }, 2000);
}

// ✅ Fonction pour formater l'affichage d'un trajet
function formatTrajetHTML(trajet) {
    return `
        <div class="trajet">
            <div class="profile-container">
                <img src="${trajet.chauffeur.photo}" alt="Photo de ${trajet.chauffeur.pseudo}" class="photo-chauffeur">
                <h4 class="chauffeur-nom">${trajet.chauffeur.pseudo} (${trajet.chauffeur.note}/5)</h4>
            </div>
            <div class="details-trajet">
                <p>${trajet.placesRestantes} place(s) restante(s) - ${trajet.prix}€</p>
                <p>${formatDate(trajet.date)}</p>
                ${trajet.heureDepart ? `<p>Départ à ${trajet.heureDepart}</p>` : ""}
                ${trajet.heureArrivee ? `<p>Arrivée à ${trajet.heureArrivee}</p>` : ""}
                <p>${trajet.ecologique ? "Voyage écologique 🌱" : "Voyage classique 🚗"}</p>
                <div class="btn-container">
                    <button class="btn-detail" onclick="voirDetails(${trajet.id})">Détails</button>
                </div>
            </div>
        </div>
    `;
}

// ✅ Ajouter les événements aux boutons
rechercherBtn.addEventListener('click', (event) => rechercherTrajets(event, false));
filtrerForm.addEventListener('submit', (event) => rechercherTrajets(event, true));


// ✅ Fonction pour afficher les détails du trajet
function voirDetails(id) {
    window.location.href = `details.html?id=${id}`;
}

// ✅ Fonction pour formater la date
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
}
