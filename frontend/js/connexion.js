import API_URL from "./config.js";

// === ✅ Ton script initial (NON MODIFIÉ) ===
document.addEventListener("DOMContentLoaded", () => {
  const userLogo = document.getElementById("user-logo");
  const dropdownMenu = document.getElementById("profile-dropdown-menu");

  if (userLogo && dropdownMenu) {
    userLogo.addEventListener("click", (event) => {
      event.preventDefault();
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (event) => {
      if (!userLogo.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = "none";
      }
    });
  }

  console.log("Le script est chargé !");

  const menuBtn = document.querySelector(".menu-btn");
  const hamburger = document.querySelector(".hamburger");

  if (menuBtn && dropdownMenu) {
    menuBtn.addEventListener("click", () => {
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });

    dropdownMenu.addEventListener("mouseleave", () => {
      dropdownMenu.style.display = "none";
    });
  }

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
    });
  }
});

// === 🚀 Mes nouvelles fonctionnalités sont dans un autre `DOMContentLoaded` ===
document.addEventListener("DOMContentLoaded", () => {
  console.log("Ajout des fonctionnalités API !");

  // Vérifier si l'utilisateur est connecté et mettre à jour l'affichage
  function checkUserStatus() {
    const userId = localStorage.getItem("user_id");
    const loginLink = document.getElementById("login-link");

    if (userId) {
      if (loginLink) loginLink.style.display = "none";
    } else {
      if (loginLink) loginLink.style.display = "block";
    }
  }

  // Gestion du formulaire de connexion
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch(`${API_URL}/login.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user.id);

          checkUserStatus();

          alert("Connexion réussie !");
          window.location.href = "profil.html";
        } else {
          alert("Erreur : " + data.error);
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        alert("Erreur de connexion. Veuillez réessayer.");
      }
    });
  }

  // Vérifier le statut de connexion au chargement de la page
  checkUserStatus();
});
