document.addEventListener('DOMContentLoaded', () => {
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
})

document.addEventListener("DOMContentLoaded", () => {
  console.log("Script de connexion chargé");

  const loginButton = document.querySelector(".btn-login");
  if (!loginButton) {
    console.error("Bouton de connexion introuvable !");
    return;
  }

  loginButton.addEventListener("click", async () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    

    if (!emailInput || !passwordInput) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    console.log("Tentative de connexion avec :", { email, password });

    try {
      const response = await fetch("https://ecoride-production-f991.up.railway.app/api/login.php", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          credentials: "include", // Garde la session ouverte
          body: JSON.stringify({ email, password })
      });
  
      console.log("Réponse reçue du serveur :", response);
  
      const textResponse = await response.text(); // Lire le texte brut avant d'essayer JSON
      console.log("Texte brut reçu du serveur :", textResponse);
  
      let data;
      try {
          data = JSON.parse(textResponse);
      } catch (error) {
          console.error("Erreur lors de la conversion JSON :", error);
          alert("Le serveur a renvoyé une réponse invalide.");
          return;
      }
  
      console.log("Réponse JSON :", data);
  
      if (data.status === "success") {
          alert("Connexion réussie !");
          localStorage.setItem("user", JSON.stringify(data.user)); // Stocker les infos en local
          window.location.href = "profil.html"; // Rediriger vers le profil
      } else {
          alert(data.message);
      }
  } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
  }
  
  });
});

