document.addEventListener('DOMContentLoaded', () => {
  console.log("connexion.js chargé !");

  const loginForm = document.getElementById("login-form");

  if (!loginForm) {
    console.error("❌ Formulaire de connexion introuvable !");
    return;
  }

  console.log("✅ Formulaire détecté !");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("✅ Formulaire soumis !");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("📤 Envoi des données :", { email, password });

    // Vérifier si fetch() est bien exécuté
    console.log("🚀 Début du fetch vers l'API");

    try {
      const response = await fetch("https://ecoride-production-f991.up.railway.app/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("🔄 Réponse reçue :", response);

      const data = await response.json();
      console.log("📥 Données du backend :", data);

      if (response.ok) {
        alert("Connexion réussie !");
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "profil.html";
      } else {
        document.getElementById("error-message").textContent = data.message;
        document.getElementById("error-message").style.display = "block";
      }
    } catch (error) {
      console.error("❌ Erreur lors de la requête :", error);
      document.getElementById("error-message").textContent = "Erreur de connexion.";
      document.getElementById("error-message").style.display = "block";
    }
  });
});



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

  // 🎯 GESTION DU FORMULAIRE DE CONNEXION
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
