

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

document.addEventListener("DOMContentLoaded", function () {
  console.log("Le script est chargé !");

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
});

document.getElementById('rechercher-index').addEventListener('click', function (event) {
  event.preventDefault(); // Empêche le comportement par défaut

  // Récupérer les valeurs saisies par l'utilisateur
  const villeDepart = document.querySelector('input[name="depart"]').value.trim();
  const villeArrivee = document.querySelector('input[name="arrivee"]').value.trim();
  const dateSelectionnee = document.querySelector('input[name="date"]').value.trim();

  // Vérifier que tous les champs sont remplis
  if (!villeDepart || !villeArrivee || !dateSelectionnee) {
      alert('Veuillez remplir tous les champs avant de rechercher.');
      return;
  }

  // Rediriger vers trajets.html avec les valeurs dans l'URL
  const url = `trajets.html?depart=${encodeURIComponent(villeDepart)}&arrivee=${encodeURIComponent(villeArrivee)}&date=${encodeURIComponent(dateSelectionnee)}`;
  window.location.href = url;
});



