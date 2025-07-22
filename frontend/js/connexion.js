document.addEventListener("DOMContentLoaded", () => {
  console.log("Script de connexion chargé");

  // GESTION DU MENU HAMBURGER
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

  // ANIMATION DU BOUTON HAMBURGER
  const hamburger = document.querySelector(".hamburger");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Vérifier si l'utilisateur est déjà connecté
  checkSession();

  const loginForm = document.querySelector("form");
  if (loginForm) {
      loginForm.addEventListener("submit", (event) => {
          event.preventDefault();
      });
  }

  const loginButton = document.querySelector(".btn-login");
  if (!loginButton) {
      console.error("❌ Bouton de connexion introuvable !");
      return;
  }

  loginButton.addEventListener("click", async (event) => {
      event.preventDefault();

      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");

      if (!emailInput || !passwordInput) {
          alert("❌ Veuillez remplir tous les champs !");
          return;
      }

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      console.log("🔍 Tentative de connexion avec :", { email, password });

      try {
          const response = await fetch("https://ecoride-production.up.railway.app/api/login.php", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({ email, password }),
          });

          console.log("📥 Réponse reçue du serveur :", response);

          const textResponse = await response.text();
          console.log("📜 Texte brut reçu du serveur :", textResponse);

          let data;
          try {
              data = JSON.parse(textResponse);
          } catch (error) {
              console.error("❌ Erreur lors de la conversion JSON :", error);
              alert("Le serveur a renvoyé une réponse invalide.");
              return;
          }

          console.log("📊 Réponse JSON :", data);

          if (data.status === "success") {
              alert("✅ Connexion réussie !");
              localStorage.setItem("session_id", data.user.id);
              localStorage.setItem("user", JSON.stringify(data.user));

              console.log("🔄 Redirection vers profil.html...");
              setTimeout(() => {
                  window.location.href = "profil.html";
              }, 1000);
          } else {
              alert("❌ Erreur : " + data.message);
          }
      } catch (error) {
          console.error("❌ Erreur lors de la connexion :", error);
          alert("Une erreur est survenue. Veuillez réessayer.");
      }
  });
});

// Vérifier si l'utilisateur a une session active
async function checkSession() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
      console.log("⚠️ Aucune session trouvée, redirection non nécessaire.");
      return;
  }

  try {
      const response = await fetch(`https://ecoride-production.up.railway.app/api/verify_session.php?user_id=${user.id}`);
      const data = await response.json();

      if (data.status === "error") {
          console.warn("❌ Session invalide ou expirée :", data.message);
          localStorage.removeItem("session_id");
          localStorage.removeItem("user");
          window.location.href = "login.html"; // Redirige vers login si session invalide
      } else {
          console.log("✅ Session valide :", data);
          if (window.location.pathname !== "/profil.html") {
              window.location.href = "profil.html";
          }
      }
  } catch (error) {
      console.error("❌ Erreur lors de la vérification de la session :", error);
  }
}
