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

}