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

  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("login-form");
  
    if (loginForm) {
      loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
  
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        try {
          const response = await fetch("https://ecoride-production-f991.up.railway.app/api/login.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert("Connexion réussie !");
            localStorage.setItem("user", JSON.stringify(data.user)); // Stocke les infos utilisateur
            window.location.href = "profil.html"; // Redirige vers la page profil
          } else {
            document.getElementById("error-message").textContent = data.message;
            document.getElementById("error-message").style.display = "block";
          }
        } catch (error) {
          console.error("Erreur API :", error);
          document.getElementById("error-message").textContent = "Erreur de connexion.";
          document.getElementById("error-message").style.display = "block";
        }
      });
    }
  });
  
