
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