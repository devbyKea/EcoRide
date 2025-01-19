// script.js
console.log("Le script est chargé !");

  // Gestion du menu hamburger
  const menuBtn = document.querySelector(".menu-btn");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  if (menuBtn && dropdownMenu) {
    // Ouvrir/Fermer le menu au clic
    menuBtn.addEventListener("click", () => {
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Fermer le menu si la souris quitte le menu
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

document.addEventListener("DOMContentLoaded", () => {
  const calendarIcon = document.querySelector(".calendar-icon");
  const calendarDropdown = document.querySelector("#calendar-dropdown");
  const dateInput = document.querySelector(".date-input");

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  // Générateur de calendrier
  const generateCalendar = (month, year) => {
    calendarDropdown.innerHTML = "";

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Lundi comme premier jour

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

    // Tableau du calendrier
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
        dateInput.value = selectedDate;
        calendarDropdown.style.display = "none"; // Ferme le calendrier
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

    // Ajout des événements pour les boutons de navigation
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

  // Affichage du calendrier
  calendarIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    if (calendarDropdown.style.display === "block") {
      calendarDropdown.style.display = "none";
    } else {
      generateCalendar(currentMonth, currentYear);
      calendarDropdown.style.display = "block";
    }
  });

  // Fermer le calendrier lorsqu'on clique à l'extérieur
  document.addEventListener("click", (e) => {
    if (
      !calendarDropdown.contains(e.target) &&
      e.target !== calendarIcon &&
      e.target !== dateInput
    ) {
      calendarDropdown.style.display = "none";
    }
  });

  // Permet la saisie manuelle dans le champ
  dateInput.addEventListener("input", () => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/; // Format JJ/MM/AAAA
    if (!regex.test(dateInput.value)) {
      dateInput.setCustomValidity("Veuillez entrer une date au format JJ/MM/AAAA.");
    } else {
      dateInput.setCustomValidity("");
      const [day, month, year] = dateInput.value.split("/").map(Number);
      if (
        !isNaN(day) &&
        !isNaN(month) &&
        !isNaN(year) &&
        day > 0 &&
        day <= new Date(year, month, 0).getDate() &&
        month > 0 &&
        month <= 12
      ) {
        currentMonth = month - 1;
        currentYear = year;
        generateCalendar(currentMonth, currentYear);
      } else {
        dateInput.setCustomValidity("Date invalide. Veuillez vérifier.");
      }
    }
  });
});

document.getElementById('rechercher-index').addEventListener('click', function(event) {
  event.preventDefault();

  const depart = document.querySelector('input[name="depart"]').value.trim();
  const arrivee = document.querySelector('input[name="arrivee"]').value.trim();
  const date = document.querySelector('input[name="date"]').value.trim();

  if (!depart || !arrivee || !date) {
      alert("Veuillez remplir tous les champs avant de rechercher.");
      return;
  }

  const url = `trajets.html?depart=${encodeURIComponent(depart)}&arrivee=${encodeURIComponent(arrivee)}&date=${encodeURIComponent(date)}`;
  window.location.href = url;
});
}
