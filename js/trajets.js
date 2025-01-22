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

    // Récupérer les valeurs saisies par l'utilisateur
    const villeDepart = document.querySelector('input[name="depart"]').value.trim();
    const villeArrivee = document.querySelector('input[name="arrivee"]').value.trim();
    const dateSelectionnee = document.querySelector('input[name="date"]').value.trim();

    // Vérifier que tous les champs sont remplis
    if (!villeDepart || !villeArrivee || !dateSelectionnee) {
        alert('Veuillez remplir tous les champs obligatoires.');
        loader.style.display = 'none'; // Masquer le loader en cas d'erreur
        return;
    }

    // Mettre à jour le résumé de la recherche
    const searchSummary = document.getElementById('search-summary').querySelector('h2');
    searchSummary.textContent = `Résultats pour : ${villeDepart} → ${villeArrivee}`;

    setTimeout(() => {
        // Filtrer les trajets en fonction des critères (ville, date, et places restantes)
        const trajetsFiltres = trajets.filter(trajet =>
            trajet.depart.toLowerCase() === villeDepart.toLowerCase() &&
            trajet.arrivee.toLowerCase() === villeArrivee.toLowerCase() &&
            trajet.date === dateSelectionnee &&
            trajet.placesRestantes > 0
        );

        const sectionTrajets = document.getElementById('trajets-disponibles');
        const sectionAucunTrajet = document.getElementById('aucun-trajet');
        const listeTrajets = document.getElementById('liste-trajets');

        // Réinitialiser les résultats précédents
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
            // Affiche le message "Aucun trajet disponible" et les trajets fictifs
            sectionTrajets.style.display = 'block';
            sectionAucunTrajet.style.display = 'none';

            const messageItem = document.createElement('li');
            messageItem.className = 'aucun-trajet';
            messageItem.innerHTML = '<p>Aucun trajet n’est disponible aux dates sélectionnées.</p>';
            listeTrajets.appendChild(messageItem);

           // Ajouter le titre "Suggestions :" avant les trajets fictifs
           const suggestionsTitle = document.createElement('h3');
           suggestionsTitle.textContent = 'Suggestions :';
           suggestionsTitle.className = 'suggestions-title';
           listeTrajets.appendChild(suggestionsTitle);

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

