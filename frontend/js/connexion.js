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
