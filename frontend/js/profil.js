
document.addEventListener('DOMContentLoaded', () => {
    // 🎯 GESTION DU MENU UTILISATEUR
    const userLogo = document.getElementById('user-logo');
    const dropdownMenu = document.getElementById('profile-dropdown-menu');
  
    if (userLogo && dropdownMenu) {
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
    }
  
    // 🎯 GESTION DU MENU HAMBURGER
    const menuBtn = document.querySelector(".menu-btn");
    const dropdownNav = document.querySelector(".dropdown-menu");
    
    if (menuBtn && dropdownNav) {
      menuBtn.addEventListener("click", () => {
        dropdownNav.style.display =
          dropdownNav.style.display === "block" ? "none" : "block";
      });
  
      dropdownNav.addEventListener("mouseleave", () => {
        dropdownNav.style.display = "none";
      });
    }
  
    // 🎯 ANIMATION DU BOUTON HAMBURGER
    const hamburger = document.querySelector('.hamburger');
    
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
      });
    }
  
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!user) {
      alert("Vous devez être connecté !");
      window.location.href = "login.html"; // Redirige vers la page de connexion
    } else {
      document.getElementById("user-email").textContent = user.email;
    }
  });

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html"; // Redirection après déconnexion
  });
})

document.addEventListener("DOMContentLoaded", () => {
    const editBtn = document.getElementById("edit-btn");
    const saveBtn = document.getElementById("save-btn");
    const inputs = document.querySelectorAll(".profil-card input");

    editBtn.addEventListener("click", () => {
        inputs.forEach(input => input.disabled = false);
        editBtn.style.display = "none";
        saveBtn.style.display = "inline-block";
    });

    saveBtn.addEventListener("click", () => {
        inputs.forEach(input => input.disabled = true);
        editBtn.style.display = "inline-block";
        saveBtn.style.display = "none";

        // 🔽 Ici tu peux ajouter un fetch() pour sauvegarder les infos sur le serveur
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const roleSelect = document.getElementById("role");
    const chauffeurSection = document.getElementById("chauffeur-section");
    const editBtn = document.getElementById("edit-btn");
    const saveBtn = document.getElementById("save-btn");
    const inputs = document.querySelectorAll(".profil-card input, .profil-card select");
    const addVehicleBtn = document.getElementById("ajouter-vehicule");
    const vehiclesContainer = document.getElementById("vehicules-container");

    // Gestion affichage des champs chauffeur
    roleSelect.addEventListener("change", () => {
        if (roleSelect.value.includes("chauffeur")) {
            chauffeurSection.style.display = "block";
        } else {
            chauffeurSection.style.display = "none";
        }
    });

    // Activer/Désactiver modification
    editBtn.addEventListener("click", () => {
        inputs.forEach(input => input.disabled = false);
    });

    // Ajouter un véhicule
    addVehicleBtn.addEventListener("click", () => {
        const vehicleHTML = `
            <div class="vehicule">
                <label>Marque :</label>
                <input type="text" class="vehicule-marque">
                
                <label>Modèle :</label>
                <input type="text" class="vehicule-modele">
                
                <label>Couleur :</label>
                <input type="text" class="vehicule-couleur">
                
                <label>Places disponibles :</label>
                <input type="number" min="1" class="vehicule-places">
            </div>
        `;
        vehiclesContainer.insertAdjacentHTML("beforeend", vehicleHTML);
    });

    // Sauvegarder (simulation)
    saveBtn.addEventListener("click", () => {
        alert("Informations sauvegardées !");
        inputs.forEach(input => input.disabled = true);
    });
});
