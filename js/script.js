// script.js

document.addEventListener("DOMContentLoaded", () => {
    console.log("Bienvenue sur Arcadia Zoo !");
    // Ici, tu pourras ajouter des appels fetch() vers ton API (backend),
    // gérer la soumission de formulaires, etc.
  });

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-btn");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    // Ouvrir/Fermer le menu au clic
    menuBtn.addEventListener("click", () => {
      dropdownMenu.style.display = 
        dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Fermer le menu si la souris quitte le menu
    dropdownMenu.addEventListener("mouseleave", () => {
      dropdownMenu.style.display = "none";
    });
  });

  document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.hamburger').classList.toggle('active');
  });
  
  